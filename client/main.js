var app = require('app');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');
require('crash-reporter').start();
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1360, height: 800});
  var htmlPath = 'file://' + __dirname + '/build/index.html'
  mainWindow.loadUrl(htmlPath);
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

});

ipc.on('ping', function(event, arg) {
  console.log("Ping received");
  event.sender.send('pingResponse', 'pong');
});
