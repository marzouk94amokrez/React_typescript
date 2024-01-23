import styled from 'styled-components';


export const ACContainer = styled.div`
    /* width: 100%; */
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;

`
export const ACInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    text-align: left;
    color: #505050;
    font-size: 0.8rem;
`;

export const ACList = styled.ul`
    display: flex;
    width: 100%;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    border: 2px solid #D9E1E7;
    font-size: 00.9rem;
    background-color: white;
    position: absolute;
    top: 23px;
    z-index: 100;
`

export const ACItem = styled.li`
    padding: 0.25rem 0.5rem;
    border-radius: 16px;
    margin: 0;
    cursor: pointer;

    &:hover {
        background-color: #D9E1E7;
    }
`