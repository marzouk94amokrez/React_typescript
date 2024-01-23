import { DisplayFieldProps } from "../displayFieldProps";

export interface MonovalProps extends DisplayFieldProps {
  fieldName: string;
  loadOptions: any | Function;
  selectedOptions: any[];
  valueField: string;
  titleField: string;
  isHasMore: boolean;
  objectData?: any;
  fieldMetadata?: any;
}
