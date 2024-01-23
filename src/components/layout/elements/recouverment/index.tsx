// import { useEffect, useState } from "react";
// import { FormLabel } from "@/styles/Common";
// import {
//   FContainer,
//   FFormWrap,
//   FormGroupDetail,
//   FormGroup,
//   FormGroupInf,
//   FormGroupDetailChild,
//   CheckboxDiv,
//   ContentChild,
//   CheckboxGroup,
// } from "./Fields.styled";

// import { getNotyfObject } from "@/shared/utility";
// import { useTranslation } from "react-i18next";
// import { useTheme } from "styled-components";
// import { useNavigate } from "react-router-dom";

// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import StatusModal from "./StatusModal/StatusModal";
// import UsersModal from "./UsersModal/UsersModal";
// import axios from "axios";
// import { LayoutElementProps } from "../layoutElementProps";
// import layoutElementsDictionary from "../layoutElementsDictionary";

// import { useMemo } from "react";
// import { useLogger } from "@/utils/loggerService";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { faUser, faGear } from "@fortawesome/pro-solid-svg-icons";
// export interface dataInv {
//   invoiceUid?: string;
//   documentType?: string;
//   issuingDate?: string | number;
//   dueDate?: string | number;
//   l1_call?: string | boolean;
//   l2_call?: string | boolean;
//   l3_Rar?: string | boolean;
//   contentieux?: string | boolean;
//   [propName: string]: any;
// }

// export interface nodeElement {
//   id?: string;
//   value?: string | boolean;
//   date?: string | number;
//   label?: string;
//   name?: string;
//   changeable?: boolean;
//   condition?: any;
//   [propName: string]: any;
// }

// export function Recouverment({
//   model,
//   modelFields,
//   viewType,
//   record,
//   fetchedRecord,
//   layouts,
//   onUpdate,
// }: LayoutElementProps) {
//   // a remplacer par le data recu de l api record.workflow par exemple

//   const getInvoiceData = (b: string | undefined) => {
//     return b;
//   };
//   const invoiceData: dataInv = {};
//   const setInvoiceData = (A: dataInv) => {
//     return A;
//   };
  
//   const { logger } = useLogger();
//   const fieldMeta = useMemo(() => layouts[0] || {}, [layouts]);
//   const notyf = getNotyfObject();
//   const { t } = useTranslation();
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [tempEvent, setTempEvent] = useState<any>(null);
//   const [showUsersModal, setShowUsersModal] = useState(false);
//   const [usersList, setUsersList] = useState([]);
//   const [nodeElements, setNodeElements] = useState<
//     Map<string, nodeElement> | undefined
//   >(undefined);

//   const updateRecovery = (name?: string, value?: boolean, comment?: string) => {
//     // fieldMeta.endpoint : c est le endpoint pour faire un update
//     axios
//       .put(`/invoice/${invoiceData?.invoiceUid}/updateRecovery`, {
//         name: name,
//         value: value,
//         comment: comment,
//       })
//       .then((res) => {
//         //   notyf.success("La facture a été validée")
//         getInvoiceData(invoiceData?.invoiceUid); // refetch data = refresh lea fonction fetchedRecord
//       })
//       .catch((err) => {
//         notyf.error("Une erreur s'est produite");
//       })
//       .finally(() => {});
//   };

//   useEffect(() => {
//     if (record?.recouvrement?.nodes) {
//       const node = new Map(
//         Object.entries(record?.recouvrement?.nodes)?.map(([key, value]) => [
//           key,
//           value,
//         ])
//       ) as Map<string, nodeElement>;
//       setNodeElements(node);
//       console.log(node);
//     }
//   }, [record?.recouvrement?.nodes]);

//   useEffect(() => {
//     // let url=fieldMeta.contact.endpoint  // le endpoint pour recuperer la listes des utilisateurs dans la bdd via l api
//     axios
//       .get(`/invoice/${invoiceData?.invoiceUid}/usersListByEntityInvoice`)
//       .then((response) => {
//         console.log(response?.data.entityUsers);
//         setUsersList(response?.data.entityUsers);
//       })
//       .catch((err) => {
//         notyf.error("Une erreur s'est produite");
//       });

