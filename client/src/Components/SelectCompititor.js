import React, { Component } from 'react';
import Dialog from 'react-dialog';
import 'react-dialog/css/index.css';

const io = require('socket.io-client');

export default class LogIn extends Component {
  state = {
    clients: [],
    currentUser: '',
    isDialogOpen: false,
  };

  openDialog = () => this.setState({ isDialogOpen: true });

  handleClose = () => this.setState({ isDialogOpen: false });

  componentWillMount() {
    const socket = io.connect('http://localhost:8080');
    console.log(sessionStorage.getItem('current_user'));
    if (sessionStorage.getItem('current_user')) {
      socket.emit('new user', sessionStorage.getItem('current_user'));
    }
  }

  componentDidMount() {
    const socket = io.connect('http://localhost:8080');
    this.getUser(socket);

    socket.on('new message', dataNewMassg => {
      console.log({ dataNewMassg });
      if (dataNewMassg.to == sessionStorage.getItem('current_user')) {
        this.setState({ isDialogOpen: true });
        // alert(`${dataNewMassg.from} send you massg`);
      }
    });
  }

  getUser = socket => {
    socket.on('usernames', username => {
      console.log(username, 'username from DID moun');

      this.setState({
        clients: username,
      });
    });
  };

  sendAcceptance = (socket, selectedUser) => {
    const data = {};
    data.to = selectedUser;
    data.from = sessionStorage.getItem('current_user'); // current user
    data.type = 'invite';
    socket.emit('sendMessage', data);
  };

  onSelectUser = e => {
    const socket = io.connect('http://localhost:8080');
    console.log(e.target.id, 'e.target.id');
    // new message
    this.sendAcceptance(socket, e.target.id);
  };

  render() {
    const { clients } = this.state;
    return (
      <React.Fragment>
        <h2> Members </h2>

        {this.state.isDialogOpen && (
          <Dialog
            title="Dialog Title"
            modal
            onClose={this.handleClose}
            buttons={[
              {
                text: 'Close',
                onClick: () => this.handleClose(),
              },
            ]}
          >
            <h1>Dialog Content</h1>
            <p>More Content. Anything goes here</p>
          </Dialog>
        )}
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
