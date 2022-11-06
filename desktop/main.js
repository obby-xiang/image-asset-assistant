const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    icon: nativeImage.createFromPath(
      path.resolve(__dirname, './public/favicon.png')
    ),
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
    },
  });

  mainWindow.setMenu(null);

  // mainWindow.loadFile(path.join(__dirname, '../web/index.html'));
  mainWindow.loadURL('http://localhost:8080/');

  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
