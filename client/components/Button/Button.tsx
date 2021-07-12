import React from 'react';
// import { logger } from '@electron/services/logger';

export interface IButton {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  primary?: boolean;
}
export const Button: React.FC<IButton> = ({ children, onClick, primary = false }) => (
  <button
    style={primary ? { color: 'blue' } : { color: 'orange' }}
    type="button"
    onClick={
      onClick ??
      (() => {
        // logger.info('hello from client');
      })
    }
  >
    {children}
  </button>
);
