import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Theme } from "./Theme";

const GlobalStyle = createGlobalStyle`
    ${reset}

    html, body, div, span, h1, h2, h3, h4, h5, h6, p,
    a, dl, dt, dd, ol, ul, li, form, label, table {
        margin: 0;
        padding: 0;
        border: 0;
        text-decoration: none;
        box-sizing: border-box;
        ${Theme.fonts.default};
        &:visited {
            text-decoration: none;
            color: black;
        }
    }
    body {
        line-height: 1;
        margin: 0;
        padding: 0;
    }
    ol, ul {
        list-style: none;
    }
    button {
        border: 0;
        cursor: pointer;
    }
`;

export default GlobalStyle;
