import styled from 'styled-components';
type IVContainerProps = {
    accessToken: any; // Remplacez le type par ce qui est approprié (boolean, string, etc.)
  };
  
  export const IVContainer = styled.div<IVContainerProps>`
    width: ${({ accessToken }) => (accessToken ? '90%' : '100%')};
    display: flex;
    justify-content: center;
    align-items: center;
  `;
export const IVWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const EntHeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    border-bottom: 4px solid #F5FBFF;
`;
export const XmlDiv = styled.div`
     width: 100%;
    height: 600px;
    overflow: auto;
`;

export const IVDownloadContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

export const IVDownloadIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 1rem;

    &:hover {
        color: ${({theme}) => theme.colors.primary};
    }
`

export const ContentSelect = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 11px;

`