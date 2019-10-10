import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store/actions';
import Frame from '../assets/frame.png';
import Vs from '../assets/VS.png';
import person from '../assets/playerInitial.png';
import inputDiv from '../assets/InputDiv.png';
import buttonDiv from '../assets/buttonDiv.png';
import compiteButton from '../assets/compiteButton.png';
import playerName from '../assets/playerName.png';
import online from '../assets/online.png';
import inviteFreind from '../assets/inviteFreind.png';
import title2 from '../assets/title2.png';

import './SelectCompititor.css';

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
        {/* <h2> Members </h2>
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
        </ul> */}
        <div className="selectCompititorsDiv">
          <div className="titleImage1">
            <img src={title2} title="sss" alt="Sss" className="titleImage" />
          </div>
          <div className="subHeaderMain">
            <div className="subHeader2">
              <img
                src={Frame}
                title="sss"
                alt="Sss"
                className="selectedImageFrame2"
              />

              <img
                src={person}
                title="ti"
                alt="dss"
                className="selectedImage2"
              />
            </div>

            <div className="vsDiv">
              <img src={Vs} title="sss" alt="Sss" className="vs" />
            </div>
            <div className="subHeader3">
              <img
                src={Frame}
                title="sss"
                alt="Sss"
                className="selectedImageFrame3"
              />

              <img
                src={person}
                title="ti"
                alt="dss"
                className="selectedImage3"
              />
            </div>
          </div>

          <div className="searchDiv">
            <div className="buttonDiv">
              {/* <img
                src={buttonDiv}
                title="ti"
                alt="dss"
                className="searchButton"
              /> */}
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
            <div className="onlinePlayersDiv">
              <ul>
                <li>
                  <div className="rows">
                    <div className="onlineButtons">
                      {' '}
                      {/* <img
                      src={online}
                      title="compiteButton"
                      alt="compiteButton"
                      className="compiteButton"
                    /> */}
                      <button className="buttons onButton">متـصل</button>
                    </div>
                    <div className="playersName">
                      {' '}
                      <img
                        src={playerName}
                        title="compiteButton"
                        alt="compiteButton"
                        className="buttons"
                      />
                      <input
                        type="text"
                        className="enteringName"
                        placeholder="اسـم اللاعــب"
                      />
                    </div>
                    <div className="inviteButtons">
                      {' '}
                      {/* <img
                      src={inviteFreind}
                      title="compiteButton"
                      alt="compiteButton"
                      className="compiteButton"
                    /> */}
                      <button className="buttons invButton">دعــوة</button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="rows">
                    <div className="onlineButtons">
                      {' '}
                      {/* <img
                      src={online}
                      title="compiteButton"
                      alt="compiteButton"
                      className="compiteButton"
                    /> */}
                      <button className="buttons onButton">متـصل</button>
                    </div>
                    <div className="playersName">
                      {' '}
                      <img
                        src={playerName}
                        title="compiteButton"
                        alt="compiteButton"
                        className="buttons"
                      />
                      <input
                        type="text"
                        className="enteringName"
                        placeholder="اسـم اللاعــب"
                      />
                    </div>
                    <div className="inviteButtons">
                      {' '}
                      {/* <img
                      src={inviteFreind}
                      title="compiteButton"
                      alt="compiteButton"
                      className="compiteButton"
                    /> */}
                      <button className="buttons invButton">دعــوة</button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="rows">
                    <div className="onlineButtons">
                      {' '}
                      {/* <img
                      src={online}
                      title="compiteButton"
                      alt="compiteButton"
                      className="compiteButton"
                    /> */}
                      <button className="buttons onButton">متـصل</button>
                    </div>
                    <div className="playersName">
                      {' '}
                      <img
                        src={playerName}
                        title="compiteButton"
                        alt="compiteButton"
                        className="buttons"
                      />
                      <input
                        type="text"
                        className="enteringName"
                        placeholder="اسـم اللاعــب"
                      />
                    </div>
                    <div className="inviteButtons">
                      {' '}
                      {/* <img
                      src={inviteFreind}
                      title="compiteButton"
                      alt="compiteButton"
                      className="compiteButton"
                    /> */}
                      <button className="buttons invButton">دعــوة</button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="rows">
                    <div className="onlineButtons">
                      {' '}
                      {/* <img
                      src={online}
                      title="compiteButton"
                      alt="compiteButton"
                      className="compiteButton"
                    /> */}
                      <button className="buttons onButton">متـصل</button>
                    </div>
                    <div className="playersName">
                      {' '}
                      <img
                        src={playerName}
                        title="compiteButton"
                        alt="compiteButton"
                        className="buttons"
                      />
                      <input
                        type="text"
                        className="enteringName"
                        placeholder="اسـم اللاعــب"
                      />
                    </div>
                    <div className="inviteButtons">
                      {' '}
                      {/* <img
                      src={inviteFreind}
                      title="compiteButton"
                      alt="compiteButton"
                      className="compiteButton"
                    /> */}
                      <button className="buttons invButton">دعــوة</button>
                    </div>
                  </div>
                </li>
                {/* <li>
                <div className="rows">
                  <div className="onlineButtons">
                    {' '}
                    <img
                      src={online}
                      title="compiteButton"
                      alt="compiteButton"
                      className="compiteButton"
                    />
                  </div>
                  <div className="playersName">
                    {' '}
                    <img
                      src={playerName}
                      title="compiteButton"
                      alt="compiteButton"
                      className="buttons"
                    />
                  </div>
                  <div className="inviteButtons">
                    {' '}
                    <img
                      src={inviteFreind}
                      title="compiteButton"
                      alt="compiteButton"
                      className="buttons"
                    />
                  </div>
                </div>
              </li>
             */}
              </ul>
            </div>
          </div>

          <div className="compiteButtonDiv">
            <img
              src={compiteButton}
              title="compiteButton"
              alt="compiteButton"
              className="compiteButton"
            />
          </div>
          {/* <img src={Vs} title="sss" alt="Sss" className="Vs" /> */}

          {/* <ul id="ulist">
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
          </ul> */}
        </div>
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
