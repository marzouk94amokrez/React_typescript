import { useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LayoutElementDisplay } from "@/components/layout/elements/layoutElementDisplay";
import templatesDictionary from "./templatesDictionary";
import { TemplateProps } from "./templateProps";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { ConsultationHeader } from "@/components/header/buttons/consultationHeader";
import ZoneTimeline from "@/components/header/zone-timeline";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import {
  useGetObjectByIdQuery,
  useDeleteObjectByIdMutation,
} from "@/store/api";
import { useAppSelector } from "@/hooks/store";

/**
 * <b>Composant d'affichage d'une vue de consultation standard</b>
 */
export function ConsultStandard({
  model,
  modelFields,
  modelLayouts,
  layoutActions,
}: TemplateProps) {
  // eslint-disable-next-line
  const { t } = useTranslation(["common"]);

  const { id } = useParams();
  const modelEndpoint = useMemo(() => model.endpoint || "", [model]);
  const navigate = useNavigate();

  const {
    data: objectData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetObjectByIdQuery(
    { objectName: modelEndpoint, id },
    { skip: !modelEndpoint || !id, refetchOnMountOrArgChange: true},
  
   
  );
  const [deleteObject, deleteResult] = useDeleteObjectByIdMutation();

  const record = useMemo(() => {
    return objectData?.data?.records?.at(0);
  }, [objectData]);

  // Liste des propriétés spéciaux avec titre 
  const specialFieldsList = useAppSelector(
    (state) =>
      state.objectsDefinitions[model.code]?.specialFields?.map(
        ([prop, fields]) => [prop, fields.map((f) => modelFields.get(f)!)]
      ) || []
  );

  const specialFieldsMap: any = useMemo(
    () => Object.fromEntries(specialFieldsList),
    [specialFieldsList]
  );
  const title = specialFieldsMap?.title?.at(0);
  const additionalTitle = specialFieldsMap?.titlebis;
  const subtitles = specialFieldsMap?.subtitle;
  const additionalSubtitles = specialFieldsMap?.header;

  // Suppression d'un enregistrement
  // TODO : confirmation
  const deleteRecord = useCallback(async () => {
    const { data: result, error }: any = await deleteObject({
      objectName: modelEndpoint,
      id,
    });

    // TODO : Implémenter un retour sur la liste car un "back" pourrait tout simplement être une opération invalide
    navigate(-1);
  }, [id, modelEndpoint, navigate, deleteObject]);
  return (
    <>
      <div className="w-full">
        {model && modelFields && modelLayouts && (
          <>
            <ConsultationHeader
              model={model}
              modelFields={modelFields}
              layoutActions={layoutActions}
              record={record}
              title={title}
              additionalTitle={additionalTitle}
              subtitles={subtitles}
              additionalSubtitles={additionalSubtitles}
              saveButtonVisible={false}
              onDelete={deleteRecord}
              onEdit={() =>
                navigate(`/${model.endpoint}/edit/${record[OBJECTS_ID_FIELD]}`)
              }
              onBack={() => navigate(-1)}
            />
            <ZoneTimeline />
            <LayoutElementDisplay
              model={model}
              modelFields={modelFields}
              layouts={modelLayouts}
              viewType={FieldViewType.CONSULT}
              record={record}
              fetchedRecord={record}
            />
          </>
        )}
      </div>
    </>
  );
}

templatesDictionary.registerTemplate("consult_standard", ConsultStandard);
