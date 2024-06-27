import { app, BrowserWindow } from 'electron';
import { fileURLToPath, parse } from 'url';
import path from "path";
import isDev from "electron-is-dev";
import { exec } from 'child_process';
import next from 'next';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createWindow() {

    const { BrowserWindow } = await import('electron');

    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });


    win.webContents.on('did-fail-load', (ev, code, desc) => {
        console.log('error: ' + desc);
    });

    win.webContents.on('did-finish-load', () => {
        console.log('loaded');
    });

    win.webContents.openDevTools();

    const startServer = () => {
        exec('npm run start', (err, stdout, stderr) => {
            if (err) {
                console.log('erorr');
                return;
            }
        })
    }

    startServer();

    setTimeout(() => {
        win.loadURL('http://localhost:3000');
    }, 5000);

}

app.on('ready', () => {
    const nextApp = next({
        dev: isDev,
        dir: app.getAppPath() + '/renderer',
    });

    const requestHandler = nextApp.getRequestHandler();

    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        requestHandler(req, res, parsedUrl);
    }).listen(3000, () => {
        console.log('> Ready on http://localhost:3000');
    });

    win.loadUrl('http://localhost:3000');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})