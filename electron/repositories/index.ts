import { merge } from '@shared/merge';
import { UserConfig } from '@shared/types';
import { slackRepository, SlackRepository } from '@electron/repositories/slack';
import { fakeShell, shellRepository, ShellRepository } from './shell';
import { fakeStoreRepoFactory, storeRepository, StoreRepository } from './store';

export type Repositories = ShellRepository & SlackRepository & StoreRepository<UserConfig>;

export const productionRepositories = (): Repositories => ({
  ...slackRepository(),
  ...shellRepository,
  ...storeRepository({
    name: 'client',
    defaults: {
      filters: [],
    },
  }),
});

export type RepositoryOverrides = Partial<Repositories>;

export const fakeRepositories = (overrides?: RepositoryOverrides): Repositories =>
  merge(
    {
      ...slackRepository(),
      ...fakeShell(overrides),
      ...fakeStoreRepoFactory({
        name: 'client',
        defaults: {
          filters: [],
        },
      }),
    },
    overrides
  );
