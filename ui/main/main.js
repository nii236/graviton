var app = require('app');
var ipc = require('ipc');
var grpc = require('grpc');
var PROTO_PATH = __dirname + '../protos/todoRPC.proto';

var BrowserWindow = require('browser-window');
var spawn = require('child_process').spawn;
var goBackend = spawn('./server/main', [], {stdio: 'inherit'});
require('crash-reporter').start();

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('quit', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
  goBackend.kill();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1360, height: 800});
  var htmlPath = 'file://' + __dirname + '/client/build/index.html';
  mainWindow.loadUrl(htmlPath);
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