//     // let invoiceDataInit:dataInv  = {
//     //   ...invoiceData,
//     //   documentType: invoiceData?.documentType ? invoiceData?.documentType : "INV",
//     //   issuingDate: invoiceData?.issuingDate
//     //     ? +invoiceData?.issuingDate
//     //     : new Date().getTime(),
//     //   dueDate: invoiceData?.dueDate
//     //     ? +invoiceData?.dueDate
//     //     : new Date().getTime(),
//     //   l1_call: invoiceData?.l1_call == "1" ? true : false,
//     //   l2_call: invoiceData?.l2_call == "1" ? true : false,
//     //   l3_Rar: invoiceData?.l3_Rar == "1" ? true : false,
//     //   contentieux: invoiceData?.contentieux == "1" ? true : false,
//     // };
//     // setInvoiceData(invoiceDataInit);
//   }, []);

//   const handleToggle = (comment: string) => {
//     setShowStatusModal(false);
//     // switch (tempEvent.target.name) {
//     //   case "l1_call":
//     //     setL1_call(!tempEvent.target.checked);
//     //     break;
//     //   case "l2_call":
//     //     setL2_call(!tempEvent.target.checked);
//     //     break;
//     //   case "l3_Rar":
//     //     setL3_Rar(!tempEvent.target.checked);
//     //     break;
//     //   case "contentieux":
//     //     setContentieux(!tempEvent.target.checked);
//     //     break;
//     //   default:
//     //     break;
//     // }
//     updateRecovery(tempEvent.target.name, !tempEvent.target.checked, comment);
//   };

//   const isDisabledItem = (step: any) => {
//     if (Array.isArray(step)) {
//       return step?.some((item: any) =>
//         nodeElements
//           ?.get(item)
//           ?.condition?.some(
//             (ite: any) => nodeElements?.get(ite?.name)?.value !== ite?.value
//           )
//       );
//     } else {
//       return nodeElements
//         ?.get(step)
//         ?.condition?.some(
//           (ite: any) => nodeElements?.get(ite?.name)?.value !== ite?.value
//         );
//     }
//   };

//   return (
//     <>
//       {record && (
//         <div className="relative w-full h-[30rem] overflow-scroll">
//           <FContainer>
//             <FormLabel
//               color={"#2174B9"}
//               htmlFor="number"
//               style={{ cursor: "pointer" }}
//             >
//               <SupervisorAccountIcon sx={{ fontSize: 40 }} />
//               <p
//                 style={{ padding: "12px 0px 0px 5px", fontSize: "0.9rem" }}
//                 onClick={() => setShowUsersModal(true)}
//               >
//                 Liste de contacts
//               </p>
//             </FormLabel>
//             <FFormWrap>
//               {record?.recouvrement?.steps?.map((step: any) => {
//                 return (
//                   <FormGroup
//                     disabled={isDisabledItem(step?.step)}
//                     height={
//                       Array.isArray(step?.step)
//                         ? step?.step?.length * 60 + "px"
//                         : "65px"
//                     }
//                     style={{ width: "100%" }}
//                   >
//                     {step.hasOwnProperty("step") &&
//                     Array.isArray(step?.step) ? (
//                       <>
//                         <FormGroupInf
//                           height={step.step.length * 62 + "px"}
//                           active={
//                             !step?.step?.some(
//                               (item: any) =>
//                                 nodeElements?.get(item)?.active == false
//                             )
//                           }
//                         >
//                           <FormLabel
//                             style={{ fontSize: "23px", margin: "unset" }}
//                             color={"#505050"}
//                             htmlFor="number"
//                           >
//                             {step.id}{" "}
//                           </FormLabel>
//                         </FormGroupInf>
//                         <FormGroupDetail height={step.step.length * 60 + "px"}>
//                           {step?.step?.map((item: any) => {
//                             return (
//                               <FormGroupDetailChild
//                                 style={{ marginBottom: "3px" }}
//                                 active={nodeElements?.get(item)?.active}
//                               >
//                                 <ContentChild>
//                                   <FormLabel color={"#505050"} htmlFor="number">
//                                     {nodeElements?.get(item)?.label}
//                                   </FormLabel>
//                                 </ContentChild>
//                                 {nodeElements?.get(item)?.picto ==
//                                 "utilisateur" ? (
//                                   <FontAwesomeIcon
//                                     size="sm"
//                                     icon={faUser}
//                                     className="icon"
//                                   />
//                                 ) : (
//                                   <FontAwesomeIcon
//                                     size="sm"
//                                     icon={faGear}
//                                     className="icon"
//                                   />
//                                 )}
//                               </FormGroupDetailChild>
//                             );
//                           })}
//                         </FormGroupDetail>

