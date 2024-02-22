import { app, BrowserWindow } from 'electron';
import './registerListeners';

function createWindow() {
    console.log(__dirname);
    const mainWindow = new BrowserWindow({
        enableRemoteModule: true,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('./main.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
