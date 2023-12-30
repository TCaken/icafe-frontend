const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

require('dotenv').config()

let mainWindow

if (process.env.ELECTRON_START_URL) {
  console.log('The ELECTRON_START_URL environment variable exists!')
} else {
  console.log('The ELECTRON_START_URL environment variable does not exist.')
}

// I want to use React in Electron, so I need to load the React app
// from a URL. The URL is different in development and production.

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true,
    })

  mainWindow.loadURL(startUrl)

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
