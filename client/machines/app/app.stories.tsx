import React, { FC } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useMachine } from '@client/machines';
// import { formOptions } from '@client/machines/form/formOptions';
import { TimerActorRef, TimerSend, TimerState } from '@client/machines/timer/timerMachine';
import { Inspector } from '@client/components';

import { useActor } from '@xstate/react';
import { ActorRef } from 'xstate';
import { appOptions } from '@client/machines/app/appOptions';
import { appMachine, defaultAppSettings } from './appMachine';

export default {
  title: 'Machines/App',
} as Meta;

const AppMachine: FC = () => {
  const [state] = useMachine(appMachine, {
    devTools: true,
    context: {
      ...defaultAppSettings,
      timers: {
        pomo: 3,
        short: 1,
        long: 3,
      },
    },
    ...appOptions({
      actions: {
        hookOnTick: (_, { timeLeft: { seconds, mins } }) => {
          // console.log(`time left: ${mins} ${seconds}`);
        },
        hookBreakComplete: () => {},
        hookTimerComplete: (c) => {
          console.log(c);
          console.log('timer complete');
        },
      },
    }),
  });

  const timer = state.context.timerRef;

  return (
    <div style={{ color: 'white' }}>
      {state.matches('pomo') && timer && <Timer timerRef={timer} color="red" />}
      {state.matches('shortBreak') && timer && <Timer timerRef={timer} color="green" />}
      {state.matches('longBreak') && timer && <Timer timerRef={timer} color="purple" />}
    </div>
  );
};

const Timer: FC<{ timerRef: TimerActorRef; color: 'green' | 'purple' | 'red' }> = ({
  timerRef,
  color,
}) => {
  const [state, send] = useActor(timerRef as ActorRef<any>) as [TimerState, TimerSend];

  return (
    <div style={{ color }}>
      <p>{timerRef.id}</p>
      <button type="button" onClick={() => send({ type: 'PLAY' }, { to: 'timer-short-break' })}>
        cunther
      </button>
      {state.value}
      {state.matches('initial') && (
        <button type="button" onClick={() => send({ type: 'PLAY' })}>
          start
        </button>
      )}
      {!state.matches('initial') && (
        <button type="button" onClick={() => send({ type: 'STOP' })}>
          stop
        </button>
      )}
      {(state.matches('tickStart') || state.matches('tickEnd')) && (
        <button type="button" onClick={() => send({ type: 'PAUSE' })}>
          pause
        </button>
      )}
      {state.matches('paused') && (
        <button type="button" onClick={() => send({ type: 'PLAY' })}>
          play
        </button>
      )}
      {state.matches('complete') && <p>timer done</p>}
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
