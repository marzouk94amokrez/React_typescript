// import { OBJECTS_ID_FIELD } from "@/utils/const";
// import { useMemo } from "react";
// import { Link } from "react-router-dom";

// /** <b>Composant de liste d'un champ de type shorttext</b> */
// export default function ShortTextList({
//   model,
//   fieldName,
//   record,
//   fieldMetadata,
//   fieldClassName,
// }) {
//   const modelEndpoint = useMemo(() => {
//     const m = model || {};
//     return m.endpoint || ""; 
//   }, [model]);

//   const value = useMemo(() => {
//     const r = record || {};
//     return r[fieldName] || "";
//   }, [record, fieldName]);
// let param=model?.object==="RECOUVREMENT"?"relance":"view";
//   if (modelEndpoint && fieldMetadata.title) {
//     const modelDetailsURL = `/${modelEndpoint}/${param}/${record[OBJECTS_ID_FIELD]}`;

//     return (
//       <Link to={modelDetailsURL} className={`${fieldClassName || ""} visited:text-[var(--color-default)] `}>
//         {value}
//       </Link>
//     );
//   }

//   return <span className={`${fieldClassName || ""}`}>{value}</span>;
// }






//////////////////////////////////////////////////////
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import FileMangerContact from "@/components/UpdateRepositoryModal/FileMangerContact";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { useParams,useLocation } from "react-router"
/** <b>Composant de liste d'un champ de type shorttext</b> */
export default function ShortTextList({
  model,
  fieldName,
  record,
  fieldMetadata,
  fieldClassName,
  fieldsMetadataMap,
}) {
const location =useLocation() ;
const screen = useMemo(() => {
  return location?.pathname?.split("/")[2]||"";
}, [location]);

 const [updateContactShow, setUpdateContactShow] =useState(false);
   const updateShowModalContact = () => {
     setUpdateContactShow(true);
   };


  const modelEndpoint = useMemo(() => {
    const m = model || {};
    return m.endpoint || ""; 
  }, [model]);

  const value = useMemo(() => {
    const r = record || {};
    return r[fieldName] || "";
  }, [record, fieldName]);


let param=model?.object==="RECOUVREMENT"?"relance":"view";
  if (modelEndpoint && fieldMetadata.title && !["suppliersContact","clientsContact","users"].includes(model?.endpoint||"")) {
    const modelDetailsURL = `/${modelEndpoint}/${param}/${record[OBJECTS_ID_FIELD]}`;
    return (
      <Link to={modelDetailsURL} className={`${fieldClassName || ""} visited:text-[var(--color-default)] `}>
        {value}
      </Link>
    );
  }

  if (modelEndpoint && fieldMetadata.title && ["suppliersContact","clientsContact","users"].includes(model?.endpoint||"")) {
    return (
      <>
      <Link  onClick={updateShowModalContact} className={`${fieldClassName || ""} visited:text-[var(--color-default)] `}>
        {value}
      </Link>
       {updateContactShow && (
        <FileMangerContact
          show={updateContactShow}
          title={screen=="edit"?"Edition de contact":"Informations de contact"}
           modalClosed={() => setUpdateContactShow(false)}
           model={model}
           modelFields={fieldsMetadataMap}
           viewType={screen=="edit"?FieldViewType.EDIT:FieldViewType.CONSULT}
           id={record[OBJECTS_ID_FIELD]}
        />
       )}
      </>
    );
  }
  return <span className={`${fieldClassName || ""}`}>{value}</span>;
}


