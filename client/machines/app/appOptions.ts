import { Partial2Deep } from '@shared/types';
import merge from 'lodash.merge';
import { stop } from 'xstate/lib/actions';
import { AppOptions } from './appMachine';

const appOptionsDefaults: AppOptions = {
  actions: {
    deleteTimer: stop(({ timerRef }) => timerRef?.id ?? ''),
    startTimer: ({ timerRef }) => {
      timerRef?.send({ type: 'PLAY' });
    },
    hookOnTick: () => {},
    hookBreakComplete: () => {},
    hookTimerComplete: () => {},
  },
};

export const appOptions = (overrides?: Partial2Deep<AppOptions>): AppOptions =>
  merge({}, appOptionsDefaults, overrides);
