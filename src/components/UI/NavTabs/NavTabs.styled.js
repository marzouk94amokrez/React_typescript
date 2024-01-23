import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavTabsUl = styled.ul`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const NavTabsLi = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3rem;
    background-color: white;
    flex-direction: column;
    `

export const NavTabsLink = styled(Link)`
    font-weight: 500;
    color: ${({theme}) => theme.colors.secondary};
    /* border-bottom: ${({active, theme}) => active ? `6px solid ${theme.colors.secondary}` : 'none'}; */
    text-decoration: none;
    padding-bottom: 0.5rem;

    &:hover {
        color: ${({theme}) => theme.colors.secondary};
        /* border-bottom: 6px solid ${({theme}) => theme.colors.secondary}; */
    }
`

export const NavTabsLineBar = styled.div`
    height: 10px;
    width: 100%;
    position: relative;
    bottom: -6px;
    background-color: ${({color, theme}) => color || theme.colors.secondary};
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 18px;
    opacity: ${({active}) => active ? 1 : 0};

    ${NavTabsLi}:hover & {
        opacity: 1 !important;
    }
`