const { app, BrowserWindow, nativeImage, ipcMain } = require('electron');
const path = require('path');
const _ = require('lodash');
const logger = require('./utils/logger');
const { fetchIconData } = require('./network/harmonyos-icon');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    icon: nativeImage.createFromPath(
      path.resolve(__dirname, '../public/favicon.png')
    ),
    webPreferences: {
      preload: path.resolve(__dirname, './preload.js'),
    },
  });

  mainWindow.setMenu(null);

  // mainWindow.loadFile(path.resolve(__dirname, '../web/index.html'));
  mainWindow.loadURL('http://localhost:8080/');

  mainWindow.webContents.openDevTools();
};

if (app.requestSingleInstanceLock()) {
  logger.info('App starting...');

  app.whenReady().then(() => {
    ipcMain.handle('network:fetchIconData', fetchIconData);

    createWindow();

    app.on(
      'activate',
      () => _.isEmpty(BrowserWindow.getAllWindows()) && createWindow()
    );
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
} else {
  logger.warn('App already started.');
  app.quit();
}
