import { err, ok } from '@shared/Result';
import * as fs from 'fs';

import { StoreConfig, storeRepository } from './store';

jest.unmock('electron');

describe('StoreRepository', () => {
  const storeFilePath = `${process.cwd()}/temp`;

  interface Schema {
    foo: {
      bar: { baz: number };
      ping?: string;
    };
    a: number;
    b?: string;
  }

  const schema: Schema = {
    foo: { bar: { baz: 3 } },
    a: 1,
    b: 'hi',
  };

  const defaultStoreOptions: StoreConfig<Schema> = {
    defaults: schema,
    name: 'test',
    cwd: storeFilePath,
  };

  afterEach((done) => {
    fs.rmdir(storeFilePath, { recursive: true }, (e) => {
      e && console.error(e); // eslint-disable-line
      done();
    });
  });

  describe('#read', () => {
    it('should return the store contents', () => {
      const store = storeRepository(defaultStoreOptions);
      const res = store.storeRead();

      expect(res).toMatchResult(ok(schema));
    });
  });

  describe('#update', () => {
    describe('when update works', () => {
      it('should update the store with the new value and return the result', () => {
        const store = storeRepository(defaultStoreOptions);
        const updateRes = store.storeUpdate({
          a: 4,
          foo: { ping: 'bye' },
        });

        expect(updateRes).toMatchResult(
          ok({
            foo: {
              bar: { baz: 3 },
              ping: 'bye',
            },
            a: 4,
            b: 'hi',
          })
        );
        expect(updateRes).toMatchResult(store.storeRead());
      });
    });

    describe('when update fails', () => {
      it('should roll back to the initial state and return an error', () => {
        const store = storeRepository(defaultStoreOptions);
        const initialStore = store.storeRead();
        const updateRes = store.storeUpdate({ foo: { ping: 'bye' }, a: undefined });

        expect(updateRes).toMatchResult(err('failed to update'));
        expect(initialStore).toMatchResult(store.storeRead());
      });
    });
  });

  describe('#reset', () => {
    it('should clear the store and reset all values to defaults', () => {
      const store = storeRepository(defaultStoreOptions);
      store.storeUpdate({
        a: 4,
        foo: { ping: 'bye' },
      });
      const res = store.storeReset();

      expect(res).toMatchResult(ok(schema));
    });
  });
});
