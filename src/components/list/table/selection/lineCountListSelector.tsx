import React from "react";
import Select from "react-select";

interface LineCountListSelectorProps {
  /** Valeur actuelle dans la liste des lignes affichées */
  currentValue?: string;
  /** Libellé de la liste */
  label?: string;
  /** Liste des valeurs possibles de la liste en tableau   */
  listValuesLine?: any[];
  /** style css */
  className?: string;
  /** Evènement lors d'un clic pour selectionner une valeur des lignes  */
  onChangeLine?: any;
}
const defaultNumbers = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];
const defautCurentValue = "25";
const defaultLabel = "Lignes";

export const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    background: "none",
    // Overwrittes the different states of border
    border: state.isFocused ? 0 : 0,
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    fontSize: "0.8rem",
    text: "var(--color-sec)",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
    color: "var(--color-sec)",
    fontSize: "1.3rem",
    cursor: "pointer",
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: "none",
  }),
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: "var(--color-sec)",
    };
  },
  valueContainer: (provided: any) => ({
    ...provided,
    minHeight: 20,
    paddingTop: "0",
    paddingBottom: 0,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "var(--color-sec)",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    background: "transparent",
    color: "var(--color-sec)",
    cursor: "pointer",
  }),
};

/**
 *  <b>Composant de sélection de nombre de ligne à afficher pour une liste donnée</b>
*/
export const LineCountListSelector = ({
  currentValue = defautCurentValue,
  label = defaultLabel,
  listValuesLine = defaultNumbers,
  className,
  onChangeLine,
}: LineCountListSelectorProps) => {
  const textLineClasses = [
    "text-[var(--color-sec)]",
    "text-[0.9rem]",
    "cursor-pointer",
    "flex",
  ];

  return (
    <div className={`${textLineClasses.join(" ")} ${className}`}>
      <span className={"flex flex-row items-center"}>{label}</span>
      <Select
        options={listValuesLine}
        onChange={onChangeLine}
        styles={customStyles}
        isSearchable={false}
        placeholder={currentValue}
      />
    </div>
  );
};
