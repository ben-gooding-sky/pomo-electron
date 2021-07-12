import { assign } from 'xstate';
import { Partial2Deep } from '@shared/types';
import merge from 'lodash.merge';
import { AppOptions } from './appMachine';

const appOptionsDefaults: AppOptions = {
  actions: {
    incrementLongBreak: assign({
      completed: ({ completed }) => ({ ...completed, longBreaks: completed.longBreaks + 1 }),
    }),
    incrementPomo: assign({
      completed: ({ completed }) => ({ ...completed, pomos: completed.pomos + 1 }),
    }),
    startTimer: () => {},
  },
  guards: {
    isTimeForLongBreak: ({ completed: { pomos }, breakNumber }) => breakNumber === pomos,
    autoStartBreak: ({ autoStart: { beforeShortBreak } }) => beforeShortBreak,
    autoStartPomo: ({ autoStart: { beforePomo } }) => beforePomo,
  },
};

export const appOptions = (overrides?: Partial2Deep<AppOptions>): AppOptions =>
  merge({}, appOptionsDefaults, overrides);
