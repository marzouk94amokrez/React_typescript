import { MultivalProps } from "../multivalProps";

/** <b>Composant de consultation multival de type dropdown</b> */
export const MultivalDropdownDisplay = ({
  selectedOptions,
  valueField,
  titleField,
}: MultivalProps) => {
  return (
    <ul className="flex space-x-2">
      {selectedOptions.map((option: any) => (
        <li
          key={option[valueField]}
          className={`flex flex-row rounded bg-[var(--multi-enum-background-color)] px-2 items-center uppercase`}
        >
          {option[titleField]}
        </li>
      ))}
    </ul>
  );
};
