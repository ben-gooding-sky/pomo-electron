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
    overflow-x: hidden;
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

export const ScrollbarStyle = createGlobalStyle`
  // body::-webkit-scrollbar {
  //   display: none;
  // }

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    transition: all 0.2s;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.background};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.backgroundBright};
    border-radius: 4px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.palette.backgroundBrightest};
  }
`;
