import React from 'react';
import ipc from 'ipc';

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.handlePing = this.handlePing.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handlePing() {
    ipc.send('ping', 'fromFront');
  }

  handleAddTodo() {
    ipc.send('AddTodo', 'fromFront');
  }

  render() {
    return (
      <div className="App">
        <div>Welcome to Graviton!</div>
        <button onClick={this.handlePing}>Ping</button>
        <button onClick={this.handleAddTodo}>AddTodo</button>
      </div>
    )
  }
}
