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
    /* -webkit-tap-highlight-color: transparent;  */
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background: transparent; 
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #454359; 
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #56546a; 
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
