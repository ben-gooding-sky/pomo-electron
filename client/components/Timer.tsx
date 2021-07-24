import React, { FC } from 'react';
import { AppSend } from '@client/machines/app/appMachine';
import { useMachine } from '@client/machines';
import { defaultTimerContext, timerMachine } from '@client/machines/timer/timerMachine';
import { merge } from '@shared/merge';
import { isDev } from '@shared/constants';
import { timerOptions } from '@client/machines/timer/timerOptions';

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
