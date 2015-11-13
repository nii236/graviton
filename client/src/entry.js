// import ipc from 'ipc';
import 'client/src/static/css/main.less';
import React from 'react';
import App from 'client/src/components/App';
import ipc from 'ipc';

ipc.on('pingResponse', (arg) => {
  console.log(arg); // prints "pong"
});

ipc.on('AddTodoResponse', (arg) => {
  console.log(arg);
});

React.render(<App/>, document.getElementById('content'));
