// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");
const { initDatabase } = require("../database");

initDatabase();

const minimize = () => {
  ipcRenderer.send("minimize");
};

const maximize = () => {
  ipcRenderer.send("maximize");
};

const smallscreen = () => {
  ipcRenderer.send("smallscreen");
};

const close = () => {
  window.close();
};

contextBridge.exposeInMainWorld("electron", {
  minimize: minimize,
  maximize: maximize,
  smallscreen: smallscreen,
  close: close,
});
