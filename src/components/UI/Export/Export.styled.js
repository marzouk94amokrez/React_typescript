import styled from 'styled-components';

export const ExportWrap = styled.div`
    /* width: 100%; */
    height: 50px;
    position: relative;
    margin-left: 1rem;
`;

export const ExportContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    width: 150px;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border: 2px solid #D9E1E7;
    border-radius: 16px;
    color: #D9E1E7;
    cursor: pointer;
`

export const ExportValue = styled.h4`
    font-size: 0.9rem;
    color: #2174b9;
    margin: 0;
`

export const ExportIcon = styled.div`
    display: flex;
    /* margin-left: 0.5rem; */
`;

export const ExportOptions = styled.ul`
    display: flex;
    width: 100%;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    border: 2px solid #D9E1E7;
    border-radius: 16px;
    font-size: 00.9rem;
    background-color: white;
    position: absolute;
    z-index: 100;
`

export const ExportOption = styled.li`
    padding: 0.25rem 0.5rem;
    border-radius: 16px;
    margin: 0;
    color: #2174b9;
    cursor: pointer;

    &:hover {
        background-color: #D9E1E7;
    }
`