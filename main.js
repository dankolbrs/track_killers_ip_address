const { app, BrowserWindow } = require('electron')

let mainWindow

function createWindow () {
    win = new BrowserWindow({ width: 1200, height: 1000 })
    win.loadFile('index.html')
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    app.quit()
})