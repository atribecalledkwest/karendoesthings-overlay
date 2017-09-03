"use strict";
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on("window-all-closed", function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != "darwin") {
        app.quit();
    }
});

app.on("ready", function() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        useContentSize: true,
        resizeable: false,
        fullscreen: false,
        frame: false
    });

    mainWindow.loadURL("http://localhost:9090/bundles/karendoesthings-overlay/graphics/index.html");

    mainWindow.on("minimize", function() {
        mainWindow.restore();
    });
});
