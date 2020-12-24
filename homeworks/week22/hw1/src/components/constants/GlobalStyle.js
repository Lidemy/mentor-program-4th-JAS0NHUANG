import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Courier, monospace;
    font-size: 20px;
    margin: 0;
    text-align: center;
    box-sizing: border-box;
  }
  li {
    list-style-type: none;
  }
  main {
    position:relative;
    min-height: 500px;
    background: #dedede;
    max-width: 1080px;
    width: 100%;
    margin: 70px auto;
    padding: 10px;
    padding-bottom: 50px;
  }
  a {
    text-decoration: none;
    color: #222;
  }
  input {
    text-align: left;
    margin: 15px;
  }
`;

export default GlobalStyle;
