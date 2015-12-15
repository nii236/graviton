var app = require('app');
var ipc = require('ipc');
var grpc = require('grpc');
var PROTO_PATH = __dirname + '/protos/todoRPC.proto';
var todoProto = grpc.load(PROTO_PATH).todo;
var BrowserWindow = require('browser-window');
var spawn = require('child_process').spawn;
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
  var htmlPath = 'file://' + __dirname + '/client/build/index.html';
  mainWindow.loadUrl(htmlPath);
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

ipc.on('ping', function(event, arg) {
  console.log('Ping received');
  event.sender.send('pingResponse', 'pong');
  console.log(client);
});

ipc.on('AddTodo', function(event, arg) {
  console.log('Submit AddTodo to backend...');
  client.addTodo({todo: arg}, function(err, response) {
    if (err) {
      console.log(err);
      return;
    }
    event.sender.send('AddTodoResponse', response);
  });
});

ipc.on('ListTodo', function(event, arg) {
  console.log('Submit ListTodo to backend...');
  client.listTodo({request: 'Hello gimme list yo'}, function(err, response) {
    if (err) {
      console.log(err);
      return;
    }
    event.sender.send('GetTodoListResponse', response);
  })
})

var client = new todoProto.Todo('localhost:3000', grpc.Credentials.createInsecure());
