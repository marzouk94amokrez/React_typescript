import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        background: ${({ theme }) => theme.colors.body};
        font-family: 'Roboto Medium', 'Roboto Regular', 'Roboto', sans-serif;
        font-size: 1.15em;
        margin: 0;
    }

    p {
        /* opacity: 0.6; */
        line-height: 1.5;
    }

    img {
        max-width: 100%;
    }

    .modal_w_mc{
        max-width: fit-content;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgb(214, 209, 209); 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: rgb(204, 199, 199); 
    }
`

export default GlobalStyles;