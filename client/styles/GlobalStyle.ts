import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Lato, Helvetica, sans-serif;
    font-size: 16px;
  }

  li {
    text-decoration: none;
    list-style-type: none;
  }


  svg {
    max-height: 100%;
    max-width: 100%;
  }
`;
