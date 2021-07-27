import React, { FC } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Inspector } from '@client/components';
import { useMachine } from '@client/machines';
// import { formOptions } from '@client/machines/form/formOptions';
import { timerOptions } from './timerOptions';

import { defaultTimerContext, timerMachine } from './timerMachine';

export default {
  title: 'Machines/Timer',
} as Meta;

const TimerMachine: FC = () => {
  const [state, send] = useMachine(timerMachine, {
    devTools: true,
    context: defaultTimerContext,
    ...timerOptions({
      actions: {
        completed: () => {
          alert('complete!');
        },
      },
    }),
  });

  return (
    <div style={{ color: '#D8DEE9' }}>
      {state.value}
      {state.matches('initial') && (
        <Button type="button" onClick={() => send({ type: 'PLAY' })}>
          start
        </Button>
      )}
      {!state.matches('initial') && (
        <Button type="button" onClick={() => send({ type: 'STOP' })}>
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

export const Timer: Story = () => (
  <>
    <Inspector />
    <TimerMachine />
  </>
);
