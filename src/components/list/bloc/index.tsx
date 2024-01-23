import { Link } from "react-router-dom";
import { faCircleXmark, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionBloc } from "./button-action";
import Identifier from "./identifier";
import { StatusBloc } from "./status";
import TrioDates from "./trio-dates";
import { TemplateProps } from "@/components/templates/templateProps";
import { ModelField } from "@/api/data/modelField";
import "./bloc.scss";
import DisplayField from "@/components/fields/displayField";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { isStarded } from "@/api/data/modelHelper";
import { useEffect, useMemo, useState } from "react";
import { faDownToLine } from "@fortawesome/pro-solid-svg-icons";
import InfoBloc from "./info";
import { OBJECTS_ID_FIELD } from "@/utils/const";

enum ActionType {
  Download = "download",
  Edit = "edit",
  Delete = "delete",
}

interface BlocProps extends TemplateProps {
  /** Un enregistrement du bloc */
  record?: any;
  /** Énumération des champs visibles dans les données */
  availableFields?: Map<string, ModelField>;
  /**
   * Champ d'index à utiliser pour l'enregistrement
   */
  indexField?: string;
  /** Titre d'un élément du bloc*/
  titleField?: string;
  /** Date de creation de l'élément du bloc*/
  dateCreateField?: string;
  /** Date de création de l'élément du bloc */
  dateStartField?: string;
  /** Date de fin de l'élément du bloc */
  dateEndField?: string;
  /** Champ en cas d'erreur */
  errorField?: string;
  /** Statut de l'élément du bloc */
  statusField?: string;
  /** Fichier de l'élément du bloc*/
  filetodownloadField?: string;
  /** Supplier of the invoice */
  supplierField?: any;
  /** Fonction qui supprime un élément du bloc*/
  onDeleteRecord?: Function;
  /** Fonction qui edit un élément du bloc*/
  onEditRecord?: Function;
}

/** <b>Composant qui représente un bloc d'élément</b> */
export function Bloc({
  model,
  modelFields,
  record,
  availableFields,
  indexField,
  titleField,
  dateCreateField,
  dateStartField,
  dateEndField,
  errorField,
  statusField,
  filetodownloadField,
  onDeleteRecord,
  onEditRecord,
}: BlocProps) {
  const isTypeFile = record[filetodownloadField as string];
  const isAllowed = true; // true: allowed, false: not allowed
  const [blocActive, setBlocActive] = useState<boolean>(false);

  const recordStatus = useMemo(() => {
    //return record[statusField as string];
    return record[statusField || ""] || false;
  }, [record, statusField]);

  const hasError = useMemo(
    () => ["true", true, 1, "1"].includes(record[errorField as string]),
    [record, errorField]
  );

  // Check if status is not a boolean with true value
  useEffect(() => {
    if (typeof recordStatus === "boolean" && recordStatus === false) {
      setBlocActive(false);
    } else {
      setBlocActive(true);
    }
  }, [recordStatus]);

  const isIconVisible = () => {
    if (
      record[dateCreateField as string] &&
      record[dateStartField as string] !== null &&
      record[dateEndField as string] &&
      isStarded(record[dateStartField as string])
    ) {
      return true;
    }
    return false;
  };

  // Liste des action
  const actions = [];

  // Downloadable
  if (isTypeFile) {
    actions.push({
      value: ActionType.Download,
      pictos: (
        <FontAwesomeIcon
          className={`${isTypeFile ? "" : "hidden"}`}
          icon={faDownToLine}
        />
      ),
      needPersmission: false,
    });
  }

  // Editable
  if (isIconVisible()) {
    actions.push({
      value: ActionType.Edit,
      pictos: (
        <FontAwesomeIcon
          className={`${isAllowed ? "" : "cursor-not-allowed"}`}
          icon={faPencilAlt}
        />
      ),
      needPermission: !isAllowed, //Permission depend on user profil, need permission if it is not allowed
    });
  }

  // Deletable
  if (isIconVisible()) {
    actions.push({
      value: ActionType.Delete,
      pictos: (
        <FontAwesomeIcon
          className={`text-red-500 ${isAllowed ? "" : "cursor-not-allowed"}`}
          icon={faCircleXmark}
        />
      ),
      needConfirm: true,
      needPermission: !isAllowed, //Permission depend on user profil, need permission if it is not allowed
    });
  }

  function onClickAction(action: string) {
    switch (action) {
      case ActionType.Delete:
        onDeleteRecord && onDeleteRecord(record);
        break;
      case ActionType.Download:
        alert(`Download: ${record[filetodownloadField as string]}`);
        break;
      case ActionType.Edit:
        onEditRecord && onEditRecord(record);
        break;
    }
  }

  const modelCode = useMemo(() => {
    const m = model || {};
    return m.endpoint || "";
  }, [model]);

  const modelDetailsURL = `/${modelCode}/view/${record[OBJECTS_ID_FIELD]}`;

  return (
    <div className={`w-full pr-2`}>
      <div
        className={`flex rounded-[18px] shadow-[rgba(212,212,212)_4px_4px_6px_1px] p-4 my-5 ${
          blocActive ? "" : "inactiveBloc"
        }`}
      >
        <div className="flex items-center justify-center identifier">
          <Identifier
            identifier={record[indexField as string]}
            isActive={blocActive}
            className="min-w-[4rem]"
          />
        </div>
        <div className="items-center pl-[15px]">
          <Link to={modelDetailsURL}>
            <span className={`text-[var(--title-bloc-list)] text-base title`}>
              {record[titleField as string]}
            </span>
          </Link>
          <div className="infosBloc">
            {availableFields && (
              <InfoBloc
                modelFields={availableFields}
                record={record}
                isInactive={!blocActive}
              />
            )}
          </div>
          <div className="pt-3">
            <TrioDates
              datecreate={record[dateCreateField as string]}
              datestart={record[dateStartField as string]}
              dateend={record[dateEndField as string]}
              flagError={hasError}
              isInactive={!blocActive}
            />
          </div>
        </div>
        <div className="flex flex-col ml-auto">
          <div className="flex flex-row items-end justify-end flex-none">
            <StatusBloc
              statusValue={
                <DisplayField
                  model={model}
                  fieldName={statusField}
                  viewType={FieldViewType.LIST}
                  record={record}
                  className={`flex-nowrap`}
                  fetchedRecord={record}
                  separatorIndicator={":"}
                  fieldLabel="Statut"
                  labelClassName="text-[0.8rem]"
                  fieldMetadata={modelFields?.get(statusField as string)}
                  fieldsMetadataMap={modelFields}
                  disabledLabel={!blocActive}
                  disabled={!isAllowed}
                />
              }
            />
          </div>
          <div
            className={`flex flex-row flex-auto justify-end ${
              statusField ? "items-end" : "items-center"
            }`}
          >
            <ActionBloc
              listAction={actions}
              onClickAction={onClickAction}
              isInactive={!blocActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
