import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, closeDialog } from '../store/actions';
// import inputDiv from '../assets/InputDiv.png';
// import playerName from '../assets/playerName.png';
// import True from '../assets/true.png';
// import title2 from '../assets/title2.png';
import { questionsAndAnswers } from '../utils/questionAndAnswer';
import socket from '../utils/api';
// import startButton from '../assets/startButton.png'

import './SelectCompititor.css';

const io = require('socket.io-client');

class Select extends Component {
  state = {
    error: "",
    filteredOptions: [],
    alluser: []

  }
  // eslint-disable-next-line react/sort-comp
  sendInvite = (socket, selectedUser) => {
    const { invite, accpet } = this.props.user_info
    let total = invite.length + accpet.length;
    if (total < 3) {
      const data = {};
      data.to = selectedUser;
      data.from = this.props.user_info.username;
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
    this.sendInvite(socket, e.target.id);
  };
  startPlay = () => {
    const { username, accpet, invite } = this.props.user_info
    if (accpet.length !== 3 && accpet.length !== 1) {
      this.setState({ error: 'يجب قبول شخص أو 3 اشخاص لبدء اللعبه' })
    } else if (invite.length !== 0) {
      this.setState({ error: 'يجب الغاء الاشخاص المدعويين او انتظار قبول دعوتهم لبدء اللعبة' })
    } else {
      this.props.history.push('/tables2');
    }
  }
  cancelInvite = (e) => {
    let data = {}
    data.to = e.target.id;
    data.from = this.props.user_info.username;
    data.type = 'cancelInvite';
    socket.emit('sendInviteToPlay', data)
  }
  cancelPlayer = (e) => {
    let data = {}
    data.to = e.target.id;
    data.from = this.props.user_info.username;
    data.type = 'cancelPlayer';
    socket.emit('sendInviteToPlay', data)
  }

  search = (e) => {
    const options = this.props.users.filter(element => (element.username !== this.props.user_info.username));
    const userInput = e.target.value;
    const filteredOptions = options.filter(
      (option) => option.username.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      filteredOptions,
    });
  };

  render() {
    let alluser = this.props.users.filter(element => (element.username !== this.props.user_info.username))
    let filterop = this.state.filteredOptions.length > 0 && this.state.filteredOptions
    let alluser2 = filterop || alluser
    return (
      <React.Fragment>
        <div className="selectCompititorsDiv">
          <div className="titleImage1">
            <img src={'https://user-images.githubusercontent.com/30287981/68534457-66c07a00-033d-11ea-922d-eb66192a75aa.png'} title="sss" alt="Sss" className="titleImage" />
          </div>
          <div className="searchDiv">
            <div className="inputDiv">
              <img
                src={'https://user-images.githubusercontent.com/30287981/68534147-af763400-0339-11ea-8398-9ea8420a9e95.png'}
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
                        disabled={element.is_playing ? true : false}
                      >
                        دعــوة
                        </button>
                    </div>
                    <div className="playersName">
                      {' '}
                      <img
                        src={'https://user-images.githubusercontent.com/30287981/68533809-08dc6400-0336-11ea-9b94-494308582f6a.png'}
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
                        src={'https://user-images.githubusercontent.com/30287981/68533809-08dc6400-0336-11ea-9b94-494308582f6a.png'}
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
                    <img src={'https://user-images.githubusercontent.com/30287981/68534459-6aec9780-033d-11ea-95eb-fdd3963bb55f.png'} alt="true" className="true" />
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
                          src={'https://user-images.githubusercontent.com/30287981/68533809-08dc6400-0336-11ea-9b94-494308582f6a.png'}
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
                      <img src={'https://user-images.githubusercontent.com/30287981/68534459-6aec9780-033d-11ea-95eb-fdd3963bb55f.png'} alt="true" className="true" />
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
              <img src={'https://user-images.githubusercontent.com/30287981/68534403-f0237c80-033c-11ea-9540-d8a4f45e7587.png'} alt="startButton" className="startButton" onClick={this.startPlay} />
              {/* <button className="startButton" onClick={this.startPlay}>بدء اللعبه</button> */}
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