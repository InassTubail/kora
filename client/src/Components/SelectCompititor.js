import React, { Component } from 'react';

const io = require('socket.io-client');

export default class LogIn extends Component {
  state = {
    clients: [],
  };

  componentDidMount() {
    const socket = io.connect('http://localhost:8080');
    socket.on('username', username => {
      this.setState({ clients: username });
    });
  }

  render() {
    const { clients } = this.state;
    console.log({ clients });

    return (
      <React.Fragment>
        <h2>Members</h2>
        <ul id="ulist">
          {clients.map(element => (
            <li key={element.id}>
              {' '}
              <button> {element.name} </button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

// هان بدنا نبين اسماء المتصلين الاون والاوف
// socket.on('username', function (username) {
//   console.log(username, 'array');
//   $('#ulist').html("");
//   const list = $('#ulist')
//   username.forEach(element => {
//     list.append($('<li>').html(element))
//   });
// });
