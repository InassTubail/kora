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
import GameGroupWithGroup from './Components/GameGroupWithGroup'
import GamePersinWithPerson from './Components/GamePersonWithPerson'
import CongratsPWP from './Components/CongratsPWP'
// import { Redirect } from 'react-router-dom';
import Snackbar from './Components/snackpar'
import socket from './utils/api'
import { getUsers, openDialog, closeDialog, updateUser, updateGame } from './store/actions';
// import history from './history';

async function detrmineRedABlue(red_team, blue_team, users) {
  let redTeam = [], blueTeam = []
  let s = users.map((el) => {
    if (blue_team.findIndex(elment => elment === el.username) !== -1) {
      blueTeam = blueTeam.concat({ username: el.username, person: el.person })
    }
    if (red_team.findIndex(elment => elment === el.username) !== -1) {
      redTeam = redTeam.concat({ username: el.username, person: el.person })
    }
  })
  await Promise.all(s)
  return { redTeam, blueTeam }
}
class App extends Component {
  componentDidMount() {
    this.getUser(socket);
    this.newInvitation(socket);
    this.refresh(socket);
    this.gamingRoom(socket);
    this.cancelInvite(socket);
    this.cancelPlayer(socket);
    this.handleWithdrawal(socket);
  }
  handleWithdrawal = socket => {
    socket.on('withdrawal', data => {
      data = JSON.parse(data);
      if (data.to.username === this.props.user_info.username) {
        this.props.openDialog({ from: data.from, type: 'withdrawal' });
        setTimeout(() => {
          this.props.closeDialog();
        }, 5000);
      }
    })
  }
  cancelInvite = socket => {
    socket.on('cancelInvite', data => {
      data = JSON.parse(data);
      if (data.to.username === this.props.user_info.username) {
        this.props.openDialog({ from: data.from, type: 'cancelInvite' });
        setTimeout(() => {
          this.props.closeDialog();
        }, 5000);
      }
    })
  }
  cancelPlayer = socket => {
    socket.on('cancelPlayer', data => {
      data = JSON.parse(data);
      if (data.to.username === this.props.user_info.username) {
        this.props.openDialog({ from: data.from, type: 'cancelPlayer' });
        setTimeout(() => {
          this.props.closeDialog();
        }, 5000);
      }
    })
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

    socket.on('data.room', async data => {
      if (data.room !== this.props.user_info.room) return;
      const { location } = this.props;
      if (location.pathname !== '/GamePersinWithPerson') {
        this.props.closeDialog();
        this.props.history.push('/GamePersinWithPerson')
      }
      let finalData = {}
      let { number1, number2, answers, result } = data.data
      let currentPlayer = JSON.parse(this.props.user_info.room).findIndex(el => el === data.data.currentPlayer)
      let red_team = [JSON.parse(this.props.user_info.room)[1], JSON.parse(this.props.user_info.room)[3]]
      let blue_team = [JSON.parse(this.props.user_info.room)[0], JSON.parse(this.props.user_info.room)[2]]
      const { redTeam, blueTeam } = await detrmineRedABlue(red_team, blue_team, this.props.users);
      if (result) {
        let currentPlayerColor = (JSON.parse(this.props.user_info.room).findIndex(el => el === role) + 1) % 2 === 0 ? 'red' : 'blue';
        let isTrue = this.props.play.number1 * this.props.play.number2 === parseInt(result, 10)
        if (currentPlayerColor === 'red' && isTrue) {
          redScore++
        } else if (currentPlayerColor === 'blue' && isTrue) {
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
      finalData = {
        ...finalData,
        role,
        isMyRole,
        color,
        number1,
        number2,
        answers,
        numberOfQuestion: numberOfQuestion++,
        redScore,
        redTeam, blueTeam,
        blueScore,
        resultPrevPlayer: 0, //نتيحة سؤال اللاعب الحالي ي سمر
        // resultPrevPlayer
      }
      if (finalData.numberOfQuestion === 13) {
        this.props.history.push('/CongratsPWP')
      }
      setTimeout(() => {
        this.props.updateGame(finalData)
      }, 2000);
    })
  }
  newInvitation = socket => {
    socket.on('new message', dataNewMassg => {
      if (dataNewMassg.to === this.props.user_info.username) {
        if (dataNewMassg.type === 'invite') {
          this.props.updateUser({
            ...this.props.user_info,
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
          // this.props.history.push(`/competitor`);
          // room, redirect to ثنائي
        }
      }
    });
  };
  handleAccept = () => {
    const data = {};
    data.to = this.props.user_info.with;
    data.from = this.props.user_info.username; // current user
    data.type = 'accept';
    socket.emit('replyInvite', data);
    this.props.closeDialog();
    this.props.openDialog({ from: '', type: 'accept' });
  };
  handleReject = () => {
    const data = {};
    data.to = this.props.user_info.with;
    data.from = this.props.user_info.username; // current user
    data.type = 'reject';
    socket.emit('replyInvite', data);
    this.props.closeDialog();
  };
  withdrawal = () => {
    const data = {};
    data.to = this.props.user_info.with;
    data.from = this.props.user_info.username;
    data.type = 'withdrawal';
    socket.emit('replyInvite', data);
    this.props.closeDialog();
  }
  render() {
    return (
      <div>
        <Snackbar props={this.props} />
        {this.props.type !== 'cancelInvite' &&
          this.props.type !== 'withdrawal' &&
          this.props.type !== 'cancelPlayer' &&
          this.props.type !== 'reject' &&
          <PopAccept props={this.props} handleAccept={this.handleAccept} handleReject={this.handleReject} withdrawal={this.withdrawal} />}
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
          {/* <Route exact path="/GameGroupWithGroup" component={GameGroupWithGroup} /> */}
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