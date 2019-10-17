import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogIn from './Components/LogIn';
// import Dailog from './Components/Dialog';
import playerCharacter from './Components/PlayerCharacter';
import GameType from './Components/GameType';
import SelectCompititor from './Components/SelectCompititor';
import GameIndividual from './Components/GameIndividual';
// import PopWaiting from './Components/PopWaiting';
import PopAccept from './Components/PopAccept';
// import popUpCongrat from './Components/popUpCongrat';
// import popUpLose from './Components/popUpLose';
import CongratIndivid from './Components/CongratIndivid';
import GamePersinWithPerson from './Components/GamePersonWithPerson'
import CongratsPWP from './Components/CongratsPWP'
// import { Redirect } from 'react-router-dom';


import { getUsers, openDialog, closeDialog, updateUser, updateGame } from './store/actions';
// import history from './history';

const io = require('socket.io-client');

class App extends Component {
  componentDidMount() {
    const socket = io.connect('http://localhost:8080');
    this.getUser(socket);
    this.newInvitation(socket);
    this.refresh(socket)
    this.gamingRoom(socket)
  }
  refresh = socket => {
    var isExit = false;
    this.props.isLoggedIn && this.props.users.map(value => {
      if (this.props.user_info.username && this.props.user_info.username === value.username) {
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

  gamingRoom = socket => {
    let { redScore, blueScore, numberOfQuestion } = this.props.play;
    let role, color, isMyRole
    socket.on('data.room', data => {
      if (data.room !== this.props.user_info.room) return;
      const { location } = this.props;
      if (location.pathname !== '/GamePersinWithPerson') {
        this.props.history.push('/GamePersinWithPerson')
      }
      let { number1, number2, answers, result } = data.data
      let currentPlayer = JSON.parse(this.props.user_info.room).findIndex(el => el === data.currentPlayer)
      if (result) {
        let currentPlayerColor = (JSON.parse(this.props.user_info.room).findIndex(el => el === role) + 1) % 2 === 0 ? 'red' : 'blue';
        if (currentPlayerColor === 'red' && this.props.play.number1 * this.props.play.number2 === result) {
          redScore++
        } else if (currentPlayerColor === 'blue' && this.props.play.number1 * this.props.play.number2 === result) {
          blueScore++
        }
        this.props.updateGame({
          ...this.props.play,
          resultPrevPlayer: result, //نتيحة سؤال اللاعب الحالي ي سمر
        })
      }

      if (currentPlayer === JSON.parse(this.props.user_info.room).length - 1) {
        role = JSON.parse(this.props.user_info.room)[0]
      } else {
        role = JSON.parse(this.props.user_info.room)[currentPlayer + 1]
      }
      color = (JSON.parse(this.props.user_info.room).findIndex(el => el === role) + 1) % 2 === 0 ? 'red' : 'blue';
      isMyRole = role === this.props.user_info.username;

      // بعد 2 ثانيه بدو يغير السزال
      setTimeout(() => {
        this.props.updateGame({
          role,
          isMyRole,
          color,
          number1,
          number2,
          answers,
          numberOfQuestion: numberOfQuestion++,
          redScore,
          blueScore,
          redTeam: [JSON.parse(this.props.user_info.room)[1], JSON.parse(this.props.user_info.room)[3]],
          blueTeam: [JSON.parse(this.props.user_info.room)[0], JSON.parse(this.props.user_info.room)[2]],
        })
      }, 2000);
    })
  }
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
          // this.props.openDialog({ from: dataNewMassg.from, type: 'reject' });
        }
      }
      if (
        dataNewMassg.to === this.props.user_info.username ||
        dataNewMassg.from === this.props.user_info.username
      ) {
        if (dataNewMassg.type === 'accept') {
          // history.push('/competitor');
          // this.props.history.push(`/competitor`);
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
    this.props.openDialog({ from: '', type: 'accept' });
  };
  handleReject = () => {
    const socket = io.connect('http://localhost:8080');
    const data = {};
    data.to = this.props.user_info.with;
    data.from = this.props.user_info.username; // current user
    data.type = 'reject';
    socket.emit('replyInvite', data);
    this.props.closeDialog();
  };
  render() {
    return (
      <div>
        <PopAccept props={this.props} handleAccept={this.handleAccept} handleReject={this.handleReject} />
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
          <Route exact path="/CongratsPWP" component={CongratsPWP} />
          {/* <Route exact path="/GamePersinWithPerson">
            <GamePersinWithPerson />
          </Route> */}
          <Route exact path="/GamePersinWithPerson" component={GamePersinWithPerson} />
          <Route exact path="/congrat-individ" component={CongratIndivid} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = { getUsers, openDialog, closeDialog, updateUser, updateGame };
const mapStateToProps = state => ({
  user_info: state.user.info,
  play: state.user.play,
  users: state.user.users,
  isLoggedIn: state.user.isLoggedIn,
  open: state.dialog.open,
  type: state.dialog.type,
  come_from: state.dialog.come_from,
});
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
)