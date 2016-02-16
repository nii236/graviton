var app = require('app');
var ipc = require('ipc');
var grpc = require('grpc');
var path = require('path');
var ipc = require ('ipc');
var ipc_comms = require('./utils/ipc_comms')
var TARGET = process.env.TARGET;


var BrowserWindow = require('browser-window');
// var spawn = require('child_process').spawn;
// var goBackend = spawn('./server/main', [], {stdio: 'inherit'});
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
  // goBackend.kill();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1360, height: 800});
  // var htmlPath = path.resolve(__dirname, 'index.html');

  var htmlPath;
  if (TARGET === 'prod') htmlPath = 'file://' + __dirname + '/../build/index.html';
  htmlPath = 'http://localhost:3001';
  console.log(htmlPath);
  mainWindow.loadUrl(htmlPath);
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
