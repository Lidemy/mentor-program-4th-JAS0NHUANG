import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    text-align: center;
    box-sizing: border-box;
    font-family: Courier,monospace;
  }
  h1 {
    font-size: 28px;
    margin: 15px;
    padding: 5px;
    display: inline-block;
    vertical-align: middle;
  }
  li {
    list-style-type: none;
  }
`;
export default GlobalStyle;
