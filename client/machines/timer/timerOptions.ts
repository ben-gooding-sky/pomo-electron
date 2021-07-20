import { Partial2Deep } from '@shared/types';
import merge from 'lodash.merge';
import { TimerOptions } from './timerMachine';

const timerOptionsDefaults: TimerOptions = {
  delays: {
    ONE_SECOND: 1000,
  },
};

export const timerOptions = (overrides?: Partial2Deep<TimerOptions>): TimerOptions =>
  merge({}, timerOptionsDefaults, overrides);
