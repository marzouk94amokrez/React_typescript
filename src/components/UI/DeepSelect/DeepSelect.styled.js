import styled from 'styled-components';

export const SelectWrap = styled.div`
    width: ${({width}) => width ? width : '100%'};
    height: 100%;
    position: relative;
`;

export const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    width: ${({ width }) => width ? width : '150px'};
    justify-content: space-between;
    padding: 0.3rem 0.5rem;
    border: 2px solid #D9E1E7;
    border-radius: 16px;
    color: #D9E1E7;
    cursor: pointer;
`

export const SelectValue = styled.h4`
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.primary};
    margin: 0;
`

export const SelectIcon = styled.div`
    display: flex;
    /* margin-left: 0.5rem; */
`;

export const SelectOptions = styled.div`
    display: flex;
    position: absolute;
    width: ${({ width }) => width ? width : '100%'};
    flex-direction: column;
    list-style: none;
    margin: 0;
    border: 2px solid #D9E1E7;
    border-radius: 16px;
    font-size: 00.9rem;
    background-color: ${({theme}) => theme.colors.content};
    // position: relative;
    z-index: 100;
    padding: 7px;
`

export const SelectOption = styled.li`
    padding: 0.25rem 0.5rem;
    border-radius: 16px;
    margin: 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    color: ${({theme}) => theme.colors.primary};

    &:hover {
        background-color: #D9E1E7;
    }
`