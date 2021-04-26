import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    :root {
    font-size: 62.5%;
    }

    body {
    color: white;
    font-size: 2.1rem;
    font-family: "Rubik", sans-serif;
    /* font-weight: 300; */
    }
`;

export default GlobalStyle;
