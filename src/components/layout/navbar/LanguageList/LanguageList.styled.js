import styled from 'styled-components';

export const LangContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const LangBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    color: ${({theme}) => theme.colors.darkText};

    & path {
        fill: ${({theme}) => theme.colors.darkText};
    }
`;

export const LangList = styled.ul`
    width: fit-content;
    position: absolute;
    top: 100%;
    right: 0.5rem;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    padding: 0;
    margin: 0;
    list-style: none;
    z-index: 100;
`;

export const LangItem = styled.li`
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    padding: 10px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    color: ${({ theme }) => theme.colors.secondary};
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};
    &:hover {
        background-color: #f5f5f5;
    }
    &:not(:last-child) {
        border-bottom: 1px solid #e5e5e5;
    }
`;

export const LangIcon = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

export const LangValue = styled.span`
`;
