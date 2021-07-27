import { ElectronLog } from 'electron-log';
import { IpcMainEvent, IpcMainInvokeEvent } from '@electron/electron';
import { Repositories } from '@electron/repositories';

export interface ILogger extends ElectronLog {
  errorWithContext(context: string): (err: Error | string) => void;

  info(...msg: string[]): void;

  error(...msg: string[]): void;
}

export type IClientLogger = Pick<ILogger, 'error' | 'info'>;

export type UserConfig = EmptyConfig | FullUserConfig;

interface FullUserConfig {
  _tag: 'FullUserConfig';
  slackToken: string;
  slackDCookie: string;
  slackDSCookie: string;
}

type EmptyConfig = typeof emptyConfig;
export const emptyConfig = {
  _tag: 'emptyConfig',
} as const;

/**
 * IpcBridge is a meta type to glue together the client and server through the bridge.
 * This allows us to create methods which must then exist on subsequent types, but
 * we can pick the relevant details from this object.
 *
 * See the derived types below
 */
type IpcBridge = {
  [key in keyof Repositories]: {
    param: Parameters<Repositories[key]>;
    response: ReturnType<Repositories[key]>;
  };
};

export type IBridge = {
  [key in keyof IpcBridge]: (...args: IpcBridge[key]['param']) => IpcBridge[key]['response'];
};

export type IpcHandlers = {
  [key in keyof IpcBridge]: (
    event: IpcBridge[key]['response'] extends Promise<unknown> ? IpcMainInvokeEvent : IpcMainEvent,
    args: IpcBridge[key]['param']
  ) => IpcBridge[key]['response'];
};

export type IpcSetup = {
  [key in keyof IpcBridge]: Handle | Send;
};

interface Send {
  renderer: 'send';
  main: 'on';
}

interface Handle {
  renderer: 'invoke';
  main: 'handle';
}

export type Partial2Deep<T> = {
  [P in keyof T]?: Partial<T[P]>;
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface AnyObject {
  [key: string]: any;
}
