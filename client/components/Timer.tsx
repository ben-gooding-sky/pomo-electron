import React, { FC } from 'react';
import { AppSend } from '@client/machines/app/appMachine';
import { useMachine } from '@client/machines';
import { defaultTimerContext, timerMachine } from '@client/machines/timer/timerMachine';
import { merge } from '@shared/merge';
import { isDev } from '@shared/constants';
import { timerOptions } from '@client/machines/timer/timerOptions';
import { Button } from '@client/components/Button';

export const Timer: FC<{
  appSend: AppSend;
  autoStart: boolean;
  title: string;
  duration: number;
}> = ({ appSend, title, autoStart, duration }) => {
  const [state, send] = useMachine(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    timerMachine.withContext(
      merge(defaultTimerContext, { autoStart, duration })
    ) as typeof timerMachine,
    {
      devTools: isDev,
      ...timerOptions({
        actions: {
          tickEvent: ({ timeLeft }) => {
            appSend({ type: 'TICK', timeLeft });
          },
          completed: () => {
            appSend({ type: 'COMPLETE' });
          },
        },
        delays: {
          // ONE_SECOND: 1000,
          // ONE_SECOND: 50,
        },
        services: {
          count1Second: async () => {
            await window.bridge.count1Second();
          },
        },
      }),
    }
  );

  const { mins, seconds } = state.context.timeLeft;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'space-between',
        height: '175px',
      }}
    >
      <p style={{ fontSize: 24 }}>{title}</p>
      <p style={{ fontSize: 48 }}>
        {mins} : {seconds >= 10 ? seconds : `0${seconds}`}
      </p>
      <ul style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        {state.matches('initial') && (
          <li>
            <Button
              type="button"
              onClick={() => {
                appSend({ type: 'START' });
                send({ type: 'PLAY' });
              }}
            >
              start
            </Button>
          </li>
        )}
        {!state.matches('initial') && (
          <li>
            <Button
              type="button"
              onClick={() => {
                send({ type: 'STOP' });
                appSend({ type: 'STOP' });
              }}
            >
              stop
            </Button>
          </li>
        )}
        {state.matches('counting') && (
          <li>
            <Button type="button" onClick={() => send({ type: 'PAUSE' })}>
              pause
            </Button>
          </li>
        )}
        {state.matches('paused') && (
          <li>
            <Button type="button" onClick={() => send({ type: 'PLAY' })}>
              play
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
};
