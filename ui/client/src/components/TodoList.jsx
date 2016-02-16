import React from 'react';
import ipc from 'ipc';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.getTodoList = this.getTodoList.bind(this);
  }

  getTodoList() {
    ipc.send('ListTodo');
  }

  render() {
    return (
      <div className='TodoListContainer'>
        <input
          onClick={this.getTodoList}
          type='button'
          value='Get Todos'
        />
      </div>
    );
  }
}
