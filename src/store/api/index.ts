import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/utils/const";
import qs from "qs";
import toast from "react-hot-toast";
import { RootState } from "..";
import { logger } from "@/utils/loggerService";
import { ModelField } from "@/api/data/modelField";
import { setObjectDefinition } from "../objectsDefinitionsSlice";
import { useTranslation } from "react-i18next";

/**
 * Requête de base
 */
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const state: RootState = getState() as RootState;

    const token = state.auth.token;
    logger.debug(`[baseQuery/prepareHeaders] - Modification du 'Content-Type' par 'application/json'`);
    headers.set('Content-Type', `application/json`);

    if (token) {
      logger.debug(`[baseQuery/prepareHeaders] - Rattachement du token d'identification aux requêtes`, token);
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  },

  validateStatus: (response, result) =>
    response.status >= 200 && response.status <= 299
});

/**
 * Transformer la réponse
 * @param response 
 * @param meta 
 * @param arg 
 * @returns 
 */
const searchReponseTransformer = (response: any, meta: any, arg: any) => {
 
    const currentPage = (arg?.params?.page || 0);
    const pageSize = arg?.params?.pageSize || 1;
    const records = response?.data?.records.map(
      (r: any, index: number) => (
        { __idx: ((currentPage - 1) * pageSize) + index + 1, ...r }
      )
    );

  return { status: response?.status, data: { ...response?.data, records } };

}

/**
 * Fonction de recherche
 * @param url 
 * @param params 
 * @returns 
 */
const searchUrl = (url: string, params: any) => {
  const search: string = params?.search || "";
  const filters: any[] = params?.filters || [];
  const sortParams: any[] = params?.sortParams || [];
  const page: number = params?.page || 1;
  const pageSize: number = params?.pageSize || 100;
  const selectedIds:any[]= params?.selectedIds || [];

  let sp: any = {};
  if (sortParams.length) {
    sp[sortParams[0]] = sortParams[1];
  }

  // Filters+
  let filtersArray: any = Object.fromEntries(filters.map((filter) => {
    const field: string = filter[0] || '';
    const value: any[] | string = filter[1] || '';
    return [field, Array.isArray(value) ? Array.from(value).join(':') : value];
  }));

  // items on a page
  const offset = (page > 1 ? page - 1 : 0) * pageSize;
  const limit = pageSize >= 0 ? pageSize : undefined;

  const searchParams = qs.stringify({
    quicksearch: search,
    sort: sp,
    filters: filtersArray,
    offset,
    limit,
    selectedIds,
  }, { indices: false });

  const operator = url?.indexOf('?') >= 0 ? '&' : '?';
  return `${url}${operator}${searchParams}`;
}


