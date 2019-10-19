import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, closeDialog } from '../store/actions';
import Frame from '../assets/frame.png';
import Vs from '../assets/VS.png';
import person from '../assets/playerInitial.png';
import inputDiv from '../assets/InputDiv.png';
// import buttonDiv from '../assets/buttonDiv.png';
import compiteButton from '../assets/compiteButton.png';
import playerName from '../assets/playerName.png';
import True from '../assets/true.png';
import False from '../assets/false.png';
import title2 from '../assets/title2.png';
import { questionsAndAnswers } from '../utils/questionAndAnswer';

import './SelectCompititor.css';

const io = require('socket.io-client');

class Select extends Component {
  // eslint-disable-next-line react/sort-comp
  sendInvite = (socket, selectedUser) => {
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
  };

  onSelectUser = e => {
    const socket = io.connect('http://localhost:8080');
    this.sendInvite(socket, e.target.id);
  };
  startPlay = () => {
    const socket = io.connect('http://localhost:8080');
    const { username, accpet } = this.props.user_info
    let room = JSON.stringify([username, ...accpet])
    const { number1, number2, answers } = questionsAndAnswers(4);
    let data = {
      number1, number2, answers, currentPlayer: username, result: false
    }
    socket.emit('startGame', { room, data })
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

  render() {
    return (
      <React.Fragment>
        <div className="selectCompititorsDiv">
          <div className="titleImage1">
            <img src={title2} title="sss" alt="Sss" className="titleImage" />
          </div>
          

        
          <div className="searchDiv">
            <div className="buttonDiv">
              <button className="searchButton">بدء البحـث</button>
            </div>
            <div className="inputDiv">
              <img
                src={inputDiv}
                title="ti"
                alt="dss"
                className="searchInput"
              />
              <input type="txt" className="enteringSearchInput" />
            </div>
          </div>

          <div className="onlinePlayers">
              <ul>
                {this.props.users.map(element => (
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
              <ul>
                {this.props.users.map(element => (
                  <li>
                    <div className="rows">
                      
                    <div className="inviteButtons">
                        <button
                          className="buttons invButton invButton2 "
                          id={element.username}
                          key={element}
                          onClick={this.onSelectUser}
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
                          {element.username}{' '}
                        </span>
                      </div>
                      <div className="onlineButtons">
                        {!element.is_playing ? (
                          <span className="buttons onButton">قبل الدعوة</span>
                        ) : (
                            <span className="buttons busyButton">بانتظار القبول</span>
                          )}
                      </div>
                      <img src={True} alt="true" className="true"/>
                      {/* <img src={False} alt="false" className="false"/> */}
                    
                    </div>
                  </li>
                ))}
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
