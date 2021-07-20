// eslint-disable-next-line import/no-extraneous-dependencies
import { createMachine, StateWithMatches } from '@xstate/compiled';

import { ActorRef, assign, spawn } from 'xstate';
import {
  defaultTimerContext,
  TimerEvent,
  timerMachine,
  TimerParentEvents,
} from '../timer/timerMachine';
import { MachineOptions, MachineSend } from '../utils';

export interface AppContext {
  completed: {
    pomos: number;
    longBreaks: number;
  };
  breakNumber: number;
  timers: {
    pomo: number;
    short: number;
    long: number;
  };
  autoStart: {
    beforeShort: boolean;
    beforeLong: boolean;
    beforePomo: boolean;
  };
  timerRef?: ActorRef<TimerEvent>;
  lastCompleted?: 'long' | 'short' | 'timer';
}

export const defaultAppSettings: AppContext = {
  completed: { longBreaks: 0, pomos: 0 },
  autoStart: { beforeLong: false, beforePomo: false, beforeShort: true },
  timers: { long: 25, pomo: 25, short: 5 },
  breakNumber: 4,
};

type AppEvent = TimerParentEvents | { type: 'COMPLETE' } | { type: 'START' } | { type: 'STOP' };

export type AppOptions = MachineOptions<AppContext, AppEvent, 'app'>;
export type AppState = StateWithMatches<AppContext, AppEvent, 'app'>;
export type AppSend = MachineSend<AppContext, AppEvent, 'app'>;

export const appMachine = createMachine<AppContext, AppEvent, 'app'>({
  id: 'appMachine',
  context: {
    ...defaultAppSettings,
  },
  initial: 'noTimer',
  on: {
    TICK: { actions: 'hookOnTick' },
    START: { actions: 'startTimer' },
    STOP: 'noTimer',
    COMPLETED: 'noTimer',
  },
  states: {
    noTimer: {
      entry: assign({
        timerRef: undefined,
      }),
      always: {
        target: 'pomo',
      },
    },
    pomo: {
      entry: assign({
        timerRef: ({ timers, autoStart }) =>
          spawn(
            timerMachine
              .withContext({
                ...defaultTimerContext,
                duration: timers.pomo,
                autoStart: autoStart.beforePomo,
              })
              .withConfig({ delays: { ONE_SECOND: 10 } }),
            'timer-pomo'
          ),
      }),
      exit: [
        'deleteTimer',
        'hookTimerComplete',
        assign({
          completed: ({ completed }) => ({ ...completed, pomos: completed.pomos + 1 }),
        }),
      ],
      on: {
        COMPLETED: [
          {
            cond: ({ completed: { pomos }, breakNumber }) => (pomos + 1) % breakNumber === 0,
            target: 'longBreak',
          },
          {
            target: 'shortBreak',
          },
        ],
      },
    },
    shortBreak: {
      entry: assign({
        timerRef: ({ timers, autoStart }) =>
          spawn(
            timerMachine
              .withContext({
                ...defaultTimerContext,
                duration: timers.short,
                autoStart: autoStart.beforeShort,
              })
              .withConfig({ delays: { ONE_SECOND: 10 } }),
            'timer-short-break'
          ),
      }),
      exit: ['deleteTimer', 'hookBreakComplete'],
    },
    longBreak: {
      entry: assign({
        timerRef: ({ timers, autoStart }) =>
          spawn(
            timerMachine
              .withContext({
                ...defaultTimerContext,
                duration: timers.long,
                autoStart: autoStart.beforeLong,
              })
              .withConfig({ delays: { ONE_SECOND: 10 } }),
            'timer-long-break'
          ),
      }),
      exit: [
        'deleteTimer',
        'hookBreakComplete',
        assign({
          completed: ({ completed }) => ({ ...completed, longBreaks: completed.longBreaks + 1 }),
        }),
      ],
    },
  },
});
