import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Table = styled.table`
    width: 100%;
    /* height: 100%; */
    table-layout: fixed;

    @media (min-width: ${({theme}) => theme.size.tablet}) and (max-width: ${({theme}) => theme.size.laptop}) {
        width: auto;
    }
`;

export const TD = styled.td`
    padding: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    & > span {
        display: block;
        width: 100%;
        overflow: hidden; 
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`

export const TBody = styled.tbody`
    width: 100%;
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.lightBlack};

    tr {
        border-bottom: 0.0rem solid white;
    }

    & ${TD} {
        width: 100%;
        vertical-align: middle;
        height: ${({height}) => height ? height : '100%'};
    }
`;

export const SpinnerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
`;

export const NoContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: ${({theme}) => theme.colors.secondary};
    margin: 1rem 0;
`

export const TAContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const TableAction = styled.div`
    display: flex;
    justify-content: space-between ;
    align-items: center;
    height: 50px;
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid #D9E1E7;
    border-radius: 16px;
    color: ${({theme}) => theme.colors.primary};
    cursor: pointer;
    font-size: 0.9rem;

    & span {
        color: ${({theme}) => theme.colors.primary};
        margin: 0 0.5rem 0 0;
    }

    &:hover {
        background-color: ${({theme}) => theme.colors.btnHover};
    }
`;

export const TableActionLink = styled(Link)`
    display: flex;
    justify-content: space-between ;
    align-items: center;
    height: 50px;
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid ${({theme}) => theme.colors.primary};
    text-decoration: none;
    border-radius: 16px;
    color: ${({theme}) => theme.colors.primary};
    cursor: pointer;
    font-size: 0.9rem;
    background-color: ${({active, theme}) => active ? theme.colors.btnHover : '#FFFFFF'};

    & span {
        color: ${({theme}) => theme.colors.primary};
        margin: 0 0.5rem 0 0;
    }

    &:hover {
        background-color: ${({theme}) => theme.colors.btnHover};
    }
`;

export const THead  = styled.thead`
    width: 100%;
    color: ${({theme}) => theme.colors.secondary};
    font-size: 0.9rem;
    background-color: #FFFFFF;
`

export const TH = styled.th`
    width: ${({width}) => width || 'auto'};
    padding-bottom: 0 0.25rem 1rem 0.25rem;
    font-weight: normal;
`

export const THContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    cursor: pointer;
  

    & > span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        font-weight: normal;
    }
` 

export const FilterContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding-right: 0.5rem;
`


export const SelectFilter = styled.select`
    width: 100%;
    height: 100%;
    border: none;
    border-bottom: 2px solid ${({theme}) => theme.colors.secondary};
    outline: none;
    color: #505050 !important;
    font-size: 0.9rem;
    background-color: #FFFFFF;
    cursor: pointer;

    &:hover {
        border-bottom: 2px solid ${({theme}) => theme.colors.primary};
    }
    &::placeholder {
        color: ${({theme}) => theme.colors.gray};
        font-style: italic;
    }

`

export const Option = styled.option`
    width: 100%;
`

export const InputFilter = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    border-bottom: 2px solid ${({theme}) => theme.colors.secondary};
    outline: none;
    color: #505050 !important;
    font-size: 0.8rem;
    background-color: #FFFFFF;

    &:hover {
        border-bottom: 2px solid ${({theme}) => theme.colors.primary};
    }

    &:focus {
        border-bottom: 2px solid ${({theme}) => theme.colors.primary};
    }
    &::placeholder {
        color: ${({theme}) => theme.colors.gray};
        font-style: italic;
    }
`

export const InvoiceLink = styled(Link)`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background-color: ${({status, theme}) => status || '#FFFFFF'};
    color: ${({theme}) => theme.colors.lightBlack};
    border-radius: 8px;
    
    & > span {
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &:hover {
        color: ${({theme}) => theme.colors.lightBlack};
    }
`

export const ToInvoicesLink = styled(Link)`
    text-decoration: none;
    color: ${({theme}) => theme.colors.primary};
    font-size: 0.9rem;
    margin: 23px 0px 0px 23px;
    & > span {
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &:hover {
        color: ${({theme}) => theme.colors.primary};
    }
`

export const SelectStatus = styled.select`
    width: 95%;
    height: 77%;
    border: none;
    display: flex;
    background-color: ${({status, theme}) => status || '#FFFFFF'};
    color: #505050 !important;
    border-radius: 8px;
    cursor: pointer;
    outline: none;
    align-items:center ;
    text-align: center;


    &::placeholder {
        color: ${({theme}) => theme.colors.lightBlack};
        font-style: italic;
    }
`
export const StatusOption = styled.option`
    background-color: #FFFFFF;
    color: ${({theme}) => theme.colors.lightBlack};
`

export const SupplierStatusSpan = styled.span`

height: 77%;
border: none;

background-color: ${({status, theme}) => status || '#FFFFFF'};
color: #505050 !important;
border-radius: 8px;
cursor: pointer;
outline: none;
align-items:center ;
text-align: center;
`
export const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0.5rem 1rem;
    border: 2px solid #D9E1E7;
    border-radius: 16px;
    color: #D9E1E7;
    margin-right: 1rem;
`

export const SearchInput = styled.input`
    border: none;
    outline: none;
    color: ${({theme}) => theme.colors.lightBlack};
    font-size: 0.8rem;
    
    &::placeholder {
        color: ${({theme}) => theme.colors.primary} !important;
        font-style: italic;
    }
    &:focus-within {
        // border: 2px solid #2174B9;
        color: ${({theme}) => theme.colors.lightBlack};
    }
`

export const ELDItemsContainer = styled.div`
    /* visibility: hidden; */
    width: 100%;
    display: none;
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    z-index: 1000;
    background-color: white;
    max-height: 150px;
    /* overflow: auto; */
    border: 2px solid #D9E1E7;
    border-radius: 8px;
    padding: 0.25rem;

    &:before {
        content: "";
        position: absolute;
        top: -16px;
        left: 10px;
        transform: translateX(-50%);
        border: 7px solid;
        /* border-color: transparent transparent #706E6B transparent; */
        border-color: transparent transparent #D9E1E7 transparent;
    }
`

export const ELDItemsListContainer = styled.div`
    width: 100%;
    max-height: 140px;
    overflow: auto;
`

export const ELDItems = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
    padding: 0;
    margin: 0;
    list-style: none;
    /* max-height: 140px; */
    overflow: auto;
`

export const EntitiesListDetail = styled.div`
    position: relative;
    width: 100%;

    &:hover ${ELDItemsContainer} {
        display: block;
    }
`

export const ELDValue = styled.div`
    width: 100%;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const ELDVal = styled.li`
    width: 100%;
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
    background-color: #FFFFFF;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;
`