//                         <CheckboxGroup>
//                           {step?.step?.map((step: any) => {
//                             return (
//                               <CheckboxDiv
//                                 edge="end"
//                                 name={nodeElements?.get(step)?.name}
//                                 onChange={(e: any) =>
//                                   nodeElements?.get(step)?.changeable
//                                     ? (setTempEvent(e),
//                                       setShowStatusModal(!showStatusModal))
//                                     : null
//                                 }
//                                 checked={
//                                   nodeElements?.get(step)?.active == true
//                                 }
//                                 icon={<RadioButtonUncheckedIcon />}
//                                 checkedIcon={<CheckCircleOutlineIcon />}
//                               />
//                             );
//                           })}
//                         </CheckboxGroup>
//                       </>
//                     ) : (
//                       <>
//                         <FormGroupDetail
//                           style={{ width: "84%" }}
//                           height={"60px"}
//                         >
//                           <FormGroupDetailChild
//                             active={nodeElements?.get(step?.step)?.contentieux}
//                           >
//                             <ContentChild style={{ width: "90%" }}>
//                               <FormLabel color={"#505050"} htmlFor="number">
//                                 {nodeElements?.get(step?.step)?.label}
//                               </FormLabel>
//                             </ContentChild>

//                             {nodeElements?.get(step?.step)?.picto ==
//                             "utilisateur" ? (
//                               <FontAwesomeIcon
//                                 size="sm"
//                                 icon={faUser}
//                                 className="icon"
//                               />
//                             ) : (
//                               <FontAwesomeIcon
//                                 size="sm"
//                                 icon={faGear}
//                                 className="icon"
//                               />
//                             )}
//                           </FormGroupDetailChild>
//                         </FormGroupDetail>
//                         <CheckboxDiv
//                           style={{ marginLeft: "10px" }}
//                           name={nodeElements?.get(step)?.name}
//                           edge="end"
//                           onChange={(e: any) =>
//                             nodeElements?.get(step)?.changeable
//                               ? (setTempEvent(e),
//                                 setShowStatusModal(!showStatusModal))
//                               : null
//                           }
//                           checked={nodeElements?.get(step?.step)?.value == true}
//                           icon={<RadioButtonUncheckedIcon />}
//                           checkedIcon={<CheckCircleOutlineIcon />}
//                         />
//                       </>
//                     )}
//                   </FormGroup>
//                 );
//               })}
//             </FFormWrap>
//             {showStatusModal ? (
//               <StatusModal
//                 show={showStatusModal}
//                 modalClosed={() => setShowStatusModal(false)}
//                 confirm={handleToggle}
//               />
//             ) : null}
//             {showUsersModal ? (
//               <UsersModal
//                 show={showUsersModal}
//                 modalClosed={() => setShowUsersModal(false)}
//                 confirm={() => setShowUsersModal(false)}
//                 fields={fieldMeta?.contact.field}
//                 usersList={usersList}
//               />
//             ) : null}
//           </FContainer>
//         </div>
//       )}
//     </>
//   );
// }

// layoutElementsDictionary.registerLayoutElement("recouverment", Recouverment);

///////////////////////////////////2eme version 

import React, { useEffect, useState } from "react";
import { FormLabel } from "@/styles/Common";
import {
  FContainer,
  FFormWrap,
  FormGroupDetail,
  FormGroup,
  FormGroupInf,
  FormGroupDetailChild,
  CheckboxDiv,
  ContentChild,
  CheckboxGroup,
} from "./Fields.styled";

