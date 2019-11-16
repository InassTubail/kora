import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import LogIn from './Components/LogIn';
// import Dailog from './Components/Dialog';
import playerCharacter from './Components/PlayerCharacter';
import GameType from './Components/GameType';
import SelectCompititor from './Components/SelectCompititor';
import GameIndividual from './Components/GameIndividual';
import PopAccept from './Components/PopAccept';
import CongratIndivid from './Components/CongratIndivid';
import GameIndividual2 from './Components/GameIndividual2';

import Welcome from './Components/Welcome';

// import GameGroupWithGroup from './Components/GameGroupWithGroup'
import GamePersinWithPerson from './Components/GamePersonWithPerson';
import GamePersinWithPerson2 from './Components/GamePersonWithPerson2';
import CongratsPWP from './Components/CongratsPWP';
import Congrat from './Components/Congrat';
import Equal from './Components/Equal';
import Snackbar from './Components/snackpar';
import Tables from './Components/Tables';
import Tables2 from './Components/Tables2';
import WindowResize from 'react-window-resize'

import socket from './utils/api';
import {
  getUsers,
  openDialog,
  closeDialog,
  updateUser,
  updateGame
} from './store/actions';
// import history from './history';

async function detrmineRedABlue(red_team, blue_team, users) {
  let redTeamNew = [],
    blueTeamNew = [];
  let s = users.map(el => {
    if (blue_team.findIndex(elment => elment === el.username) !== -1) {
      blueTeamNew = blueTeamNew.concat({ username: el.username, person: el.person });
    }
    if (red_team.findIndex(elment => elment === el.username) !== -1) {
      redTeamNew = redTeamNew.concat({ username: el.username, person: el.person });
    }
  });
  await Promise.all(s);
  return { redTeamNew, blueTeamNew };
}
class App extends Component {
  componentDidUpdate() {
    const { open, removeAfterTime } = this.props;
    if (open && removeAfterTime) {
      setTimeout(() => {
        this.props.closeDialog();
      }, 2000);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setWindowWidth);
  }
  componentDidMount() {
    this.getUser(socket);
    this.newInvitation(socket);
    this.refresh(socket);
    this.gamingRoom(socket);
    this.cancelInvite(socket);
    this.cancelPlayer(socket);
    this.handleWithdrawal(socket);
    this.handleTestRoom(socket);
    this.turnRoleRoom(socket);
    this.gamingRoomEqual(socket)
    // this.setWindowWidth if open it as window make it as mobile 
    // console.log(window.innerHeight,window.innerWidth,'innerWidth'); //736 414  
    // window.addEventListener('resize', {height: '736',width: '414'});
  }
  handleTestRoom = socket => {
    socket.on(`leave-partener`, message => {
      console.log({ message }, '------');
      if (this.props.user_info.accpet.length > 0 && this.props.user_info.accpet.includes(message.person)) {
        this.props.updateUser({
          ...this.props.user_info, accpet: this.props.user_info.accpet.filter(el => el !== message.person)
        })
      }
      if (this.props.user_info.invite.length > 0 && this.props.user_info.invite.includes(message.person)) {
        this.props.updateUser({
          ...this.props.user_info, invite: this.props.user_info.invite.filter(el => el !== message.person)
        })
      }
      this.props.closeDialog();
    });
  };
  turnRoleRoom = socket => {
    socket.on('turn role', message => {
      socket.emit('turn.end', message)
    });
  };
  handleWithdrawal = socket => {
    socket.on('withdrawal', data => {
      data = JSON.parse(data);
      if (data.to.username === this.props.user_info.username) {
        this.props.openDialog({
          from: data.from,
          type: 'withdrawal',
          removeAfterTime: true
        });
      }
    });
  };
  cancelInvite = socket => {
    socket.on('cancelInvite', data => {
      data = JSON.parse(data);
      if (data.to === this.props.user_info.username) {
        this.props.openDialog({
          from: data.from,
          type: 'cancelInvite',
          removeAfterTime: true
        });
      }
    });
  };
  cancelPlayer = socket => {
    socket.on('cancelPlayer', data => {
      data = JSON.parse(data);
      if (data.to === this.props.user_info.username) {
        this.props.openDialog({
          from: data.from,
          type: 'cancelPlayer',
          removeAfterTime: true
        });
      }
    });
  };
  refresh = socket => {
    var isExit = false;
    this.props.isLoggedIn &&
      this.props.users.map(value => {
        if (
          this.props.user_info.username &&
          this.props.user_info.username === value.username
        ) {
          isExit = true;
        }
        return value;
      });
    if (isExit && this.props.isLoggedIn) {
      socket.emit('addRefresh', this.props.user_info);
    }
  };
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
  gamingRoomEqual = socket => {
    let { redScore, blueScore, numberOfQuestion, redTeam, blueTeam } = this.props.play;
    let role, color, isMyRole;
    let newTeam;
    socket.on('data.room.equal', async (data, timer) => {
      if (data.room !== this.props.user_info.room) return;
      const { location } = this.props;
      if (location.pathname !== '/play-equal') {
        this.props.closeDialog();
        this.props.history.push('/play-equal');
      }
      let finalData = {}
      let { number1, number2, answers, result, number3, questions, classKora } = data.data
      // let currentPlayer = JSON.parse(this.props.user_info.room).findIndex(el => el === data.data.currentPlayer)
      let currentPlayer = JSON.parse(this.props.user_info.room).findIndex(el => el === data.data.currentPlayer)
      if (currentPlayer === JSON.parse(this.props.user_info.room).length - 1) {
        role = JSON.parse(this.props.user_info.room)[0];
      } else {
        role = JSON.parse(this.props.user_info.room)[currentPlayer + 1];
      }
      color =
        (JSON.parse(this.props.user_info.room).findIndex(el => el === role) +
          1) %
          2 ===
          0
          ? 'red'
          : 'blue';

      let currentPlayerColor =
        (JSON.parse(this.props.user_info.room).findIndex(el => el === currentPlayer) +
          1) %
          2 ===
          0
          ? 'red'
          : 'blue';
      if (redTeam.length === 0 && blueTeam.length === 0) {
        let red_team = [JSON.parse(this.props.user_info.room)[1], JSON.parse(this.props.user_info.room)[3]]
        let blue_team = [JSON.parse(this.props.user_info.room)[0], JSON.parse(this.props.user_info.room)[2]]
        newTeam = await detrmineRedABlue(red_team, blue_team, this.props.users);
      }
      let isTrue =
        this.props.play.number1 * this.props.play.number2 * this.props.play.number3 ===
        parseInt(result, 10);
      if (result) {
        if (currentPlayerColor === 'red' && isTrue) {
          this.props.updateGame({
            ...this.props.play,
            redScore: redScore++
          });
        } else if (currentPlayerColor === 'blue' && isTrue) {
          this.props.updateGame({
            ...this.props.play,
            blueScore: blueScore++
          });
        }
        this.props.updateGame({
          ...this.props.play,
          resultPrevPlayer: result
        });
      }
      isMyRole = role === this.props.user_info.username;
      this.props.updateGame({
        ...this.props.play, classKora, timer: this.props.play.timer.concat({
          currentPlayerColor, time: data.data.timer, isTrue
        })
      })
      if (numberOfQuestion === JSON.parse(this.props.user_info.room).length) {
        this.props.history.push('/equal');
        return;
      }
      finalData = {
        ...this.props.play,
        questions,
        role,
        isMyRole,
        color,
        number1,
        number3,
        number2,
        answers,
        classKora: '',
        numberOfQuestion: numberOfQuestion++,
        redScore,
        redTeam: redTeam.length > 0 ? redTeam : newTeam.redTeamNew,
        blueTeam: blueTeam.length > 0 ? blueTeam : newTeam.blueTeamNew,
        blueScore,
        count: 0,
        // timer: 10,
        resultPrevPlayer: 0 //نتيحة سؤال اللاعب الحالي ي سمر
        // resultPrevPlayer
      };
      setTimeout(() => {
        socket.emit('switch timer', this.props.user_info.roomName)
        this.props.updateGame(finalData);
      }, 2000);
    });
  };
  gamingRoom = socket => {
    let { redScore, blueScore, numberOfQuestion, redTeam, blueTeam } = this.props.play;
    let role, color, isMyRole;
    let newTeam;
    // console.log({ socket }, '**/*/');

    socket.on('data.room', async data => {
      if (data.room !== this.props.user_info.room) return;
      console.log({ redScore, blueScore, numberOfQuestion, redTeam, blueTeam });
      
      const { location } = this.props;
      if (location.pathname !== '/GamePersinWithPerson') {
        this.props.closeDialog();
        this.props.history.push('/GamePersinWithPerson');
      }
      let finalData = {}
      let { number1, number2, answers, result, questions, classKora } = data.data
      // let currentPlayer = JSON.parse(this.props.user_info.room).findIndex(el => el === data.data.currentPlayer)
      let currentPlayer = JSON.parse(this.props.user_info.room).findIndex(el => el === data.data.currentPlayer)
      if (currentPlayer === JSON.parse(this.props.user_info.room).length - 1) {
        role = JSON.parse(this.props.user_info.room)[0];
      } else {
        role = JSON.parse(this.props.user_info.room)[currentPlayer + 1];
      }
      color =
        (JSON.parse(this.props.user_info.room).findIndex(el => el === role) +
          1) %
          2 ===
          0
          ? 'red'
          : 'blue';      
      let currentPlayerColor =
        (JSON.parse(this.props.user_info.room).findIndex(el => el === data.data.currentPlayer) +
          1) %
          2 ===
          0
          ? 'red'
          : 'blue';
      if (redTeam.length === 0 && blueTeam.length === 0) {
        let red_team = [JSON.parse(this.props.user_info.room)[1], JSON.parse(this.props.user_info.room)[3]]
        let blue_team = [JSON.parse(this.props.user_info.room)[0], JSON.parse(this.props.user_info.room)[2]]
        newTeam = await detrmineRedABlue(red_team, blue_team, this.props.users);
      }
      if (result) {
        let isTrue =
          this.props.play.number1 * this.props.play.number2 ===
          parseInt(result, 10);
        if (currentPlayerColor === 'red' && isTrue) {
          this.props.updateGame({
            ...this.props.play,
            redScore: redScore++
          });
        } else if (currentPlayerColor === 'blue' && isTrue) {
          this.props.updateGame({
            ...this.props.play,
            blueScore: blueScore++
          });
        }
        this.props.updateGame({
          ...this.props.play,
          resultPrevPlayer: result
        });
      }
      isMyRole = role === this.props.user_info.username;
      if (numberOfQuestion === 19 && blueScore === redScore) {
        this.props.history.push('/equal');
        socket.emit('remove timer', this.props.user_info.roomName)
        return;
      }
      if (numberOfQuestion === 19 && blueScore !== redScore) {
        this.props.history.push('/congrat');
        socket.emit('remove timer', this.props.user_info.roomName)
        return;
      }
      this.props.updateGame({ ...this.props.play, classKora })
      finalData = {
        ...this.props.play,
        questions,
        role,
        isMyRole,
        color,
        number1,
        number2,
        answers,
        classKora: '',
        numberOfQuestion: numberOfQuestion++,
        redScore,
        redTeam: redTeam.length > 0 ? redTeam : newTeam.redTeamNew,
        blueTeam: blueTeam.length > 0 ? blueTeam : newTeam.blueTeamNew,
        blueScore,
        count: 0,
        // timer: 10,
        resultPrevPlayer: 0 //نتيحة سؤال اللاعب الحالي ي سمر
        // resultPrevPlayer
      };
      setTimeout(() => {
        socket.emit('switch timer', this.props.user_info.roomName)
        this.props.updateGame(finalData);
      }, 2000);
    });
  };
  newInvitation = socket => {
    socket.on('new message', dataNewMassg => {
      if (dataNewMassg.to === this.props.user_info.username) {
        if (dataNewMassg.type === 'invite') {
          this.props.updateUser({
            ...this.props.user_info,
            is_playing: 'pending',
            with: dataNewMassg.from,
            room: null
          });
          this.props.openDialog({ from: dataNewMassg.from, type: 'invite' });
        }
        if (dataNewMassg.type === 'reject') {
          this.props.openDialog({
            from: dataNewMassg.from,
            type: 'reject',
            removeAfterTime: true
          });
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
  };
  render() {
    const type = ['cancelInvite', 'withdrawal', 'cancelPlayer', 'reject'];
    return (
      <WindowResize width={414} height={736}>
        <div>
          {type.includes(this.props.type) && <Snackbar props={this.props} />}
          {!type.includes(this.props.type) && (
            <PopAccept
              props={this.props}
              handleAccept={this.handleAccept}
              handleReject={this.handleReject}
              withdrawal={this.withdrawal}
            />
          )}
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/player-Character" component={playerCharacter} />
            <Route exact path="/select-game-type" component={GameType} />
            <Route exact path="/select-compititor" component={SelectCompititor} />
            <Route exact path="/game-individual" component={GameIndividual} />
            <Route exact path="/tables/short" component={GameIndividual2} />

            <Route exact path="/CongratsPWP" component={CongratsPWP} />
            {/* <Route exact path="/GameGroupWithGroup" component={GameGroupWithGroup} /> */}
            <Route
              exact
              path="/GamePersinWithPerson"
              component={GamePersinWithPerson}
            />
            <Route
              exact
              path="/play-equal"
              component={GamePersinWithPerson2}
            />
            <Route exact path="/congrat-individ" component={CongratIndivid} />

            <Route exact path="/congrat" component={Congrat} />
            <Route exact path="/Welcome" component={Welcome} />

            <Route exact path="/equal" component={Equal} />
            <Route exact path="/tables" component={Tables} />
            <Route exact path="/tables2" component={Tables2} />

            <Route exact path="/tables/:id" component={GameIndividual} />
          </Switch>
        </div>
      </WindowResize>
    );
  }
}

const mapDispatchToProps = {
  getUsers,
  openDialog,
  closeDialog,
  updateUser,
  updateGame
};
const mapStateToProps = state => ({
  user_info: state.user.info,
  play: state.user.play,
  users: state.user.users,
  isLoggedIn: state.user.isLoggedIn,
  open: state.dialog.open,
  type: state.dialog.type,
  removeAfterTime: state.dialog.removeAfterTime,
  come_from: state.dialog.come_from
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
