// eslint-disable-next-line import/no-extraneous-dependencies
import { createMachine, sendParent, StateWithMatches } from '@xstate/compiled';

import { ActorRef, assign } from 'xstate';
import { MachineOptions, MachineSend } from '../utils';

export interface TimerContext {
  duration: number;
  autoStart: boolean;
  timeLeft: {
    mins: number;
    seconds: number;
  };
}

export const defaultTimerContext: TimerContext = {
  duration: 1,
  autoStart: false,
  timeLeft: { mins: 0, seconds: 0 },
};

export type TimerEvent = { type: 'PAUSE' } | { type: 'PLAY' } | { type: 'STOP' };

export type TimerParentEvents =
  | {
      type: 'COMPLETED';
    }
  | {
      type: 'PAUSED';
    }
  | {
      type: 'STARTED';
    }
  | {
      type: 'TICK';
      timeLeft: { mins: number; seconds: number };
    };

const e = (event: TimerParentEvents): TimerParentEvents => event;

export type TimerOptions = MachineOptions<TimerContext, TimerEvent, 'timer'>;
export type TimerActorRef = ActorRef<TimerEvent, TimerParentEvents>;
export type TimerSend = MachineSend<TimerContext, TimerEvent, 'timer'>;
export type TimerState = StateWithMatches<TimerContext, TimerEvent, 'timer'>;

export const timerMachine = createMachine<TimerContext, TimerEvent, 'timer'>({
  id: 'timerMachine',
  context: {
    autoStart: false,
    duration: 1,
    timeLeft: {
      mins: 25,
      seconds: 0,
    },
  },
  initial: 'initial',
  states: {
    initial: {
      // reset timer
      onEntry: assign({
        timeLeft: ({ duration }) => ({ mins: duration, seconds: 0 }),
      }),
      onExit: sendParent(e({ type: 'STARTED' })),
      on: {
        PLAY: 'tickStart',
      },
      always: {
        cond: ({ autoStart }) => autoStart,
        target: 'tickStart',
      },
    },
    tickStart: {
      always: {
        cond: ({ timeLeft: { mins, seconds } }) => mins === 0 && seconds === 0,
        target: 'complete',
      },
      on: {
        PAUSE: 'paused',
        STOP: 'initial',
      },
      after: {
        ONE_SECOND: 'tickEnd',
      },
    },
    tickEnd: {
      // decrement by 1 second
      onEntry: assign({
        timeLeft: ({ timeLeft: { mins, seconds } }) =>
          seconds === 0 ? { mins: mins - 1, seconds: 59 } : { mins, seconds: seconds - 1 },
      }),
      onExit: sendParent(({ timeLeft }) => e({ type: 'TICK', timeLeft })),
      always: {
        target: 'tickStart',
      },
    },
    paused: {
      onEntry: sendParent(e({ type: 'PAUSED' })),
      on: {
        PLAY: 'tickStart',
        STOP: 'initial',
      },
    },
    complete: {
      onEntry: sendParent(e({ type: 'COMPLETED' })),
      type: 'final',
    },
  },
});
