import React, { Component } from 'react';
import { connect } from 'react-redux';

import koraImg from '../assets/kora.png';
import frame from '../assets/frame.png';
import hares from '../assets/hares.png';
import titleImg from '../assets/tit.png';
import questions from '../assets/questions.png';
import counterRed from '../assets/counterRed.png';
import counterBlue from '../assets/counterBlue.png';
import player from '../assets/player.png';
import { updateUser } from '../store/actions';
import { questionsAndAnswers } from '../utils/questionAndAnswer'
import { person } from './playersImage';
import './GamePersonWithPerson.css';

const io = require('socket.io-client');

class GamePersonWithPerson extends Component {
  state = {
    blueTeam: [],
    redTeam: []
  }
  selectAnswer = (el) => {
    const isMyRole = this.props.play
    if (!isMyRole) return;
    const socket = io.connect('http://localhost:8080');
    const result = el.currentTarget.id
    const { room } = this.props.user_info
    const { number1, number2, answers } = questionsAndAnswers(4);
    let data = {
      result, number1, number2, answers, currentPlayer: this.props.play.role
    }
    socket.emit('startGame', { room, data })
  }
  render() {
    const { number1, number2, answers, result, blueTeam, redTeam, role } = this.props.play
    return (
      <React.Fragment>
        <div className="gameScreen2">
          <div className="header2">
            <div>
              <img src={titleImg} alt="title" className="titleImage2" />
            </div>
            <p>{role} يلعب الان</p>
            <div className="quesDiv2">
              <img src={questions} alt="title" className="titleImage2" />
              <p className="questionStatement2">{`${number1} * ${number2}`}</p>
            </div>
          </div>
          <img src={hares} alt="hares" className="hares2" />

          <div className="answers2">
            {answers.map((el, index) =>
              <button className={!result ? `answer${index + 1}` : `answer${index + 1} ${el.style}`} id={el.answer} onClick={this.selectAnswer}>
                {el.answer}
              </button>
            )}
          </div>
          <img src={koraImg} alt="kora" edt className="koraImg2" />
          <img src={player} alt="kora" edt className="playerImg2" />
          <div className="subHeadersGroup">
            <div className="subHeader332">
              {blueTeam && blueTeam.map((el) =>
                <React.Fragment>
                  <img
                    src={frame}
                    title="ti"
                    alt="dss"
                    className="selectedImageFrame332"
                  />
                  <img src={person(el.person)} title="sdd" alt="dsdd" className="selectedImage332" />
                  <div className="blueColor"><p>{el.username}</p></div>
                </React.Fragment>
              )}
            </div>
            <div className="subHeader3321">
              {redTeam && redTeam.map((el) =>
                <React.Fragment>
                  <img
                    src={frame}
                    title="ti"
                    alt="dss"
                    className="selectedImageFrame332"
                  />
                  <img src={person(el.person)} title="person" alt="person" className="selectedImage332" />
                  <div className="redColor"><p>{el.username}</p></div>
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="subHeader42">
            <div >
              <img src={counterRed} title="sdd" alt="dd" className="counter2" />
              <p className="counterParag2">{this.props.play.redScore}</p>
            </div>

            <div>
              <img src={counterBlue} title="sdd" alt="dd" className="counter2" />
              <p className="counterParag2">{this.props.play.blueScore}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

const mapDispatchToProps = { updateUser };
const mapStateToProps = state => ({
  user_info: state.user.info,
  play: state.user.play,
  users: state.user.users,
  isLoggedIn: state.user.isLoggedIn,
  open: state.dialog.open,
  come_from: state.dialog.come_from,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePersonWithPerson);
