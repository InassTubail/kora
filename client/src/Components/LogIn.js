import React, { Component } from 'react';

const io = require('socket.io-client');

const socket = io.connect('http://localhost:8080');
export default class LogIn extends Component {
  state = {
    name: '',
    clients: [],
    error: '',
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({ name: value });
  };

  componentDidMount() {
    const socket = io.connect('http://localhost:8080');
    this.getUser(socket);
  }

  getUser = socket => {
    socket.on('usernames', username => {
      this.setState({
        clients: username,
      });
    });
  };

  onClick = e => {
    e.preventDefault();
    if (this.state.clients.includes(this.state.name)) {
      this.setState({ error: 'error ' });
    } else {
      socket.emit('new user', this.state.name);
      sessionStorage.setItem(
        'current_user',
        JSON.stringify({
          username: this.state.name,
          data: {
            is_playing: false,
            with: null,
            room: null,
          },
        })
      );
      this.props.history.push('/player-Character');
    }
  };

  render() {
    return (
      <form id="nameForm">
        {this.state.error ? <p>{this.state.error}</p> : null}
        <input
          id="name"
          onChange={this.onChange}
          placeholder="type your namee here..."
        />
        <button onClick={this.onClick}>Send</button>
      </form>
    );
  }
}