import { getNotyfObject } from "@/shared/utility";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { Spinner } from "react-bootstrap";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import StatusModal from "./StatusModal/StatusModal";
import UsersModal from "./UsersModal/UsersModal";
import axios from 'axios'
import { LayoutElementProps } from "../layoutElementProps";
import layoutElementsDictionary from "../layoutElementsDictionary";
import { useCallback, useMemo} from "react";
import{ useSearchModelQuery } from "@/store/api";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear, 
} from "@fortawesome/pro-solid-svg-icons";
import { AnyCnameRecord } from "dns";
export interface dataInv {
    invoiceUid?: string; 
    documentType?: string;
    issuingDate?: string |number;
    dueDate?: string |number; 
    l1_call?: string |boolean; 
    l2_call?: string |boolean; 
    l3_Rar?: string |boolean; 
    contentieux?: string |boolean;
    [propName: string]: any;
}
export interface nodeElement {
    id?: string;
    value?: string |boolean;
    date?: string |number;
    label?: string;
    name?: string;
    changeable?: boolean;
    condition?: any;
    [propName: string]: any;
}
export function Recouvrement({model, modelFields, viewType, record, fetchedRecord, layouts, onUpdate }: LayoutElementProps ) {

  const fieldMeta = useMemo(() => layouts[0] || {}, [layouts]); 
  const notyf = getNotyfObject();
  const { t } = useTranslation();
  const { id } = useParams();
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [tempEvent, setTempEvent] = useState<any>(null);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [usersList, setUsersList] = useState([]);
// a remplacer par le data recu de l api record.events par exemple

  const event={"event": [
      {id: 1, parent: "id_recouverment", etape: 1, niveau_relanc: 1, acteur: 10, date:"24/25/2022"},
      {id: 2, parent: "id_recouverment", etape: 2, niveau_relanc: 1, acteur: 20, date:"24/25/2022"},
      // {id: 3, parent: "id_recouverment", etape: 3, niveau_relanc: 2, acteur: 30, date:"24/25/2022"},
  ]}
  const {
    data: objectData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSearchModelQuery(
    {
      url: "/objects/remindLevel",
      objectName: "remindLevel",
      params: null,
    },
    { skip: !id}
  ); 

const updateRecovery = (name?:string, value?:boolean, comment?:string) => {

};
//pour recuperer les events  et les niveaux de relance
const eventsf = useMemo(() => {
  return record?.recoveryStep?.map((it:any)=>{
     return {id:it?.id, etape:it?.remindStep?.id, Level:it?.remindLevel.id}
   })
}, [record]);

const nodes = useMemo(() => {
  return objectData?.data?.records;
}, [objectData]);


useEffect(() => { 
// let url=fieldMeta.elements[0].endpoint  // le endpoint pour recuperer la listes des utilisateurs dans la bdd via l api
  axios.get(`/invoice/${record?.uuid}/usersListByEntityInvoice`)   
    .then((response) => {
    console.log(response?.data.entityUsers);
      setUsersList(response?.data.entityUsers);
    })
    .catch((err) => {
      notyf.error("Une erreur s'est produite");
    });

}, []);

const verification=(step:any,id_step:any)=>{
  let res=true
  step.map((item:any)=>{
    if(!event.event.some((row:any)=>row.etape==item.id && row.niveau_relanc==id_step))
    res=false
  })
  return res
}

const handleToggle = (comment:string) => {
 
  setShowStatusModal(false)
  // switch (tempEvent.target.name) {
  //   case "l1_call":
  //     setL1_call(!tempEvent.target.checked);
  //     break;
  //   case "l2_call":
  //     setL2_call(!tempEvent.target.checked);
  //     break;
  //   case "l3_Rar":
  //     setL3_Rar(!tempEvent.target.checked);
  //     break;
  //   case "contentieux":
  //     setContentieux(!tempEvent.target.checked);
  //     break;
  //   default:
  //     break;
  // }
 updateRecovery(tempEvent.target.name, !tempEvent.target.checked,comment);
};
const verificationChild=(steps:any,row:any,id_step:any)=>{
  let items=steps?.filter((item:any)=>item.classify<row.classify)
  let res=true
  items.some((item:any)=>{
    if(!event.event.some((row:any)=>row.etape==item.id && row.niveau_relanc==id_step))
    res=false
  })
  return res

}

const isDisabledItem = (step:any) => {
  let i=parseInt(step?.number)-1
    console.log(i)
  let row=nodes?.filter((item:any)=>item.number==i)
  
  if(row?.length>0){
    let res=false
      row[0]?.remindStep?.map((it:any)=>{
        if(!event.event.some((r:any)=>r.etape==it.id && r.niveau_relanc==row[0].id))
           res=true
    })
    return res

  } else {
      step.remindStep?.map((it:any)=>{
        if(event.event.some((r:any)=>r.etape==it.id && r.niveau_relanc==step.id))
            return true
            else return false
    })
  }
 // if()
  // if(Array.isArray(step)){
  //   return step?.some((item:any)=>
  //     nodeElements?.get(item)?.condition?.some((ite:any)=>nodeElements?.get(ite?.name)?.value!==ite?.value)
  //   )
  // }else{
  //   return nodeElements?.get(step)?.condition?.some((ite:any)=>nodeElements?.get(ite?.name)?.value!==ite?.value)
  // }
}


  return (
    <>
    {record&&
      <div className='relative w-full h-[30rem] overflow-scroll'>
      <FContainer>
      <FormLabel
        color={"#2174B9"}
        htmlFor="number"
        style={{ cursor: "pointer" }}
      >
        <SupervisorAccountIcon  sx={{ fontSize: 40 }} />
        <p
          style={{ padding: "12px 0px 0px 5px", fontSize: "0.9rem" }}
          onClick={() => setShowUsersModal(true)}
        >
          Liste de contacts
        </p>
      </FormLabel>
      <FFormWrap>

     {nodes?.map((step:any) => {
       
       return (
         <FormGroup 
           disabled={isDisabledItem(step)}
           height={Array.isArray(step?.remindStep)? step?.remindStep?.length* 60 + "px":"65px"} 
           style={{width:"100%"}}
           >
          {step.hasOwnProperty("litigation")&& step.litigation==false && Array.isArray(step?.remindStep)? 
          <>
               <FormGroupInf height={step.remindStep.length * 62 + "px"} active={verification(step?.remindStep,step.id)} > 
                 <FormLabel
                   style={{ fontSize: "23px", margin: "unset" }}
                   color={"#505050"}
                   htmlFor="number"
                 >
                   {step.id}{" "}
                 </FormLabel>
                 </FormGroupInf>
                 <FormGroupDetail height={step.remindStep.length * 60 + "px"}>
                   {step?.remindStep?.map((item:any) => {
                     return (             
                         <FormGroupDetailChild disabled={!verificationChild(step?.remindStep,item,step.id)} style={{marginBottom:"3px"}} active={event.event.some((row:any)=>row.etape==item.id && row.niveau_relanc==step.id )}  >
                               <ContentChild>
                                   <FormLabel color={"#505050"} htmlFor="number">
                                       {item?.name}
                                  
                                   </FormLabel>
                               </ContentChild>
                               {
                                 !item?.automatic==true?
                                 <FontAwesomeIcon size="sm" icon={faUser}className="icon" />
                               :
                                 <FontAwesomeIcon size="sm" icon={faGear} className="icon" />
                               }
     
                           </FormGroupDetailChild>         
                     );
                   })}
                 </FormGroupDetail>

                 <CheckboxGroup >      
                   {step?.remindStep?.map((item:any) => {
                     return (             
                       <CheckboxDiv
                           disabled={!verificationChild(step?.remindStep,item,step.id)}
                           edge="end"
                           name={step?.name}
                           onChange={(e:any) => !item?.automatic==true ? (setTempEvent(e), setShowStatusModal(!showStatusModal)) : null}
                           checked={event.event.some((row:any)=>row.etape==item.id && row.niveau_relanc==step.id )}
                           icon={<RadioButtonUncheckedIcon />}
                           checkedIcon={<CheckCircleOutlineIcon />}
                         />      
                     );
                   })}
                 </CheckboxGroup>
                 </>
                 :
                 <>
                   <FormGroupDetail style={{width:"84%"}} height={"60px"}>
                       <FormGroupDetailChild disabled={!verificationChild(step?.remindStep,step?.remindStep[0],step.id)} active={event.event.some((row:any)=>row.etape==step?.remindStep[0].id && row.niveau_relanc==step.id)}>
                           <ContentChild style={{ width: "90%" }}>
                               <FormLabel color={"#505050"} htmlFor="number">
                                 {step?.remindStep[0]?.name}
                               </FormLabel>
                           </ContentChild>
                          
                     {
                       !step?.remindStep[0]?.automatic==true?
                       <FontAwesomeIcon size="sm" icon={faUser}className="icon" />
                     :
                       <FontAwesomeIcon size="sm" icon={faGear} className="icon" />
                     }
     
                     </FormGroupDetailChild>
                   </FormGroupDetail>
                   <CheckboxDiv style={{marginLeft :"10px"}}
                     name={step.remindStep[0]?.nom}
                     edge="end"
                     onChange={(e:any) => !step.remindStep[0]?.automatic==true ? (setTempEvent(e), setShowStatusModal(!showStatusModal)) : null}
                     checked={event.event.some((row:any)=>row.etape==step?.remindStep[0].id && row.niveau_relanc==step.id)}
                   
                     icon={<RadioButtonUncheckedIcon />}
                     checkedIcon={<CheckCircleOutlineIcon />}
                   />   
                </>  
                 }
   
         </FormGroup> 
       );
  

   }
   )}
      </FFormWrap>
      {showStatusModal ? (
          <StatusModal
            show={showStatusModal}
            modalClosed={() => setShowStatusModal(false)}

            confirm={handleToggle}
          />
      ) : null}
      {showUsersModal ? (
          <UsersModal
            show={showUsersModal}
            modalClosed={() => setShowUsersModal(false)}
            confirm={() => setShowUsersModal(false)}
            fields={["nom","prenom","email","telephone"]}
            // fields={fieldMeta.elements? fieldMeta?.elements[0]?.elements:[]}
            usersList={[]}
          />
      ) : null}
    </FContainer>
      </div>
}
    </>
  );
}

layoutElementsDictionary.registerLayoutElement("recouvrement", Recouvrement);;

