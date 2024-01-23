import { DisplayFieldProps } from "../displayFieldProps";

export interface MultivalProps extends DisplayFieldProps {
  fieldName: string;
  loadOptions: any | Function;
  selectedOptions: any[];
  valueField: string;
  titleField: string;
  objectData?: any;
}
