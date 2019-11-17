import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, updateGame } from '../store/actions';
import { questionsAndAnswers, groupEqual } from '../utils/questionAndAnswer'
import { person } from './playersImage';
import { arabic_num, convert, convertT } from '../utils/arabic_num'

import './GameGroupWithGroup.css';

import socket from '../utils/api';

class GamePersonWithPerson2 extends Component {
  state = {
    blueTeam: [],
    redTeam: [],
    error: "",
    timer: 1,
    isTimePused: false,
    isAnswered: false

  }
  componentDidMount() {
    socket.on('timer', timer => {
      this.setState({ isTimePused:timer.isTimePused })
      if (!timer.isTimePused) {
        this.setState({ timer: timer.time, isTimePused:timer.isTimePused })
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const { isMyRole, questions } = this.props.play
    if (isMyRole && this.state.timer === 0 && prevState.timer !== this.state.timer) {
      const result = 'false'
      const { room } = this.props.user_info
      let { number1, number2, number3, answers, filterdQuestions } = groupEqual(questions);
      answers = convert(answers)
      let data = {
        result, number1, number2, number3, answers, currentPlayer: this.props.play.role, questions: filterdQuestions,
        classKora: ``, fromEqual: true
      }
      socket.emit('startGame', { room, data }, this.props.user_info.roomName)
    }
    if (this.state.error) {
      setTimeout(async () => {
        this.setState({ error: "" })
      }, 2000);
    }
    if (this.state.isAnswered) {
      setTimeout(async () => {
        this.setState({ isAnswered: false })
      }, 2000);
    }
  }
  selectAnswer = (el) => {
    const { isMyRole, questions } = this.props.play
    const { isAnswered } = this.state

    if (isMyRole && !isAnswered) {
      this.setState({ isAnswered: true })
      socket.emit('timerP', this.props.user_info.roomName)
      const result = el.currentTarget.id
      const { room } = this.props.user_info
      let { number1, number2, number3, answers, filterdQuestions } = groupEqual(questions);
      answers = convert(answers)
      let data = {
        result, number1, number2, number3, answers, currentPlayer: this.props.play.role, questions: filterdQuestions,
        classKora: `${el.currentTarget.className}-f`, fromEqual: true, timer: this.state.timer
      }
      socket.emit('startGame', { room, data }, this.props.user_info.roomName)
    } else {
      this.setState({ error: 'انتظر دورك' });
    }
  }
  render() {
    const { number1, number2, number3, answers, blueTeam, isMyRole, redTeam, role, resultPrevPlayer, color, classKora } = this.props.play;    
    return answers.length == 0 ? <div className="gameScreen2g"> <p>جاري التحميل ...</p> </div>
      : (
        <React.Fragment>
          <div className="gameScreen2g">
            <div className="header2g">
              <div>
                <img src={'https://user-images.githubusercontent.com/30287981/68534485-bb63f500-033d-11ea-8fbc-9c35c2c1c26d.png'} alt="title" className="titleImage2g" />
              </div>
              {isMyRole ?
                <p className="playNow"><span className="playNowName"> أنت </span> تلعب الان</p>
                :
                <p className="playNow"><span className="playNowName"> {role}</span> يلعب الان</p>
              }

              {this.state.error ? <p className="errorMeassage">* {this.state.error}</p> : null}
              <div className="quesDiv2g">
                <img src={'https://user-images.githubusercontent.com/30287981/68534308-b56d1480-033b-11ea-9af3-9b8c5affe604.png'} alt="title" className="titleImage2g" />
                <p className="questionStatement2g">{`${arabic_num[number1]} × ${arabic_num[number2]} × ${arabic_num[number3]}`}</p>
              </div>
            </div>
            {color === 'red' ? <img src={'https://user-images.githubusercontent.com/30325727/68527970-ec203c00-02f5-11ea-8636-a1b3893e5e7b.png'} alt="hares" className="hares2g" /> :
              <img src={'https://user-images.githubusercontent.com/30325727/68527969-eaef0f00-02f5-11ea-9a5f-6926e1b17309.png'} alt="hares" className="hares2g" />}


            <div className="answers">
              {answers.map((el, index) =>
                <button className={(resultPrevPlayer === 0) ? `answer${index + 1}` : `answer${index + 1} ${el.style}`} id={el.answer} onClick={this.selectAnswer}>
                  {el.arabic_answer}
                </button>
              )}
            </div>
            <img src={'https://user-images.githubusercontent.com/30287981/68534189-05e37280-033a-11ea-9293-e877ff99f10c.png'} alt="kora" edt className={`koraImg2g ${classKora}`} />
            {color === 'red' ? <img src={'https://user-images.githubusercontent.com/30325727/68528142-774e0180-02f7-11ea-8ec0-fa2acc7d62ed.png'} alt="kora" edt className="playerImg2g" /> :
             <img src={'https://user-images.githubusercontent.com/30325727/68528141-774e0180-02f7-11ea-94d9-b18b3c889ccc.png'} alt="kora" edt className="playerImg2g" />}
            <div className="subHeadersGroupg">
              <div className="subHeader332g">
                {blueTeam && blueTeam.map((el, index) =>
                  <React.Fragment>
                    <img
                      src={'https://user-images.githubusercontent.com/30287981/68534044-d2ecaf00-0338-11ea-8523-8bf353a3359a.png'}
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
                <img src={'https://user-images.githubusercontent.com/30287981/68534404-f1ed4000-033c-11ea-8d8c-5bc9750ca951.png'} alt="" className="timImg" />
                <p>{convertT(this.state.timer)}</p>
              </div>
              <div className="subHeader3321g">
                {redTeam && redTeam.map((el, index) =>
                  <React.Fragment>
                    <img
                      src={'https://user-images.githubusercontent.com/30287981/68534044-d2ecaf00-0338-11ea-8523-8bf353a3359a.png'}
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
                <img src={'https://user-images.githubusercontent.com/30325727/68527983-01956600-02f6-11ea-81a4-c2a58724dc62.png'} title="sdd" alt="dd" className="counter2g" />
                <p className="counterParag2g">{this.props.play.blueScore}</p>
              </div>
              <div className="countPP">
                <img src={'https://user-images.githubusercontent.com/30325727/68527982-00fccf80-02f6-11ea-94f7-331392c26b5b.png'} title="sdd" alt="dd" className="counter2g" />
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
