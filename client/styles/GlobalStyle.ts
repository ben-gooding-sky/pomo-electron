import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Lato, Helvetica, sans-serif;
    font-size: 16px;
  }
  
  p {
    margin-bottom: 20px;
    text-align: center;
  }
  
  li {
    text-decoration: none;
    list-style-type: none;
    margin-bottom: 20px;
  }
  
  input {
    background: #4C566A;
    border: thin solid #3B4252;
    border-radius: 3px;
    height: 2em;
    color: #E5E9F0;
    padding-left: 5px;
  }
  
  svg {
    max-height: 100%;
    max-width: 100%;
  }
`;
