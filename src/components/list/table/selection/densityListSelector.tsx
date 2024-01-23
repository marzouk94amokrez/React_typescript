import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGripLines } from "@fortawesome/free-solid-svg-icons";
import FilterButton from "@/components/generic/button/filterButton";
import { faLineHeight } from "@fortawesome/pro-solid-svg-icons";

export enum DensityValue {
  COMPACT = "compact",
  STANDARD = "standard",
  CONFORTABLE = "confortable",
}

interface DensityListSelectorProps {
  /** Liste de la valeur de densité */
  listItemDensity?: any[];
  /** Evènement click pour selectionner la valeur de densité*/
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  /** Evènement pour changer la valeur de densité  */
  onChangeDensity?: any;
}

export const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    background: "transparent",
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? null : null,
    cursor: "pointer",
  }),

  dropdownIndicator: (base: any) => ({
    ...base,
    display: "none",
    paddingTop: 0,
    paddingBottom: 0,
  }),

  indicatorSeparator: (base: any) => ({
    ...base,
    display: "none",
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    minHeight: 20,
    paddingTop: 0,
    background: "transparent",
  }),

  singleValue: (provided: any) => ({
    ...provided,
    color: "var(--color-sec)",
    display: "none",
  }),

  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: "var(--color-sec)",
    };
  },

  option: (provided: any, state: any) => ({
    ...provided,
    background: "transparent",
    color: "var(--color-sec)",
    cursor: "pointer",
    paddingBottom: "1px",
  }),

  menu: (base: any) => ({
    ...base,
    border: "2px solid var(--colors-secondary-3)",
    borderRadius: "4px",
    display: "flex",
    width: "8rem",
  }),
};

const iconClasses = ["cursor-pointer", "text-[1.3rem]", "w-4", "h-4"];

const menuItems = [
  {
    value: DensityValue.COMPACT,
    label: (
      <div className="flex flex-row items-center">
        <FontAwesomeIcon
          className={`${iconClasses.join(" ")} pr-2`}
          icon={faBars}
        />
        <span>Compact</span>
      </div>
    ),
  },
  {
    value: DensityValue.STANDARD,
    label: (
      <div className="flex flex-row items-center">
        <FontAwesomeIcon
          className={`${iconClasses.join(" ")} pr-2`}
          icon={faBars}
        />{" "}
        <span>Standard</span>
      </div>
    ),
  },
  {
    value: DensityValue.CONFORTABLE,
    label: (
      <div className="flex flex-row items-center">
        <FontAwesomeIcon
          className={`${iconClasses.join(" ")} pr-2`}
          icon={faGripLines}
        />
        <span>Confortable</span>
      </div>
    ),
  },
];

function DensitySelectorMenu({
  onChangeDensity,
  listItemDensity,
}: DensityListSelectorProps) {
  return (
    <ul className="px-4 py-2 overflow-y-auto max-h-80 text-[var(--color-sec)] text-[0.9rem]">
      {listItemDensity &&
        listItemDensity.map((item) => {
          return (
            <li
              key={item.value}
              className="pb-2 cursor-pointer last-of-type:pb-0"
              onClick={() => {
                onChangeDensity && onChangeDensity(item.value);
              }}
            >
              {item.label}
            </li>
          );
        })}
    </ul>
  );
}

/**
 * <b>Composant densité qui permet de diminuer ou augmenter l'espace entre chaque ligne du tableau selon leur valeur </b>
 * <li>Compact</li>
 * <li>Standard</li>
 * <li>Confortable</li>
 */
export default function DensityListSelector({
  onChangeDensity,
  listItemDensity = menuItems,
}: DensityListSelectorProps) {
  const [opened, setOpened] = useState<boolean>(false);

  const onDensityUpdate = useCallback(
    (e: string) => {
      setOpened(false);

      if (onChangeDensity) {
        onChangeDensity(e);
      }
    },
    [onChangeDensity]
  );

  return (
    <FilterButton
      label={"Densité"}
      overFlowStrategy="visible"
      className={`flex flex-row-reverse text-[0.9rem] text-[var(--color-sec)] border-none hover:bg-transparent px-[8px] py-[2px] pt-0`}
      iconClassName={`pl-0 pr-1`}
      labelClassName={`first-letter:uppercase`}
      icon={<FontAwesomeIcon icon={faLineHeight} />}
      menuIsOpen={opened}
      onMenuClosed={setOpened}
      onMenuOpened={setOpened}
      component={{
        Menu: (
          <DensitySelectorMenu
            listItemDensity={listItemDensity}
            onChangeDensity={onDensityUpdate}
          />
        ),
      }}
    />
  );
}
