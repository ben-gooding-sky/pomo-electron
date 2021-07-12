// eslint-disable-next-line import/no-extraneous-dependencies
import { menubar } from 'menubar';
import { isDev } from '@shared/constants';
import url from 'url';
import path from 'path';
import { checkForUpdates, logger, setUpDevtools } from '@electron/services';
import { ipcMain } from '@electron/electron';
import axios from 'axios';

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
  // ...(isDev && { windowPosition: 'topLeft' }),
});

mb.on('ready', () => {
  logger.info('app ready');
  setUpDevtools(logger);

  ipcMain.on('slack', () => {
    console.log('res');
    axios
      .post(
        'https://sky.slack.com/api/users.profile.set',
        {
          profile: {
            status_text: 'riding a train',
            status_emoji: ':mountain_railway:',
            status_expiration: new Date().getTime(),
          },
        },
        {
          headers: {
            authorization: `Bearer ${process.env.SLACK_SKY_EMACS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        logger.info('res', res.status.toString(), res.statusText, res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  // setInterval(() => {
  //   const [width, height] = mb.window?.getContentSize() ?? [0, 0];
  //   mb.window?.setContentSize(width, height > 500 ? 300 : 700, true);
  // }, 3000);
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
