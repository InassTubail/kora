import React, { Component } from 'react';

const io = require('socket.io-client');

const socket = io.connect('http://localhost:8080');
export default class LogIn extends Component {
  state = {
    name: '',
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({ name: value });
  };

  onClick = e => {
    e.preventDefault();
    socket.emit('username', this.state.name);
    this.props.history.push('/player-Character');
  };

  render() {
    return (
      <form id="nameForm">
        <input
          id="name"
          // autoComplete="off"
          // autoFocus="on"
          // onInput="isTyping()"
          onChange={this.onChange}
          placeholder="type your namee here..."
        />
        <button onClick={this.onClick}>Send</button>
      </form>
    );
  }
}
