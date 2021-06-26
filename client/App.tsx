import React, { FC } from 'react';
import { render } from 'react-dom';
import { logger } from '@electron/services/logger';
import { GlobalStyle } from './styles/GlobalStyle';

import Greetings from './components/Greetings';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

logger.info('Client loaded');

const App: FC = () => (
  <>
    <GlobalStyle />
    <Greetings />
  </>
);

render(<App />, mainElement);
