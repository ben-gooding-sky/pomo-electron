import React, { FC } from 'react';
import { AppSend } from '@client/machines/app/appMachine';
import { useMachine } from '@client/machines';
import { defaultTimerContext, timerMachine } from '@client/machines/timer/timerMachine';
import { merge } from '@shared/merge';
import { isDev } from '@shared/constants';
import { timerOptions } from '@client/machines/timer/timerOptions';
// import { Button } from '@client/components/Button';
import { Box } from '@client/components/Box';
import styled from 'styled-components';
import { TimerProgress } from '@client/components/TimerProgress';

const Button = styled.button`
  width: 50px;
  height: 50px;
  color: ${({ theme }) => theme.palette.primary};
  border: thin solid ${({ theme }) => theme.palette.primary};
  border-radius: 25px;
  background: none;
  outline: none;

  &:focus {
    color: ${({ theme }) => theme.palette.background};
    background: ${({ theme }) => theme.palette.bright};
  }

  &:hover {
    color: ${({ theme }) => theme.palette.background};
    background: ${({ theme }) => theme.palette.primary};
  }
`;

const TimerGrid = styled.div`
  display: grid;
  grid-template-columns: [left] 1fr [middle] 170px [right] 1fr;
  grid-template-rows: [top] 40px [center] 90px [bottom] 40px [control] min-content;
  grid-template-areas:
    '. timer .'
    '. timer .'
    '. timer .'
    '. controls .';
`;

export const Timer: FC<{
  appSend: AppSend;
  autoStart: boolean;
  title: 'break' | 'long break' | 'pomodoro';
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
    <TimerGrid>
      <Box style={{ gridArea: 'timer' }}>
        <TimerProgress
          duration={duration}
          mins={mins}
          seconds={seconds}
          state={state}
          title={title}
        />
      </Box>
      <Box
        style={{
          gridRow: 'top / center',
          gridColumn: 'middle / right',
          justifyContent: 'flex-end',
        }}
      >
        <p
          style={{
            fontSize: 14,
            textAlign: 'center',
          }}
        >
          {title}
        </p>
      </Box>
      <Box
        style={{
          gridRow: 'center / bottom',
          gridColumn: 'middle / right',
        }}
      >
        <p
          style={{
            fontSize: 38,
            textAlign: 'center',
          }}
        >
          {mins} : {seconds >= 10 ? seconds : `0${seconds}`}
        </p>
      </Box>
      <Box style={{ gridArea: 'controls' }}>
        <Box
          style={{
            flexDirection: 'row',
            justifyContent: state.matches('initial') ? 'center' : 'space-between',
          }}
        >
          {state.matches('initial') && (
            <Button
              type="button"
              onClick={() => {
                appSend({ type: 'START' });
                send({ type: 'PLAY' });
              }}
            >
              start
            </Button>
          )}
          {!state.matches('initial') && (
            <Button
              type="button"
              onClick={() => {
                send({ type: 'STOP' });
                appSend({ type: 'STOP' });
              }}
            >
              stop
            </Button>
          )}
          {state.matches('counting') && (
            <Button type="button" onClick={() => send({ type: 'PAUSE' })}>
              pause
            </Button>
          )}
          {state.matches('paused') && (
            <Button type="button" onClick={() => send({ type: 'PLAY' })}>
              play
            </Button>
          )}
        </Box>
      </Box>
    </TimerGrid>
  );
};
