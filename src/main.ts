import { ipcMain } from "electron";
import path from "path";
const { app, BrowserWindow } = require("electron");

if (require("electron-squirrel-startup")) {
    app.quit();
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            webSecurity: false, // Sometimes this helps in dev mode to bypass security features
            preload: path.join(__dirname, "preload.js"),
            additionalArguments: [`--vueAppUserData=${process.env.VUE_APP_USER_DATA}`],
        },
    });

    mainWindow.maximize();

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        process.env.VUE_APP_USER_DATA = app.getPath("appData");

        console.log('process.env.VUE_APP_USER_DATA', process.env.VUE_APP_USER_DATA);

        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }
};

app.disableHardwareAcceleration();

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(() => {
    ipcMain.handle("get-user-data-path", () => {
        return app.getPath("userData");
    });
});
