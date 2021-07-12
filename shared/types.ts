import { ElectronLog } from 'electron-log';
import { Result } from '@shared/Result';
import { IpcMainEvent, IpcMainInvokeEvent } from '@electron/electron';

export interface ILogger extends ElectronLog {
  errorWithContext(context: string): (err: Error | string) => void;
  info(...msg: string[]): void;
  error(...msg: string[]): void;
}

export type IClientLogger = Pick<ILogger, 'error' | 'info'>;

export interface UserConfig {
  slackToken?: string;
  filters: [];
}

/**
 * IpcBridge is a meta type to glue together the client and server through the bridge.
 * This allows us to create methods which must then exist on subsequent types, but
 * we can pick the relevant details from this object.
 *
 * See the derived types below
 */
interface IpcBridge {
  info: {
    param: Parameters<ILogger['info']>;
    response: ReturnType<ILogger['info']>;
  };

  error: {
    param: Parameters<ILogger['error']>;
    response: ReturnType<ILogger['error']>;
  };

  test: {
    param: string[];
    response: void;
  };

  openGithubForTokenSetup: {
    param: never[];
    response: void;
  };

  loadUserConfig: {
    param: never[];
    response: Promise<Result<UserConfig>>;
  };

  resetUserConfig: {
    param: never[];
    response: Promise<Result<UserConfig>>;
  };

  updateUserConfig: {
    param: [userConfig: DeepPartial<UserConfig>];
    response: Promise<Result<UserConfig>>;
  };
}

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

// interface None<A> {
//   map: <B>(f: (m: A) => B) => None<A>;
//   get: (fallback: A) => A;
// }
//
// interface Some<A> {
//   map: <B>(f: (m: A) => B) => Some<B>;
//   get: (fallback: A) => A;
// }
//
// export function some<A>(val: A): Some<A> {
//   return {
//     get: () => val,
//     map: (fn) => some(fn(val)),
//   };
// }
//
// type Maybe<A> = None<A> | Some<A>;

// export interface AnyObject {
//   [key: string]: any;
// }
