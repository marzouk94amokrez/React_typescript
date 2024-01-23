import styled from 'styled-components';



export const PVToolbar  = styled.div`
    display: flex;
    align-items: center;
`;

export const PVToolbarElements = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const PVToolbarElementsActions = styled.div`
    display: flex;
    align-items: center;
`

export const PVToHideMobile = styled.div`
    display: block;
    padding: 0px 2px;

    @media (min-width: 320px) and (max-width: 767px) {
        display: none;
    }
`


export const PVContainer = styled.div`
    height: ${({commandLine}) => commandLine ? '25vh' : '100vh'};

    & .rpv-default-layout-body {
        background-color: #ffffff;
    }

    & .rpv-default-layout-toolbar {
        background-color: rgba(25, 98, 158, 0.3);
    }

    & .rpv-default-layout-toolbar svg {
        stroke: ${({ theme }) => theme.colors.lightBlack};
    }

    & .rpv-default-layout-sidebar-headers{
        background-color: rgba(25, 98, 158, 0.3);
    }
    & .rpv-default-layout-container{
        border: 1px solid #809FB8;
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        width: 100%;
        padding: 0.8rem 1.5rem;
        border-radius: 18px;
        }
    & .rpv-default-layout-sidebar-headers svg {
        stroke: ${({ theme }) => theme.colors.lightBlack};
    }

    @media (min-width: 320px) and (max-width: 767px) {
        .rpv-default-layout-sidebar {
            display: none;
        }
        .rpv-default-layout-container{
            z-index: 100;
        }
    }
`;
