import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Inspector } from '@client/components';
import { useMachine } from '@client/machines';
// import { formOptions } from '@client/machines/form/formOptions';
import { defaultTimerContext, timerMachine, TimerSend } from '@client/machines/timer/timerMachine';
import { timerOptions } from '@client/machines/timer/timerOptions';
import axios from 'axios';
import { appOptions } from './appOptions';

import { AppContext, appMachine, AppSend, AppState, defaultAppSettings } from './appMachine';

export default {
  title: 'Machines/App',
} as Meta;

const appContext: AppContext = {
  ...defaultAppSettings,
};

const AppMachine: FC = () => {
  const [state, send] = useMachine(appMachine, {
    devTools: true,
    context: appContext,
    ...appOptions({
      actions: {
        runStartHooks: () => {
          console.log('start hook');
        },
        runEndHooks: () => {
          console.log('end hook');
        },
      },
    }),
  });

  const {
    autoStart: { beforeLongBreak, beforePomo, beforeShortBreak },
  } = state.context;

  return (
    <div style={{ color: 'white' }}>
      {state.matches('pomo') && (
        <Timer appSend={send} appState={state} title="pomodoro" autoStart={beforePomo} />
      )}
      {state.matches('shortBreak') && (
        <Timer appSend={send} appState={state} title="break" autoStart={beforeShortBreak} />
      )}
      {state.matches('longBreak') && (
        <Timer appSend={send} appState={state} title="longBreak" autoStart={beforeLongBreak} />
      )}
    </div>
  );
};

const Timer: FC<{
  appSend: AppSend;
  appState: AppState;
  autoStart: boolean;
  title: string;
}> = ({ appState, appSend, title, autoStart }) => {
  const [state, send] = useMachine(
    timerMachine.withContext({
      ...defaultTimerContext,
      autoStart,
    }),
    {
      devTools: true,
      ...timerOptions({
        actions: {
          completed: () => {
            appSend({ type: 'COMPLETE' });
          },
        },
        delays: {
          ONE_SECOND: 50,
        },
      }),
    }
  );

  return (
    <div style={{ color: 'white' }}>
      {title}
      {state.matches('initial') && (
        <button
          type="button"
          onClick={() => {
            appSend({ type: 'START' });
            send({ type: 'PLAY' });
          }}
        >
          start
        </button>
      )}
      {!state.matches('initial') && (
        <button
          type="button"
          onClick={() => {
            send({ type: 'STOP' });
            appSend({ type: 'STOP' });
          }}
        >
          stop
        </button>
      )}
      {state.matches('counting') && (
        <button type="button" onClick={() => send({ type: 'PAUSE' })}>
          pause
        </button>
      )}
      {state.matches('paused') && (
        <button type="button" onClick={() => send({ type: 'PLAY' })}>
          play
        </button>
      )}
      <div>
        mins: {state.context.timeLeft.mins}
        seconds: {state.context.timeLeft.seconds}
      </div>
    </div>
  );
};

export const App: Story = () => (
  <>
    <Inspector />
    <AppMachine />
  </>
);
