import React from 'react';
import ipc from 'ipc';

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    ipc.send('ping', 'fromFront');
  }

  render() {
    return (
      <div className="App">
        <div>Welcome to Graviton!</div>
        <button onClick={this.handleClick}>Clicky</button>
      </div>
    )
  }
}
