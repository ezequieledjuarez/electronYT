const {app,BrowserWindow,main,Menu} = require('electron')

let mainWindow

let appMenu = [
    {
        label: 'Application',
        submenu: [
            {
            label:'About',
            click:()=>
                {
                    openWindowAbout()
                }
            }    
        ]
       
    }
]

function createMainWindow(){
    mainWindow = new BrowserWindow({
        width: 600,
        height:700,
        webPreferences:{
            nodeIntegration:true
        }
    })

    mainWindow.loadFile('index.html')

    let menu = Menu.buildFromTemplate(appMenu)
    
    mainWindow.setMenu(menu)
}

function openWindowAbout(){

}

app.whenReady().then(createMainWindow)