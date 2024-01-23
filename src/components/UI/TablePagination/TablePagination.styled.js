import styled from 'styled-components';

export const TPContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 2rem 0;
`

export const PerPageGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #F5FBFF;
    border-radius: 8px;
    padding: 0.25rem;
    font-size: 0.9rem;
`

export const PerPageLabel = styled.label`
    display: flex;
    margin: 0;
    padding: 0;
    color: #809FB8;
  
`
export const LabelDensityAndColumns = styled.label`
    display: flex;
    margin: 0;
    padding: 0;
    color: #809FB8;
    font-size: 0.9rem;
    margin-left: 5px;
    cursor: pointer;
`

export const PerPageSelect = styled.select`
    cursor: pointer;
    border: none;
    outline: none;
    width: fit-content;
    text-align: right;
    color: #505050;
`