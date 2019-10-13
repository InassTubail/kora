import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LogIn from './Components/LogIn';
import Dailog from './Components/Dialog';
import playerCharacter from './Components/PlayerCharacter';
import GameType from './Components/GameType';
import SelectCompititor from './Components/SelectCompititor';
import GameIndividual from './Components/GameIndividual';
import PopWaiting from './Components/PopWaiting';
import PopAccept from './Components/PopAccept';
import popUpCongrat from './Components/popUpCongrat';
import popUpLose from './Components/popUpLose';
import CongratIndivid from './Components/CongratIndivid';
import GamePersinWithPerson from './Components/GamePersonWithPerson'
import CongratsPWP from './Components/CongratsPWP'


import { getUsers, openDialog, closeDialog, updateUser } from './store/actions';
// import history from './history';

const io = require('socket.io-client');

class App extends Component {
  componentDidMount() {
    const socket = io.connect('http://localhost:8080');
    this.getUser(socket);
    this.newInvitation(socket);
    this.refresh(socket)
  }
  refresh = socket => {
    var isExit = false;
    this.props.users.map(value => {
      if (this.props.user_info.username === value.username) {
        isExit = true;
      }
      return value;
    });
    if (isExit && this.props.isLoggedIn) {
      socket.emit('addRefresh', this.props.user_info);
    }
  }
  getUser = socket => {
    socket.on('usernames', username => {
      this.props.getUsers(JSON.parse(username));
      this.props.users.map(value => {
        if (this.props.user_info.username === value.username) {
          this.props.updateUser(value);
        }
        return value;
      });
    });
  };

  newInvitation = socket => {
    socket.on('new message', dataNewMassg => {
      if (dataNewMassg.to === this.props.user_info.username) {
        if (dataNewMassg.type === 'invite') {
          this.props.updateUser({
            username: this.props.user_info.username,
            is_playing: 'pending',
            with: dataNewMassg.from,
            room: null,
          });
          this.props.openDialog({ from: dataNewMassg.from, type: 'invite' });
        }
        if (dataNewMassg.type === 'reject') {
          this.props.openDialog({ from: dataNewMassg.from, type: 'reject' });
        }
      }
      if (
        dataNewMassg.to === this.props.user_info.username ||
        dataNewMassg.from === this.props.user_info.username
      ) {
        if (dataNewMassg.type === 'accept') {
          // history.push('/competitor');
          this.props.history.push(`/competitor`);
          // room, redirect to ثنائي
        }
      }
    });
  };

  handleAccept = () => {
    const socket = io.connect('http://localhost:8080');
    const data = {};
    data.to = this.props.user_info.with;
    data.from = this.props.user_info.username; // current user
    data.type = 'accept';
    socket.emit('replyInvite', data);
    this.props.closeDialog();
  };
  render() {
    return (
      <div>
        <Dailog props={this.props} handleAccept={this.handleAccept} />
        <Router>
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/player-Character" component={playerCharacter} />
            <Route exact path="/select-game-type" component={GameType} />
            <Route
              exact
              path="/select-compititor"
              component={SelectCompititor}
            />
            <Route exact path="/game-individual" component={GameIndividual} />
            {/* <Route exact path="/popupWaiting" component={PopWaiting} />
            <Route exact path="/popupAccept" component={PopAccept} />
            <Route exact path="/popUpCongrat" component={popUpCongrat} />
            <Route exact path="/popUpLose" component={popUpLose} /> */}

            <Route exact path="/CongratsPWP" component={CongratsPWP} />
            <Route exact path="/GamePersinWithPerson" component={GamePersinWithPerson} />
            <Route exact path="/congrat-individ" component={CongratIndivid} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = { getUsers, openDialog, closeDialog, updateUser };
const mapStateToProps = state => ({
  user_info: state.user.info,
  users: state.user.users,
  isLoggedIn: state.user.isLoggedIn,
  open: state.dialog.open,
  come_from: state.dialog.come_from,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
