import { injectGlobal } from "styled-components";

import "font-awesome/css/font-awesome.css";

injectGlobal`
*{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}
body {
    background-color: #F5F5F5;
    text-align: center;
    font-family: sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiase !important;
}

#root {
    width: 100%;
}

`;
