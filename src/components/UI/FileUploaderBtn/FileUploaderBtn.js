import React from 'react';
import styled from 'styled-components';
import MandatoryMarker from '../../../components/UI/MandatoryMarker';

const UploadButton = styled.button`
    color: #2174B9 ;
    ${props => props.border ? `border: 1px solid ${props.theme.colors.primary};` : 'border-style: hidden;'}
 
    padding: 0.125rem 1rem;
   
    background-color: white;
    font-size: 0.8rem;
    display: flex;
    border-radius: 5px;
    
    &:hover {
      ${props => props.border ? `background-color:  ${props.theme.colors.primary};` : null}
      color: #ffffff;
      
        & svg {
            fill: #809FB8;
        }
    }
`;

const FileUploaderBtn = ({btnLabel, name, handleChange, icon,label, mandatory,border, color }) => {
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <UploadButton border={border} onClick={handleClick}>
        {label &&
        <span >
            {btnLabel || "Télécharger"}
        </span>
        }
        
        {mandatory && <MandatoryMarker /> }
        {icon || null}
      </UploadButton>
      <input 
        type="file"
        ref={hiddenFileInput}
        onChange={(e) => handleChange(e)}
        style={{display:'none'}} 
        name={name}
      /> 
    </>
  );
};
export default FileUploaderBtn;