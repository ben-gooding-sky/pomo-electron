import styled from 'styled-components';
// import { logger } from '@electron/services/logger';

export interface IButton {
  variant?: 'secondary' | 'tertiary';
}

export const Button = styled.button<IButton>`
  min-width: 100px;
  min-height: 30px;
  ${({ theme, variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          color: ${theme.palette.secondary};
          border: thin solid ${theme.palette.secondary};
        `;
      case 'tertiary':
        return `
          color: ${theme.palette.bright};
          border: none;
          text-decoration: underline;
        `;
      default:
        return `
          color: ${theme.palette.primary};
          border: thin solid ${theme.palette.primary};
        `;
    }
  }}
  background: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 10px;
`;

// export const Button: React.FC<IButton> = ({ children, onClick, primary = false }) => (
//   <Button
//     style={primary ? { color: 'blue' } : { color: 'orange' }}
//     type="button"
//     onClick={
//       onClick ??
//       (() => {
//         // logger.info('hello from client');
//       })
//     }
//   >
//     {children}
//   </Button>
// );
