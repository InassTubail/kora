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
    socket.on('new message', dataNewMassg => {
      console.log({ dataNewMassg });
     if(dataNewMassg.to == localStorage.getItem('current_user')){
      alert(`${dataNewMassg.from} send you massg`);
     }
    });
  }

  getUser = socket => {
    socket.on('usernames', username => {
      this.setState({
        clients: username,
      });
    });
  };

  sendAcceptance = (socket, selectedUser) => {
    let data = {}
    data.to = selectedUser;
    data.from = localStorage.getItem('current_user'); // current user
    data.type = 'invite';
    socket.emit('sendMessage', data);
  };
  onSelectUser = e => {
    const socket = io.connect('http://localhost:8080');
    console.log(e.target.id,'e.target.id');
    // new message
    this.sendAcceptance(socket, e.target.id)
  };

  render() {
    const { clients } = this.state;
    return (
      <React.Fragment>
        <h2> Members </h2>
        <ul id="ulist">
          {clients.map(element => (
            <li>
              <button id={element} onClick={this.onSelectUser}>
                {element}
              </button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

