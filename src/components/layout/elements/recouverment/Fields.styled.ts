import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
export const CheckboxDiv = styled(Checkbox)`
  /* max-width:18% ; */
  & svg {
    font-size: 3rem;
    color: #809fb8;
  }
  & span {
    font-size: 3rem;
  }
  ${({ disabled }) =>
    disabled &&
    `      
            & svg {
                background-color: #ffffff;
                opacity: 0.5;
                color: #e9eaec;
            }
        
  `}
`;
export const FContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

export const FHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
`;

export const FHInfos = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.lightBlack};
`;

export const FFormWrap = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  font-size: 0.9rem;
`;
type FormGroupProps = {
  height?: any; // Remplacez le type par ce qui est approprié (boolean, string, etc.)
  disabled?:boolean
};
export const FormGroup = styled.div<FormGroupProps>`
  width: 100%;
  height: ${({ height }) => (height ? height : "141px")};
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  margin-bottom: 13px;
  align-items: center;

  ${({ disabled }) =>
    disabled &&
    `
        & ${FormGroupDetailChild}{
            background-color: #ffffff;
            color: linen;
            opacity: 0.9;
            border:2px solid  #e9eaec;
            color: #e9eaec;
            & label{
                color: #e9eaec;
            }
        }
        & ${FormGroupInf}{
            background-color: #ffffff;
            color: linen;
            opacity: 0.5;
            border:2px solid  #e9eaec;
            color: #e9eaec;
            & label{
                color: #e9eaec;
            }
        }
        & ${CheckboxDiv}{
            & svg {
                background-color: #ffffff;
                opacity: 0.5;
                color: #e9eaec;
            }
        }
  `}
`;

type FormGroupDetailProps = {
  height?: any; // Remplacez le type par ce qui est approprié (boolean, string, etc.)
  width?:any
};
export const FormGroupDetail = styled.div<FormGroupDetailProps>`
  width: ${({ width }) => (width ? width : "74%")};
  height: ${({ height }) => (height ? height : "140px")};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

type FormGroupDetailChildProps = {
  active?:any
  disabled?:any
};
export const FormGroupDetailChild = styled.div<FormGroupDetailChildProps>`
  width: 100%;
  height: 60px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 4px;
  border: 2px ${({ active }) => (active ? "solid" : "dashed")} #809fb8;
  background-color: ${({ active }) => (active ? "rgba(128,159,184,0.5)" : "#e7eff6")};
  
  border-radius: 8px;
  ${({ disabled }) =>
    disabled &&
    `
            background-color: #ffffff;
            color: linen;
            opacity: 0.9;
            border:2px solid  #e9eaec;
            color: #e9eaec;
            & label{
                color: #e9eaec;
            }
  `}
`;
type FormGroupInfProps = {
  height?: any; // Remplacez le type par ce qui est approprié (boolean, string, etc.)
  active?:any
};
export const FormGroupInf = styled.div<FormGroupInfProps>`
  width: 8%;
  margin-right: 7px;
  height: ${({ height }) => (height ? height : "140px")};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  // padding-bottom: 0.25rem;
  border: 2px ${({ active }) => (active ? "solid" : "dashed")} #809fb8;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => (active ? "rgba(128,159,184,0.5)" : "#e7eff6")};
 
`;
export const ContentChild = styled.div`
  width: 91%;
  display: flex;

  flex-direction: column;
  align-items: center;
  align-self: center;
`;

export const CheckboxGroup = styled.div`
  max-width: 18%;
  display: flex;
  flex-direction: column;
  margin-left: 13px;
`;
