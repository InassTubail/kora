import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store/actions';

const io = require('socket.io-client');

class Select extends Component {
  sendInvite = (socket, selectedUser) => {
    const data = {};
    data.to = selectedUser;
    data.from = this.props.user_info.username; // current user
    data.type = 'invite';
    socket.emit('sendInviteToPlay', data);
    this.props.updateUser({
      username: data.from,
      is_playing: 'pending',
      with: data.to,
      room: null,
    });
  };

  onSelectUser = e => {
    const socket = io.connect('http://localhost:8080');
    this.sendInvite(socket, e.target.id);
  };

  render() {
    return (
      <React.Fragment>
        <h2> Members </h2>
        <ul id="ulist">
          {this.props.users.map(element => (
            <li>
              <button
                id={element.username}
                key={element}
                onClick={this.onSelectUser}
              >
                {element.username}
              </button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = { updateUser };

const mapStateToProps = state => ({
  user_info: state.user.info,
  users: state.user.users,
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Select);
