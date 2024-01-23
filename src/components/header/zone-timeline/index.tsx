import React, { useCallback, useEffect, useState } from "react";
import "./zoneTimeline.scss";

interface ZoneTimelineProps {
  /**
   * Personnalisation de classse à appliquer au conteneur du timeline
   */
  className?: string;
  /**
   * Toute la liste des status effectués
   */
  listCompletedStatus?: any[];
  /**
   * Toute la liste des status en cours
   */
  listInProgressStatus?: any[];
  /**
   * Toute la liste des status à venir
   */
  listUpcomingStatus?: any[];
  /**
   * Pour modéliser et gérer les processus du timeline
   */
  workflow?: any;
}

interface ZoneTimelineBarProps {
  /**
   * Liste en tableau des statuts
   */
  data: any;
  /**
   * Classe du libellé
   */
  labelClassName?: string;
  /**
   * Couleur de la barre
   */
  barClassName?: string;
  /**
   * Vérifier si la bordure est en pointillé ou non
   */
  isBarDashed?: boolean;
}

/**
 * Composant permettant d'afficher les barres correspondant aux statuts sous forme d'une ligne de tableau
 */
const DisplayBarZoneTimeline = ({
  data,
  labelClassName,
  barClassName,
  isBarDashed = false,
}: ZoneTimelineBarProps) => {
  return (
    <>
      {data.map((item: any) => (
        <li
          key={item.label}
          className="flex flex-col items-center overflow-hidden whitespace-normal"
        >
          <span
            className={`flex-auto text-[var(--label-state-done)] max-w-[10rem] text-[0.9rem] block mx-6 mb-4 ${labelClassName ? labelClassName : ""
              }`}
          >
            {item.label}
          </span>
          <span
            className={`flex-none flex flex-row h-[10px] w-full ${isBarDashed ? "px-2 space-x-2" : ""
              }`}
          >
            <i
              className={`inline-block h-full w-full  ${barClassName ? barClassName : ""
                }`}
            />
            <i
              className={`inline-block h-full w-full  ${barClassName ? barClassName : ""
                }`}
            />
            <i
              className={`inline-block h-full w-full  ${barClassName ? barClassName : ""
                }`}
            />
          </span>
        </li>
      ))}
    </>
  );
};

/**
 * <b>Composant ZoneTimeline pour afficher tous les statuts effectués, en cours et à venir sous forme de barre</b>
 */
const ZoneTimeline = ({ className, workflow }: ZoneTimelineProps) => {
  const [completedStatus, setCompletedStatus] = useState<any>([]);
  const [currentStatus, setCurrentStatus] = useState<any>([]);
  const [upcomingStatus, setUpcomingStatus] = useState<any>([]);

  const getStatus = useCallback((stepId: any) => {
    const workFlowsteps = workflow.steps ? workflow.steps : [];
    if (workFlowsteps && workFlowsteps[stepId]) {
      return workFlowsteps[stepId]["name"];
    }
    return "";
  }, [workflow]);

  const initTimeline = useCallback(async () => {
    if (workflow && workflow.workflow) {
      const currentWorkflow = workflow.workflow;
      const completed = currentWorkflow.steps
        .filter(
          (step: { date: null }) => step.date !== null && step.date !== ""
        )
        .map((node: any) => ({ ...node, label: getStatus(node.step) }));
      const current = Array(completed.pop()).map((node) => ({
        ...node,
        label: getStatus(node.step),
      }));
      const upcoming = currentWorkflow.steps
        .filter(
          (node: { date: null }) => node.date === null || node.date === ""
        )
        .map((node: any) => ({ ...node, label: getStatus(node.step) }));
      setCurrentStatus(current);
      setCompletedStatus(completed);
      setUpcomingStatus(upcoming);
    }
  }, [getStatus, workflow]);

  const [workflowIsEmpty, setWorkflowEmpty] = useState(true);

  /**
   * Charger les différents statuts du workflow
   */
  useEffect(() => {
    if (workflow !== undefined && Object.keys(workflow).length) {
      setWorkflowEmpty(false);
    } else {
      setWorkflowEmpty(true);
    }
    initTimeline();
  }, [workflow, initTimeline]);

  return (
    <>
      {workflowIsEmpty ?
        <div className="flex flex-row my-5 mb-4 border-b-2"></div> :
        <div className="w-full mb-4 overflow-x-auto">
          <div className="relative inline-block min-w-full whitespace-nowrap">
            <div className="whitespace-normal absolute bottom-[1.2rem] left-0 right-0 h-[4px] bg-[var(--label-state-color)]"></div>
            <div
              className={`w-full mb-4 relative ${className ? className : ""
                }`}
            >
              <div className="relative flex flex-col items-start">
                <ul className="flex flex-row items-stretch pr-20">
                  <DisplayBarZoneTimeline
                    data={completedStatus}
                    barClassName={"bg-[var(--label-state-done)]"}
                  />
                  <DisplayBarZoneTimeline
                    data={currentStatus}
                    labelClassName={"font-bold"}
                    barClassName={"bg-[var(--label-state-done)]"}
                    isBarDashed={true}
                  />
                  <DisplayBarZoneTimeline
                    data={upcomingStatus}
                    labelClassName={"text-[var(--label-state-futur)]"}
                    barClassName={"bg-[var(--label-state-futur)]"}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )


};

export default ZoneTimeline;
