import { assign } from 'xstate';
import { Partial2Deep } from '@shared/types';
import merge from 'lodash.merge';
import { TimerOptions } from './timerMachine';

const timerOptionsDefaults: TimerOptions = {
  guards: {
    isComplete: ({ timeLeft: { mins, seconds } }) => mins === 0 && seconds === 1,
  },
  actions: {
    resetTimer: assign({
      timeLeft: ({ duration }) => ({ mins: duration, seconds: 0 }),
    }),
    decrement1Second: assign({
      timeLeft: ({ timeLeft: { mins, seconds } }) =>
        seconds === 0 ? { mins: mins - 1, seconds: 59 } : { mins, seconds: seconds - 1 },
    }),
    completed: () => {},
  },
  delays: {
    ONE_SECOND: 1000,
  },
};

export const timerOptions = (overrides?: Partial2Deep<TimerOptions>): TimerOptions =>
  merge({}, timerOptionsDefaults, overrides);
