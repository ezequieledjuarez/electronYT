const {app, BrowserWindow} = require('electron')

function createMainWindow() {

    let mainWindow = new BrowserWindow({

        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration: true
        }
    })
    mainWindow.loadFile('index.html')
}

app.whenReady().then(createMainWindow)

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit
    }
})

app.on('activate',function(){
    if(BrowserWindow.getAllWindows().length === 0){
        createMainWindow()
    }
})