import { EventObject } from 'xstate';
// eslint-disable-next-line import/no-extraneous-dependencies
import { InterpreterWithMatches, RegisteredMachine } from '@xstate/compiled';
// eslint-disable-next-line import/no-extraneous-dependencies
export { useMachine, useService } from '@xstate/compiled/react';

/**
 *
 * @see https://github.com/davidkpiano/xstate/discussions/1591
 */
export function assertEventType<TE extends EventObject, TType extends TE['type']>(
  event: TE,
  eventType: TType
): asserts event is TE & { type: TType } {
  if (event.type !== eventType) {
    throw new Error(`Invalid event: expected "${eventType}", got "${event.type}"`);
  }
}

export type MachineOptions<TContext, TEvent extends EventObject, Id extends string> = Extract<
  RegisteredMachine<TContext, TEvent>,
  { id: Id }
>['_options'];

export type MachineSend<
  TContext,
  TEvent extends EventObject,
  Id extends 'app' | 'timer'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = InterpreterWithMatches<TContext, any, TEvent, Id>['send'];

export type Matches<TContext, TEvent extends EventObject, Id extends string> = Extract<
  RegisteredMachine<TContext, TEvent>,
  { id: Id }
>['_matches'];
