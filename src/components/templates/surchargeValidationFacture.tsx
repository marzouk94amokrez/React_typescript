import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import templatesDictionary from "./templatesDictionary";
import { useParams } from "react-router";
import { ConsultDocument, ConsultDocumentProps } from "./consultDocument";
import { useGetObjectByIdQuery } from "@/store/api";

/**
 * <b>Composant pour de surcharge de validation de facture</b>
 */
export function SurchargeValidation({
  model,
  modelFields,
  modelLayouts,
  layoutActions,
}: ConsultDocumentProps) {
  const { t } = useTranslation(["common", "invoice"]);
  const { id } = useParams();
  const modelEndpoint = useMemo(() => model.endpoint || "", [model]);

  const {
    data: objectData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetObjectByIdQuery(
    { objectName: modelEndpoint, id },
    { skip: !modelEndpoint || !id }
  );

  /**
   * Enregistrement à afficher
   */
  const record = useMemo(() => {
    return objectData?.data?.records?.at(0);
  }, [objectData]);

  return (
    <>
      <ConsultDocument
        model={model}
        modelFields={modelFields}
        modelLayouts={modelLayouts}
        layoutActions={layoutActions}
        editButtonVisible={false}
        saveButtonVisible={false}
        deleteButtonVisible={false}
        record={record}
      />
    </>
  )
}

templatesDictionary.registerTemplate("surcharge_validation_facture", SurchargeValidation);
