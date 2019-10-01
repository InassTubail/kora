import React, { Component } from 'react';

const io = require('socket.io-client');

export default class LogIn extends Component {
  state = {
    clients: [],
    currentUser: '',
  };

  componentDidMount() {
    const socket = io.connect('http://localhost:8080');
    this.getUser(socket);

    // socket.on(`initiate private message`, data => {
    //   console.log({ data });
    // });
  }

  getUser = socket => {
    socket.on('username', username => {
      this.setState({
        clients: username,
      });
      socket.on(`currentUser`, usernamr => {
        this.setState({
          currentUser: usernamr,
        });
      });
    });
  };

  onSelectUser = e => {
    const socket = io.connect('http://localhost:8080');
    console.log(this.state.currentUser, e.target.id);

    // socket.emit('initiate private message', {
    //   selectedUserId: e.target.id,
    // });
  };

  render() {
    // const socket = io.connect('http://localhost:8080');

    const { clients } = this.state;
    return (
      <React.Fragment>
        <h2> Members </h2>{' '}
        <ul id="ulist">
          {' '}
          {clients.map(element => (
            <li key={element.id}>
              <button id={element.id} onClick={this.onSelectUser}>
                {' '}
                {element.name}{' '}
              </button>{' '}
            </li>
          ))}{' '}
        </ul>{' '}
      </React.Fragment>
    );
  }
}