/**
 * Slice pour la gestion des appels Api
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Menu","user", "Object", "ObjectDefinition"],
  endpoints: (builder) => ({
    
    getMenus: builder.query({
      query: () => '/menu',
      providesTags: ['Menu']
    }),
    getUser: builder.query({
      query: ({token: string}) => 'objects/user',
      providesTags: ['user']
    }),
    getModelDefinition: builder.query({
      query: (objectName: string) => `/definitions/${objectName}`,
      providesTags: (result, error, arg) => [
        'ObjectDefinition',
        { type: 'ObjectDefinition', id: arg }
      ],
      onCacheEntryAdded: async (arg, { dispatch, getCacheEntry, cacheDataLoaded, cacheEntryRemoved }) => {
        // Sauvegarde automatique des données du modèle dans le cache et calcul des champs
        await cacheDataLoaded;

        const { data: entry } = getCacheEntry();
        const modelDefinitions = entry?.data?.definitions;


        // Traitement des champs speciaux (title, subtitles, ....)
        // Propriétés spéciaux
        const specialFieldProps = [
          "title",
          "titlebis",
          "subtitle",
          "header",
          "datecreate",
          "datestart",
          "dateend",
          "status",
          "error",
          "inexternallist",
          "filetodownload",
          ["filefield",
            (field: any) => ["multival"].includes(field.field_type || "") &&
              ["file"].includes(field.component || "")
          ]
        ];

        // Champs spéciaux
        const specialFields: Map<string, string[]> = new Map<string, string[]>();
        const modelFields: [string, ModelField][] = [];
        modelDefinitions?.structure?.forEach((field: any) => {
          let specialField = false;
          specialFieldProps.forEach((specialProperty: string | (string | ((field: ModelField) => boolean))[]) => {
            const propertyIsString = typeof (specialProperty) === "string"
            const propertyName = propertyIsString ? specialProperty : specialProperty.at(0) as string;
            const check = propertyIsString
              ? (field: any) => [true, "true", 1, "1"].includes(field[propertyName])
              : specialProperty?.at(1);


            if (typeof (check) === "function" && check(field)) {
              const fields = specialFields.get(propertyName) || [];
              fields.push(field.field_name);
              specialFields.set(propertyName, fields);
              specialField = true;
            } 
          });

          modelFields.push([
            field.field_name,
            { ...field, code: field.field_name, type: field.field_type, special: specialField } as ModelField,
          ]);
        });

        const specialFieldsMap = Array.from(specialFields.entries());
        logger.debug(`[MODEL DEFINITIONS] - Sauvegarde des configurations de l'objet "${arg}" en cache`, modelDefinitions, specialFieldsMap);
        dispatch(setObjectDefinition({ object: modelDefinitions.code, params: { definitions: modelDefinitions, fields: modelFields, specialFields: specialFieldsMap } }));

        await cacheEntryRemoved;

        logger.debug(`[MODEL DEFINITIONS] - Suppression de l'objet "${arg}" du cache des objets.`);
        dispatch(setObjectDefinition({ object: modelDefinitions.code, params: {} }));
      },
    }),
    getModelData: builder.query({
      query: ({ objectName, params }) => searchUrl(`/objects/${objectName}`, params),
      transformResponse: searchReponseTransformer,
      providesTags: (result, error, arg) => [
        'Object',
        { type: 'Object', id: arg?.objectName },
        ...result?.data?.records.map(({ id }: any) => ({ type: 'Object', id: `${arg?.objectName}::${id}` }))
      ]
    }),
    
    searchModel: builder.query({
      query: ({ url, objectName, params }) => searchUrl(url, params),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        
        try {
              const{data: result, error}: any = await queryFulfilled;
            }
              catch(error)
            {
               logger.error(error);
            }   
        },
      transformResponse: searchReponseTransformer,
      providesTags: (result, error, arg) => {
        if (error) {
          return [];
        } 
        else
        return  [
              'Object',
                { type: 'Object', id: arg?.objectName },
                ...result?.data?.records.map(({ id }: any) => ({ type: 'Object', id: `${arg?.objectName}::${id}` }))
              ];
          },
      
    }),
    getObjectById: builder.query({
      query: ({ objectName, id }) => `/objects/${objectName}/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Object', id: `${arg?.objectName}::${arg?.id}` }],
   
      
    }),

    createObject: builder.mutation({
      query: ({ objectName,uid, data, t }) => ({
        url: !uid?`/objects/${objectName}`:`/objects/${objectName}/${uid}`,
        method: "POST",
        body: { data: data },
       
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
       
        const toastId = toast.loading(arg.t('messages.creatingRecord')); 
        try {
          const { data: result, isError, error }: any = await queryFulfilled;
          if (result?.status === 'success') {
            toast.success(arg.t("toast.success.create"), { id: toastId });
            logger.debug(arg.t("toast.success.create"));
          } else {
            toast.error(arg.t("toast.error.create"), { id: toastId });
            logger.error(arg.t("toast.error.create"));
          }
        } catch (error) {
          toast.dismiss();
          toast.error(arg.t("toast.error.server.modal"), {id: toastId});
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Object', id: arg?.objectName }],
    }),

    updateObjectById: builder.mutation({
      query: ({ objectName, uid, data, t }) => ({
        url: `/objects/${objectName}/${uid}`,
        method: "PUT",
        body: { data: data },
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        const toastId = toast.loading(arg.t('messages.updatingRecord'));
        try {
          const { data: result, error }: any = await queryFulfilled;
          if (result?.status === 'success') {
            toast.success(arg.t("toast.update.create"), { id: toastId });
            logger.debug(arg.t("toast.update.create"));
          } else {
            toast.error(arg.t("toast.update.error"), { id: toastId });
            logger.error(arg.t("toast.update.error"));
          }
        } catch (error) {
          toast.dismiss();
          toast.error(arg.t("toast.error.server.modal"), {id: toastId});
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Object', id: `${arg?.objectName}::${arg?.uid}` },
         { type: 'Object', id: arg?.objectName }],
    }),
    deleteObjectById: builder.mutation({
      query: ({ objectName, id }) => ({
        url: `/objects/${objectName}/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        const toastId = toast.loading(`Suppression de l'enregistrement`);
        const { data: result, error }: any = await queryFulfilled;

        if (result?.status === 'success') {
          const message = `L'enregistrement a été supprimé`;
          toast.success(message, { id: toastId });
          logger.debug(message);
        } else {
          const message = `Une erreur est survenue lors de la suppression de l'enregistrement`;
          toast.error(message, { id: toastId });
          logger.error(message);
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Object', id: arg?.objectName }],
    }),
  })
});

export const {
  useGetUserQuery,
  useGetMenusQuery,
  useGetModelDefinitionQuery,
  useGetModelDataQuery,
  useSearchModelQuery,
  useGetObjectByIdQuery,
  useCreateObjectMutation,
  useUpdateObjectByIdMutation,
  useDeleteObjectByIdMutation,
  // Lazy
  useLazyGetMenusQuery,
  useLazyGetModelDefinitionQuery,
  useLazyGetModelDataQuery,
  useLazySearchModelQuery,
  useLazyGetObjectByIdQuery
} = apiSlice;
