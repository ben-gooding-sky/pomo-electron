import React, { FC } from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from '@electron/electron';
import { bridgeCreator } from '@electron/ipc/bridgeCreator';
import { ThemeProvider } from 'styled-components';
import { theme } from '@client/styles/theme';
import { ErrorBoundary } from '@client/components/ErrorBoundary/ErrorBoundary';
import { logger } from '@electron/services/logger';
import { ConfigProvider } from '@client/components/useConfig';
import { PageManager } from '@client/components/PageManager';
import { ScrollBar } from '@client/components/ScrollBar';
import { GlobalStyle } from './styles/GlobalStyle';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

window.bridge = bridgeCreator(ipcRenderer);

const App: FC = () => (
  <>
    <ErrorBoundary logger={logger}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ScrollBar />
        <ConfigProvider>
          <PageManager />
        </ConfigProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </>
);

render(<App />, mainElement);
