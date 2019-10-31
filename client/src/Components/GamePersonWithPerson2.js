import React, { Component } from 'react';
import { connect } from 'react-redux';

import koraImg from '../assets/kora.png';
import frame from '../assets/frame.png';
import haresBlue from '../assets/haresBlue.png';
import haresRed from '../assets/haresRed.png';
import gWithg from '../assets/tit.png';
import questions from '../assets/questions.png';
import counterRed from '../assets/counterRed.png';
import counterBlue from '../assets/counterBlue.png';
import playerRed from '../assets/player.png';
import playerBlue from '../assets/playerBlue.png';
import { updateUser, updateGame } from '../store/actions';
import timerRed from '../assets/redTimer.png'
import { questionsAndAnswers, groupGame } from '../utils/questionAndAnswer'
import { person } from './playersImage';
import timerImg from '../assets/timer.png'
import { arabic_num, convert, convertT } from '../utils/arabic_num'

import './GameGroupWithGroup.css';

import socket from '../utils/api';

// const io = require('socket.io-client');

class GamePersonWithPerson2 extends Component {
  state = {
    blueTeam: [],
    redTeam: [],
    error: "",
    timer: 1,

  }
  componentDidMount() {
    socket.on('timer', timer => {
      this.setState({ timer })
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const { isMyRole, questions } = this.props.play
    if (isMyRole && this.state.timer === 0 && prevState.timer !== this.state.timer) {
      const result = 'false'
      const { room } = this.props.user_info
      let { number1, number2, answers, filterdQuestions } = groupGame(questions);
      answers = convert(answers)
      let data = {
        result, number1, number2, answers, currentPlayer: this.props.play.role, questions: filterdQuestions,
        classKora: ``,fromEqual: true
      }
      socket.emit('startGame', { room, data })
    }
    if (this.state.error) {
      setTimeout(async () => {
        this.setState({ error: "" })
      }, 2000);
    }
  }
  selectAnswer = (el) => {
    // clearInter
    const { isMyRole, questions } = this.props.play
    if (isMyRole) {
      const result = el.currentTarget.id
      const { room } = this.props.user_info
      let { number1, number2, answers, filterdQuestions } = groupGame(questions);
      answers = convert(answers)
      let data = {
        result, number1, number2, answers, currentPlayer: this.props.play.role, questions: filterdQuestions,
        classKora: `${el.currentTarget.className}-f`, fromEqual: true
      }
      socket.emit('startGame', { room, data, timer: this.state.timer })
    } else {
      this.setState({ error: 'انتظر دورك' });
    }
  }
  render() {
    const { number1, number2, answers, blueTeam, isMyRole, redTeam, role, resultPrevPlayer, color, classKora } = this.props.play
    return (
      <React.Fragment>
        <div className="gameScreen2g">
          <div className="header2g">
            <div>
              <img src={gWithg} alt="title" className="titleImage2g" />
            </div>
            {isMyRole ?
              <p className="playNow"><span className="playNowName"> أنت </span> تلعب الان</p>
              :
              <p className="playNow"><span className="playNowName"> {role}</span> يلعب الان</p>
            }

            {this.state.error ? <p className="errorMeassage">* {this.state.error}</p> : null}
            <div className="quesDiv2g">
              <img src={questions} alt="title" className="titleImage2g" />
              <p className="questionStatement2g">{`${arabic_num[number1]} × ${arabic_num[number2]}`}</p>
            </div>
          </div>
          {color === 'red' ? <img src={haresBlue} alt="hares" className="hares2g" /> :
            <img src={haresRed} alt="hares" className="hares2g" />}


          <div className="answers">
            {answers.map((el, index) =>
              <button className={(resultPrevPlayer === 0) ? `answer${index + 1}` : `answer${index + 1} ${el.style}`} id={el.answer} onClick={this.selectAnswer}>
                {el.arabic_answer}
              </button>
            )}
          </div>
          <img src={koraImg} alt="kora" edt className={`koraImg2g ${classKora}`} />
          {color === 'red' ? <img src={playerRed} alt="kora" edt className="playerImg2g" /> : <img src={playerBlue} alt="kora" edt className="playerImg2g" />}
          <div className="subHeadersGroupg">
            <div className="subHeader332g">
              {blueTeam && blueTeam.map((el, index) =>
                <React.Fragment>
                  <img
                    src={frame}
                    title="ti"
                    alt="dss"
                    className="selectedImageFrame332g"
                  />
                  <img src={person(el.person)} title="sdd" alt="dsdd" className={`selectedImage332g play${index}`} />
                  <div className="blueColorg"><p>{el.username}</p></div>
                </React.Fragment>
              )}
            </div>

            <div className="tim">
              <img src={timerImg} alt="" className="timImg" />
              <p>{convertT(this.state.timer)}</p>
            </div>
            <div className="subHeader3321g">
              {redTeam && redTeam.map((el, index) =>
                <React.Fragment>
                  <img
                    src={frame}
                    title="ti"
                    alt="dss"
                    className="selectedImageFrame332g"
                  />
                  <img src={person(el.person)} title="person" alt="person" className={`selectedImage332g play${index} `} />
                  <div className="redColorg"><p>{el.username}</p></div>
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="subHeader42g">
            <div className="countPPg">
              <img src={counterBlue} title="sdd" alt="dd" className="counter2g" />
              <p className="counterParag2g">{this.props.play.blueScore}</p>
            </div>
            <div className="countPP">
              <img src={counterRed} title="sdd" alt="dd" className="counter2g" />
              <p className="counterParag2g">{this.props.play.redScore}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

const mapDispatchToProps = { updateUser, updateGame };
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
)(GamePersonWithPerson2);
