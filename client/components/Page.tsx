import styled from 'styled-components';

export const Page = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  overflow: hidden;

  color: ${({ theme }) => theme.palette.white};
  background-color: ${({ theme }) => theme.palette.background};
`;
