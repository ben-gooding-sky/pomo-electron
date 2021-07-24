import React, { FC, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from '@electron/electron';
import { bridgeCreator } from '@electron/ipc/bridgeCreator';
import { SlackAuth } from '@client/components/SlackAuth';
import { UserConfig } from '@shared/types';
import { PomodoroControl } from './components/PomodoroControl';
import { GlobalStyle } from './styles/GlobalStyle';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

window.bridge = bridgeCreator(ipcRenderer);

const App: FC = () => {
  const [userConfig, setUserConfig] = useState<UserConfig>();
  const [confirmClear, setConfirmClean] = useState(false);
  useEffect(() => {
    window.bridge
      .storeRead()
      .then((s) => {
        if (s.ok) {
          setUserConfig(s.val);
        }
      })
      .catch(console.error);
  }, []);
  return (
    <>
      <GlobalStyle />
      {!userConfig?.slackToken && <SlackAuth />}
      <PomodoroControl userConfig={userConfig} />
      {userConfig?.slackToken && (
        <button
          onClick={() => {
            setConfirmClean(true);
          }}
        >
          clear slack creds
        </button>
      )}
      {confirmClear && (
        <div>
          <p>are you sure?</p>
          <button
            onClick={() => {
              window.bridge.storeReset();
              setConfirmClean(false);
            }}
          >
            yes I am sure
          </button>
          <button
            onClick={() => {
              setConfirmClean(false);
            }}
          >
            no, ignore me
          </button>
        </div>
      )}
    </>
  );
};

render(<App />, mainElement);
