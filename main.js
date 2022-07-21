const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

autoUpdater.setFeedURL('https://github.com/fabianPower/electronUpdateTestTwo.git')
autoUpdater.checkForUpdates()

var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
myConsole.log('Hello World!');

setInterval(() => {
  autoUpdater.checkForUpdatesAndNotify()
}, 1000)

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadFile('content/index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdates();
    // autoUpdater.checkForUpdatesAndNotify();
    console.log("checking for updates")
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  console.log("update available")
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  console.log("update downloaded")
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  console.log("quit and install")
  autoUpdater.quitAndInstall();
});