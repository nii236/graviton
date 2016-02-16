import ipc from 'ipc';

ipc.on('pingResponse', (arg) => {
  console.log(arg);
});

ipc.on('AddTodoResponse', (arg) => {
  console.log(arg);
});

ipc.on('GetTodoListResponse', (arg) => {
  console.log(arg);
});

ipc.on('ListTodo', (arg) => {
  console.log(arg);
});
