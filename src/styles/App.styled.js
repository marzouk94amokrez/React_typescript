import styled from "styled-components";

export const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.body};
`;

export const AppBody = styled.div`
  display: flex;
  width: 100%;
`;

export const AppContent = styled.div`
    /* width: calc(100% - 330px); */
    width: 100%;
    overflow:${({isOverflow}) => isOverflow ? 'auto' : 'initial'} ;

    /* overflow: auto; */
    margin: 0 1rem 1rem 0;
    padding: 3rem 2rem;
    background-color: ${({theme}) => theme.colors.content};
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 18px;
    color: ${({theme}) => theme.colors.lightBlack};

  @media (max-width: ${({ theme }) => theme.size.laptopL}) {
    /* width:calc(100% - 240px); */
  }
`;
