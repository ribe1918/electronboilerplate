import { app, BrowserWindow } from 'electron'
import * as isDev from 'electron-is-dev'
import * as path from 'path'

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    kiosk: !isDev,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, './public/index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
