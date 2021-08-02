import React, { FC, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from '@electron/electron';
import { bridgeCreator } from '@electron/ipc/bridgeCreator';
import { ThemeProvider } from 'styled-components';
import { theme } from '@client/styles/theme';
import { ErrorBoundary } from '@client/components/ErrorBoundary/ErrorBoundary';
import { logger } from '@electron/services/logger';
import { ConfigProvider } from '@client/components/useConfig';
import { PageManager } from '@client/components/PageManager';
import { GlobalStyle, ScrollbarStyle } from './styles/GlobalStyle';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

window.bridge = bridgeCreator(ipcRenderer);

const App: FC = () => {
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    if (widthNoScroll - widthWithScroll !== 0) {
      setShowScroll(true);
    }
  }, []);

  return (
    <>
      <ErrorBoundary logger={logger}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {showScroll && <ScrollbarStyle />}
          <ConfigProvider>
            <PageManager />
          </ConfigProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
};

render(<App />, mainElement);
