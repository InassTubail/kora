import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, closeDialog } from '../store/actions';
// import Frame from '../assets/frame.png';
// import Vs from '../assets/VS.png';
// import person from '../assets/playerInitial.png';
import inputDiv from '../assets/InputDiv.png';
// import buttonDiv from '../assets/buttonDiv.png';
import compiteButton from '../assets/compiteButton.png';
import playerName from '../assets/playerName.png';
import True from '../assets/true.png';
// import False from '../assets/false.png';
import title2 from '../assets/title2.png';
import { questionsAndAnswers } from '../utils/questionAndAnswer';
import socket from '../utils/api';
import './SelectCompititor.css';

const io = require('socket.io-client');

class Select extends Component {
  state = {
    error: "",
    filteredOptions: [],
    // showOptions: false,
    alluser:[]

  }
  // eslint-disable-next-line react/sort-comp

  sendInvite = (socket, selectedUser) => {
    const { invite, accpet } = this.props.user_info
    let total = invite.length + accpet.length;
    if (total < 3) {
      const data = {};
      data.to = selectedUser;
      data.from = this.props.user_info.username; // current user
      data.type = 'invite';
      socket.emit('sendInviteToPlay', data);
      this.props.updateUser({
        ...this.props.user_info,
        is_playing: 'pending',
        with: data.from,
        room: null,
        invite: this.props.user_info.invite.push(data.to)
      });
    } else {
      this.setState({ error: 'لم يتم ارسال الدعوة, قد دعوت شخص او 3 اشخاص بالفعل' })
    }
  };

