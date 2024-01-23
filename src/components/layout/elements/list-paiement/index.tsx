import layoutElementsDictionary from "../layoutElementsDictionary";
import { LayoutElementProps } from "../layoutElementProps";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";


/**
 * <b>Composant de rendu des disposition d'affichage 'list_paiement'</b>
 */
export const ListPaiement = ({ modelFields, record, layouts }: LayoutElementProps) => {

  const { t } = useTranslation(["common"]);

  const elementLayout = useMemo(() => layouts[0] || {}, [layouts]);
  const fields = elementLayout.fields;
  const status_field = elementLayout.status_field;
  const payed_status = elementLayout.payed_status;
  const current_status = record[status_field];
  const fieldName = useMemo(() => elementLayout.field || '', [elementLayout]);

  const fieldValues = useMemo(() => {
    return record[fieldName] || [];
  }, [record, fieldName])


  const [availableFields, setAvailableFields] = useState<any>(); // Field visibility info

  const computeAvailableFields = useCallback(() => {
    let result: any = [];

    const availableFieldsTemp = fieldValues.filter((field: any) => {
      let arrayTemp: any = [];
      fields.forEach((v: any, k: any) => {
        if (typeof (field[v]) === "object") {
          arrayTemp.push(field[v] && field[v].name)
        }
        else {
          arrayTemp.push(field[v])
        }
      });
      result.push(arrayTemp)
      setAvailableFields(result);
    });

  }, [fieldValues]);

  useEffect(() => {
    computeAvailableFields();
  }, [computeAvailableFields])


  return (
    <div className="w-full">
      <table className="">
        <thead>
          <tr>
            {fields && fields.map((element: any) => {
              return <th>{element}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {availableFields && availableFields.map((element: any, index: any) => {
            return (
              <tr className=" hover:bg-gray-100" key={index}>
                {element.map((subItems: any, sIndex: any) => {
                  return (
                    <td key={sIndex}>
                      {
                        typeof (subItems) !== "boolean" ?
                          subItems
                          :
                          (current_status === payed_status) ?
                            <input type="checkbox" name="" className="accent-[var(--color-princ)]" checked={subItems} id="" readOnly />
                            : subItems ? t("yes", { ns: "common" }) : t("no", { ns: "common" })
                      }
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

layoutElementsDictionary.registerLayoutElement('list_paiement', ListPaiement);
