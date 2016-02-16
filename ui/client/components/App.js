import React from 'react';
import TodoList from 'client/components/TodoList';
import ipc from 'ipc';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitResponse = this.handleSubmitResponse.bind(this);
    this.state = {
      FinishedEdit: false,
      Editing: false,
      Value: '',
      EditText: '',
      SubmitDisabled: true
    };
  }

  handleChange(event) {
    const stringLength = event.target.value.length;
    const requiredLength = 1;
    if (stringLength > requiredLength) {
      this.setState({
        EditText: event.target.value,
        SubmitDisabled: false
      });
    } else {
      this.setState({
        EditText: event.target.value,
        SubmitDisabled: true
      });
    }
  }

  handleKeyDown(event) {
    const submitDisabled = this.state.SubmitDisabled;
    const ENTER_KEY = 13;
    if (event.keyCode === ENTER_KEY && !submitDisabled) {
      this.handleSubmitResponse();
    }
  }

  handleClick() {
    const submitDisabled = this.state.SubmitDisabled;
    if (!submitDisabled) {
      this.handleSubmitResponse();
    }
  }

  handleSubmitResponse() {
    console.log('Submitting todo');
    ipc.send('AddTodo', this.state.EditText);
    this.setState({EditText: ''});
  }

  handlePing() {
    console.log('ping');
    ipc.send('Ping')
  }

  render() {
    return (
      <div className='App'>
        <h1>Welcome to Graviton!</h1>
          <input
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder='Your Todo'
            type='text'
            value={this.state.EditText} />
          <input
            disabled={this.state.SubmitDisabled}
            onClick={this.handleClick}
            type='button'
            value='Send'
          />
          <input
            onClick={this.handlePing}
            type='button'
            value='Ping'
          />
          <TodoList/>
      </div>
    );
  }
}