  onSelectUser = e => {
    // const socket = io.connect('http://localhost:8080');
    this.sendInvite(socket, e.target.id);
  };
  startPlay = () => {
    // const socket = io.connect('http://localhost:8080');
    const { username, accpet } = this.props.user_info
    if (accpet.length !== 3 && accpet.length !== 1) {
      this.setState({ error: 'يجب قبول شخص أو 3 اشخاص لبدء اللعبه' })
    } else {
      let room = JSON.stringify([username, ...accpet])
      const { number1, number2, answers } = questionsAndAnswers(4);
      let data = {
        number1, number2, answers, currentPlayer: username, result: false
      }
      socket.emit('startGame', { room, data })
    }
    // socket.emit(room, data)
  }
  // componentDidUpdate() {
  //   const { open } = this.props;
  //   if (open) {
  //     setTimeout(() => {
  //       this.props.closeDialog();
  //       this.props.updateUser({
  //          ...this.props.user_info.username,
  //         is_playing: false,
  //         with: null,
  //         room: null,
  //       });
  //     }, 10000);
  //   }
  // }
  cancelInvite = (e) => {
    // const socket = io.connect('http://localhost:8080');
    let data = {}
    data.to = e.target.id;
    data.from = this.props.user_info.username; // current user
    data.type = 'cancelInvite';
    socket.emit('sendInviteToPlay', data)
  }
  cancelPlayer = (e) => {
    // const socket = io.connect('http://localhost:8080');
    let data = {}
    data.to = e.target.id;
    data.from = this.props.user_info.username; // current user
    data.type = 'cancelPlayer';
    socket.emit('sendInviteToPlay', data)
  }

//   search = (e) =>{
//   const myValue=  this.props.users.filter(element => (
// element.username === e.target.value)
// );
// console.log(myValue,'ll'); 
//     }

search = (e) => {
  const  options  = this.props.users.filter(element => (element.username !== this.props.user_info.username));
  const userInput = e.target.value;
const filteredOptions = options.filter(
    (option) => option.username.toLowerCase().indexOf(userInput.toLowerCase()) > -1
  );
  // console.log(filteredOptions ,'filteredOptions ')
this.setState({
    filteredOptions ,  
    // showOptions: true,
  });
};
// componentDidMount= () => {
//   console.log({alluser},'DID')
//   this.setState({alluser})
// }

render() {
  let alluser = this.props.users.filter(element => (element.username !== this.props.user_info.username))
  console.log({alluser});
  let filterop =  this.state.filteredOptions.length > 0 && this.state.filteredOptions
  console.log({filterop});
  let alluser2 = filterop || alluser
  console.log({alluser2});
  // console.log(this.state.alluser,'this.state.alluser');
  
    return (
      <React.Fragment>
        <div className="selectCompititorsDiv">
          <div className="titleImage1">
            <img src={title2} title="sss" alt="Sss" className="titleImage" />
          </div>
          <div className="searchDiv">
            {/* <div className="buttonDiv">
              <button className="searchButton">بدء البحـث</button>
            </div> */}
            <div className="inputDiv">
              <img
                src={inputDiv}
                title="ti"
                alt="dss"
                className="searchInput"
              />
              <input type="txt" className="enteringSearchInput" onChange={this.search} placeholder="ادخل اسم اللاعب الذي تريد البحث عنه" />
            </div>
          </div>

          {this.state.error ? <p className="errorMeassageG"> {this.state.error}</p> : null}
          <div className="onlinePlayers">
            <ul>
              {alluser2.map(element => (
                <li>
                  <div className="rows">
                    <div className="inviteButtons">
                      <button
                        className="buttons invButton"
                        id={element.username}
                        key={element}
                        onClick={this.onSelectUser}
                      >
                        دعــوة
                        </button>
                    </div>
                    <div className="playersName">
                      {' '}
                      <img
                        src={playerName}
                        title="compiteButton"
                        alt="compiteButton"
                        className="buttons"
                      />
                      <span
                        // type="text"
                        className="enteringName"
                      >
                        {element.username}{' '}
                      </span>
                    </div>

                    <div className="onlineButtons">
                      {!element.is_playing ? (
                        <span className="buttons onButton">متصل</span>
                      ) : (
                          <span className="buttons busyButton">مشغول</span>
                        )}
                    </div>


                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="fasel"><p>الأشخاص الذين أرسل لهم دعوة</p></div>
          <div className="playersToPlayWith">
            <ul>{
              this.props.user_info.invite.length > 0 && this.props.user_info.invite.map(element => (
                <li>
                  <div className="rows">

                    <div className="inviteButtons">
                      <button
                        className="buttons invButton invButton2 "
                        id={element}
                        key={element}
                        onClick={this.cancelInvite}
                      >الغاء الدعوة</button>
                    </div>
                    <div className="playersName2">
                      {' '}
                      <img
                        src={playerName}
                        title="compiteButton"
                        alt="compiteButton"
                        className="buttons"
                      />
                      <span
                        // type="text"
                        className="enteringName2"
                      >
                        {element}{' '}
                      </span>
                    </div>
                    <div className="onlineButtons">
                      <span className="buttons busyButton">بانتظار القبول</span>
                    </div>
                    <img src={True} alt="true" className="true" />
                  </div>
                </li>
              ))}
              {
                this.props.user_info.accpet.length > 0 && this.props.user_info.accpet.map(element => (
                  <li>
                    <div className="rows">

                      <div className="inviteButtons">
                        <button
                          className="buttons invButton invButton2 "
                          id={element}
                          key={element}
                          onClick={this.cancelPlayer}
                        >الغاء الصديق</button>
                      </div>
                      <div className="playersName2">
                        {' '}
                        <img
                          src={playerName}
                          title="compiteButton"
                          alt="compiteButton"
                          className="buttons"
                        />
                        <span
                          // type="text"
                          className="enteringName2"
                        >
                          {element}{' '}
                        </span>
                      </div>
                      <div className="onlineButtons">
                        <span className="buttons onButton">قبل الدعوة</span>
                      </div>
                      <img src={True} alt="true" className="true" />
                    </div>
                  </li>
                ))
              }
              {/* </React.Fragment> */}
              {/* } */}
            </ul>
          </div>
          {/* <div className="compiteButtonDiv" onClick={this.startPlay}>
            <img
              src={compiteButton}
              title="compiteButton"
              alt="compiteButton"
              className="compiteButton"
            />
          </div> */}
          <div className="searchDiv">
            <div className="buttonDiv">
              <button className="startButton" onClick={this.startPlay}>بدء اللعبه</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = { updateUser, closeDialog };

const mapStateToProps = state => ({
  open: state.dialog.open,
  user_info: state.user.info,
  users: state.user.users,
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Select);