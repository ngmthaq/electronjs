// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

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
  ipcRenderer.send("close");
};

const closeDevtool = () => {
  ipcRenderer.send("closeDevtool");
};

contextBridge.exposeInMainWorld("electron", {
  minimize: minimize,
  maximize: maximize,
  smallscreen: smallscreen,
  close: close,
  closeDevtool: closeDevtool,
});
