import { assign } from 'xstate';
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
    runEndHooks: () => {},
    runStartHooks: () => {},
    runTickHook: () => {},
  },
  guards: {
    isTimeForLongBreak: ({ completed: { pomos }, breakNumber }) => breakNumber === pomos,
    autoStartBreak: ({ autoStart: { beforeShortBreak } }) => beforeShortBreak,
    autoStartPomo: ({ autoStart: { beforePomo } }) => beforePomo,
  },
};

type ActionOverrides = Pick<AppOptions['actions'], 'runEndHooks' | 'runStartHooks' | 'runTickHook'>;

export const appOptions = (overrides: { actions?: ActionOverrides } = {}): AppOptions =>
  merge({}, appOptionsDefaults, overrides);
