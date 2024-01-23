import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ZoneTimeline from "./statusReferencing";
import { ModelField } from "@/api/data/modelField";
import { Model } from "@/api/data/model";
import DisplayField from "@/components/fields/displayField";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { useTranslation } from "react-i18next";

interface checkReferencingProps {
  model: Model,
  record: any;
  fieldsMetadataMap?: Map<string, ModelField>;
}

const CheckReferencing = ({ model, record, fieldsMetadataMap }: checkReferencingProps) => {
  const { t } = useTranslation(["supplier"]);
  const numero_demande = record && record["numero_demande"] || "";

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-slate-500">
      <div className="w-full mx-auto max-w-4xl p-4 lg:p-10 bg-[var(--background-color-modal)] rounded-md shadow-md">
        <Link to="#" className="flex justify-center ">
          <img src={`${process.env.PUBLIC_URL}/logos/rotiflexLogo.png`} alt="logo" />
        </Link>
        <div>
          <span className="text-[color:var(--color-princ)]">{t("labels.status", { ns: "supplier" })} {numero_demande}</span>
          <div className="overflow-scroll">
            <ZoneTimeline />
          </div>
        </div>
        <br />
        <div>
          <span className="text-[color:var(--color-princ)]">{t("labels.info", { ns: "supplier" })} {numero_demande}</span>
          <div className="grid grid-rows-3 grid-flow-col h-[150px] p-2">
            {fieldsMetadataMap && Array.from(fieldsMetadataMap.values()).map((field) => {
              return (
                field.viewable && (
                  <div className="py-1" key={field.code}>
                    <DisplayField
                      fieldMetadata={field}
                      fieldLabel={field.code}
                      viewType={FieldViewType.LIST}
                      record={record || ''}
                      fetchedRecord={record || ''}
                      fieldName={field.code}
                      fieldsMetadataMap={fieldsMetadataMap}
                      componentClassName={"text-right"}
                      separatorIndicator={":"}
                      labelClassName={"text-sm"}
                      fieldClassName={"text-sm"}
                    />
                  </div>
                ))
            })
            }
            <div>
              <p className="text-[var(--bleu-secondaire)] text-sm" >{t("labels.comment", { ns: "supplier" })}:&nbsp;</p>
              <textarea
                className=" border rounded-lg"
                rows={2}
              ></textarea>
            </div>
            <div className="">
              <div className="border-[var(--bleu-secondaire)]  border-l-2 text-sm pb-2 pl-1"><p className="text-[var(--bleu-secondaire)] text-sm " ><FontAwesomeIcon icon={"phone-circle"} size={"1x"} /> 09 82 25 10 33</p></div>
              <div className="border-[var(--bleu-secondaire)]  border-l-2 text-sm pb-2 pl-1"><p className="text-[var(--bleu-secondaire)] text-sm " ><FontAwesomeIcon icon={"at"} /> inforeferencing@rotiflex.fr</p></div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>

  );
};

export default CheckReferencing;
