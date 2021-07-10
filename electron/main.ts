// eslint-disable-next-line import/no-extraneous-dependencies
import { menubar } from 'menubar';
import { isDev } from '@shared/constants';
import url from 'url';
import path from 'path';
import { checkForUpdates, logger, setUpDevtools } from '@electron/services';

checkForUpdates(logger);

const mb = menubar({
  index: getPage(),
  preloadWindow: true,
  browserWindow: {
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true,
    },
    alwaysOnTop: true,
  },
  showDockIcon: false,
  ...(isDev && { windowPosition: 'topLeft' }),
});

mb.on('ready', () => {
  logger.info('app ready');
  setUpDevtools(logger);
});

function getPage(): string {
  return isDev
    ? 'http://localhost:4000'
    : url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      });
}
