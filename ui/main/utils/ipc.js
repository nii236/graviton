var ipc = require('ipc');
var grpc = require('grpc');
var todoProto = grpc.load(PROTO_PATH).todo;

ipc.on('ListTodo', function(event, arg) {
  console.log('Submit ListTodo to backend...');
  client.listTodo({request: 'Hello gimme list yo'}, function(err, response) {
    if (err) {
      console.log(err);
      return;
    }
    event.sender.send('GetTodoListResponse', response);
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


var client = new todoProto.Todo('localhost:3000', grpc.Credentials.createInsecure());
