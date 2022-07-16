import {
  contextBridge,
  ipcRenderer,
  IpcRendererEvent,
  BrowserWindow,
} from 'electron';

window.ipcRenderer = ipcRenderer;
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// const { contextBridge, ipcRenderer } = require("electron");

// As an example, here we use the exposeInMainWorld API to expose the IPC renderer
// to the main window. They'll be accessible at "window.ipcRenderer".

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});

// const renderer = window.require('electron').ipcRenderer;

// window.addEventListener('DOMContentLoaded', () => {
//   window.ipcRenderer = ipcRenderer;
// });

contextBridge.exposeInMainWorld('buttonElectron', {
  close: () => ipcRenderer.invoke('closeWindow'),
  minimize: () => ipcRenderer.invoke('minimizeWindow'),
  expand: () => ipcRenderer.invoke('expandWindow'),
  download: (url: string) => ipcRenderer.invoke('downloadFile', url),
  openFolder: (path: string) => ipcRenderer.invoke('openFolder', path),
  stateDownload: (callback: any) => ipcRenderer.once('stateDownload', callback),
});
