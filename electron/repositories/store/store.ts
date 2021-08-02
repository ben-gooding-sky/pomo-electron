import Store from 'electron-store';
import { err, ok, Result } from '@shared/Result';
import { logger } from '@electron/services';
import { DeepPartial, UserConfig } from '@shared/types';
import { getKeyPathsAndValues } from './getKeyPathsAndValues';

export interface StoreRepository<T> {
  storeRead(): Promise<Result<T>>;
  storeUpdate(value: DeepPartial<T>): Promise<Result<T>>;
  storeReset(): Promise<Result<T>>;
}

export interface StoreConfig<T> {
  /**
   * Name of the config file to be created
   *
   * e.g `Foo` will become Foo.json
   */
  name: string;
  /**
   * Directory for the config file, sensible default for Operating System if none provided
   */
  cwd?: string;
  /**
   * Initial values for config, if no config file exists
   */
  defaults: T;
}

export const storeRepository = <T = UserConfig>(
  storeConfig: StoreConfig<T>
): StoreRepository<T> => {
  const { name, cwd } = storeConfig;

  // eslint-disable-next-line no-console
  console.log(`setting up Store Repo: name ${name}${cwd ? `cwd ${cwd}` : ''}`);

  const store = new Store<T>(storeConfig);
  console.log(store.path);
  return {
    async storeRead() {
      logger.info('reading store', store.store);
      return Promise.resolve(ok(store.store));
    },
    async storeReset() {
      store.clear();
      return Promise.resolve(ok(store.store));
    },
    async storeUpdate(updatedStore) {
      const originalStore = store.store;
      try {
        getKeyPathsAndValues(updatedStore).forEach(([path, value]) => {
          store.set(path, value);
        });
        return Promise.resolve(ok(store.store));
      } catch (e: unknown) {
        logger.warn(
          `failed to update store "${name}", err:\n${
            /* istanbul ignore next */
            e instanceof Error ? e.message : 'unknownError'
          }`
        );
        store.set(originalStore);
        return Promise.resolve(err('failed to update'));
      }
    },
  };
};
