import React, { FC } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Inspector } from '@client/components';
import { useMachine } from '@client/machines';
// import { formOptions } from '@client/machines/form/formOptions';
import { action } from '@storybook/addon-actions';
import { timerOptions } from './timerOptions';

import { defaultTimerContext, timerMachine } from './timerMachine';

export default {
  title: 'Machines/Timer',
  args: {
    secondDuration: 1000,
  },
} as Meta;

const TimerMachine: FC<{ oneSecond: number }> = ({ oneSecond }) => {
  const [state, send] = useMachine(timerMachine, {
    devTools: true,
    context: defaultTimerContext,
    ...timerOptions({
      delays: {
        ONE_SECOND: oneSecond,
      },
      actions: {
        hookStart: () => {
          action('timer started')();
        },
        hookCountTick: ({ timeLeft }) => {
          action(`count left: ${timeLeft.mins}:${timeLeft.seconds}`)();
        },
        hookCompleted: () => {
          action('timer complete')();
        },
      },
    }),
  });

  return (
    <div style={{ color: 'white' }}>
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
      {state.matches('tickStart') && (
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
    // <form
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     send({ type: 'SUBMIT' });
    //   }}
    // >
    //   <p>state: {state.value}</p>
    //   <label>
    //     type something
    //     <input
    //       style={{ color: state.matches('invalid') ? 'red' : 'black' }}
    //       value={state.context.text}
    //       onChange={({ target: { value } }) => {
    //         send({ type: 'ENTER_INPUT', text: value });
    //       }}
    //     />
    //   </label>
    // </form>
  );
};

export const Timer: Story<{ oneSecond: number }> = ({ oneSecond }) => (
  <>
    <Inspector />
    <TimerMachine oneSecond={oneSecond} />
  </>
);
