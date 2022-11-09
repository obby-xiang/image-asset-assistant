const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('network', {
  fetchIconData: (language) =>
    ipcRenderer.invoke('network:fetchIconData', language),
});
