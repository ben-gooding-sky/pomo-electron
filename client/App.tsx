import React, { FC } from 'react';
import { render } from 'react-dom';
import { logger } from '@electron/services/logger';
import { GlobalStyle } from './styles/GlobalStyle';
import { Button } from './components/Button';

// import Greetings from './components/Greetings';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

logger.info('client loaded');

const App: FC = () => (
  <>
    <GlobalStyle />
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button>Hello Tray Application!</Button>
      </div>
    </div>
  </>
);

// logger.info('Client loaded');
render(<App />, mainElement);
