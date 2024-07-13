import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./Font.css";

const GlobalStyle = createGlobalStyle`
    ${reset}

    body {
        font-family: "Noto Sans KR", sans-serif;
        background-color: #000;
    }
`;

export default GlobalStyle;
