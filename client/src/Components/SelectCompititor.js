import React, { Component } from 'react';
import Dialog from 'react-dialog';
import 'react-dialog/css/index.css';

const io = require('socket.io-client');

export default class LogIn extends Component {
  state = {
    clients: [],
    currentUser: {},
    isDialogOpen: false,
  };

  openDialog = () => this.setState({ isDialogOpen: true });

  handleClose = () => this.setState({ isDialogOpen: false });

  handleAccept = () => {};

  // componentWillMount() {
  //   const socket = io.connect('http://localhost:8080');
  //   console.log(sessionStorage.getItem('current_user'));
  //   if (sessionStorage.getItem('current_user')) {
  //     const name = JSON.parse(sessionStorage.getItem('current_user'));
  //     this.setState({ currentUser: name.username });
  //     socket.emit('new user', name.username);
  //   }
  // }

  componentDidMount() {
    const socket = io.connect('http://localhost:8080');
    this.getUser(socket);
    const name = JSON.parse(sessionStorage.getItem('current_user'));
    this.setState({ currentUser: name });
    console.log(this.state.currentUser, 'this.state.currentUser');

    socket.on('new message', dataNewMassg => {
      // console.log({ dataNewMassg });
      if (dataNewMassg.to == this.state.currentUser.username) {
        this.setState({ isDialogOpen: true });
        // alert(`${dataNewMassg.from} send you massg`);
      }
    });
    window.addEventListener('beforeunload', event => {
      console.log(event);
      event.returnValue = `Are you sure you want to leave?`;
      if (event.currentTarget.confirm) this.props.history.push('/login');

      // if (!event.cancelBubble) {
      // }
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
    const data = {};
    data.to = selectedUser;
    data.from = this.state.currentUser.username; // current user
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
            title="Lets play"
            modal
            onClose={this.handleClose}
            buttons={[
              {
                text: 'Accept',
                onClick: () => this.handleAccept(),
              },
              {
                text: 'Refuse',
                onClick: () => this.handleClose(),
              },
            ]}
          >
            <h1>do you want</h1>
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
