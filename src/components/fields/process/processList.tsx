import { useCallback, useEffect, useMemo, useState } from "react";
import { DisplayFieldProps } from "../displayFieldProps";
import { useLogger } from "@/utils/loggerService";

/** <b>Composant de liste d'un champ de type process</b>*/
export default function ProcessList({ fieldName, record, fieldsMetadataMap, viewType }: DisplayFieldProps) {
  const { logger } = useLogger();

  const workflow = useMemo(() => {
    const r = record || {};
    const v = r[fieldName as string];
    
    if (!v) {
      logger.warn('No workflow content on a process field! Please check record or metadata configs.');
      logger.debug(`Metadata mismatch (field should be viewable in this context: ${viewType})`, {
        field: fieldName,
        meta: fieldsMetadataMap?.get(fieldName as string),
        view: viewType,
      })
    }

    return v || {}
  }, [record, fieldName])

  const [value, setValue] = useState();
  const [color, setColor] = useState();

  const workflowSteps = workflow.steps || {};

  // Chargement du statut courant d'un champ process 
  const getCurrentStatus = useCallback(async () => {
    const statusWorkflow = workflow.workflow || {};
    const completed = (statusWorkflow.steps || [])
      .filter(
        (step: { date: null }) => step.date !== null && step.date !== ""
      );
    
    if (completed && completed.length) {
      const current = Array(completed.pop()).map((node) => ({
        ...node,
        status: workflowSteps[node.step].name,
        color: workflowSteps[node.step].color,
      }));

      setValue(current[0].status);
      setColor(current[0].color);
    }
  }, [workflow, workflowSteps]);

  useEffect(() => {
    getCurrentStatus();
  }, [getCurrentStatus]);
  return (
    <span className="rounded px-4 text-[var(--noir-light)] text-[0.8rem]" style={{ backgroundColor: color }}>{value}</span>
  )
}
