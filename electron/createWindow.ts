// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import { isDev } from '@shared/constants';
import { ILogger } from './services';

export function createWindow(logger: ILogger): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();

    mainWindow
      .loadURL('http://localhost:4000')
      .catch(logger.errorWithContext('loading window from dev server'));
  } else {
    mainWindow
      .loadURL(
        url.format({
          pathname: path.join(__dirname, 'renderer/index.html'),
          protocol: 'file:',
          slashes: true,
        })
      )
      .catch(logger.errorWithContext('loading window from file'));
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle('Pomodoro 🍅');
  });

  return mainWindow;
}
