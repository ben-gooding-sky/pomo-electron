/* eslint-disable react/destructuring-assignment */
import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { emptyConfig, UserConfig } from '@shared/types';
import { logger } from '@electron/services/logger';
import { StoreRepository } from '@electron/repositories/store';

interface Config {
  config: UserConfig;
  storeUpdate: StoreRepository<UserConfig>['storeUpdate'];
  storeReset: StoreRepository<UserConfig>['storeReset'];
}
const configContext = createContext<Config>({
  config: emptyConfig,
  storeUpdate() {
    throw new Error('provider not initialised');
  },
  storeReset() {
    throw new Error('provider not initialised');
  },
});

const { Provider } = configContext;

export const useConfig = () => useContext(configContext);

export const ConfigProvider: FC<Partial<Config>> = (props) => {
  const [config, setConfig] = useState(props.config ?? emptyConfig);

  useEffect(() => {
    window.bridge.storeRead().then((data) => {
      data.match({
        Ok: setConfig,
        Err: logger.error,
      });
    });
  }, []);

  return (
    <Provider
      value={{
        config,
        async storeUpdate(data) {
          const res = await window.bridge.storeUpdate(data);

          res.match({
            Ok: (d) => {
              setConfig(d);
            },
            Err: (e) => {
              logger.error(e);
            },
          });

          return res;
        },
        async storeReset() {
          const res = await window.bridge.storeReset();

          res.match({
            Ok: (d) => {
              setConfig(d);
            },
            Err: (e) => {
              logger.error(e);
            },
          });

          return res;
        },
        ...props,
      }}
    >
      {props.children}
    </Provider>
  );
};
