import { isDev } from '@shared/constants';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { ILogger } from '../logger';

export function setUpDevtools(logger: ILogger): void {
  if (isDev) {
    logger.info('Installing extensions');
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => {
        logger.info(`Added Extension: "${name}"`);
      })
      .catch(logger.errorWithContext('installing extension'));
  }
}
