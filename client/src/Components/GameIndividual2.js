import React, { Component } from 'react';
import { connect } from 'react-redux';

import koraImg from '../assets/kora.png';
// import person from '../assets/1.png';
import { person } from './playersImage';
import frame from '../assets/frame.png';
import haresBlue from '../assets/haresBlue.png';
import titleImg from '../assets/tit.png';
import questions from '../assets/questions.png';
import counter from '../assets/counter.png';
import koraGreen from '../assets/koGreen.png'
import koraRed from '../assets/koRed.png'
import koraBlack from '../assets/koBlack.png'
import timer from '../assets/timer.png'
// import helping from '../assets/helping.png'
// import displayTable from '../assets/displayTable.png'
// import addTime from '../assets/AddTime.png'
// import deleteAnswer from '../assets/deleteAnswer.png'
// import deleteAnswer2 from '../assets/deleteAnswer2.png'
import helping from '../assets/help-tools2.png'
import helping2 from '../assets/help-tools1.png'
import { shortTable } from '../utils/customPlay'
import player from '../assets/player.png';
import PopUpCongrat from './popUpCongrat';
import PopUpLose from './popUpLose';
import { updateUser } from '../store/actions';
import { shuffle } from '../utils/questionAndAnswer';
import './GameIndividual2.css';
import Sound from './SoundAhsant'
import TryAgainSound from './TryAgainSound'
import showTableB from '../assets/showTableB.png'
import showTableG from '../assets/showTableG.png'
import plusTimeB from '../assets/plusTimeB.png'
import plusTimeG from '../assets/plusTimeG.png'
import deleteTableG from '../assets/deleteTableG.png'
import deleteAnswer2 from '../assets/deleteAnswer2.png'
import correctSound from '../assets/correct.mp3';
import ShowTab from './showTables';
import { arabic_num, convert, convertT } from '../utils/arabic_num'
import timerRed from '../assets/redTimer.png'
import correctSound from '../assets/correct.mp3';

class GameIndividual2 extends Component {
  state = {
    number1: 0,
    number2: 0,
    answers: [],
    person: "",
    NOTrue: 0,
    timer: 25,
    isClick: false,
    showPopup: false,
    answered: [2, 2, 2, 2, 2, 2, 2, 2, 2],
    voice: false,
    tryAgainVoice: false,
    showCongratePopup: false,
    classKora: '',
    plusTime: false,
    deleteAnswer: false,
    showTable: false,
    correctSound: false,
    openTable: false,
    NOQuestion: 1,
    correctSound: false,
    again: false
  }
  plusTime = () => {
    this.setState((state) => ({ timer: state.timer + 10, plusTime: true }))

  }
  showTable = () => {
    this.setState((state) => ({ showTable: true, openTable: true }))
  }
  deleteAnswer = () => {
    const { answers } = this.state;
    if (answers[0].style === 'incorrect') {
      this.setState({ answers: answers.filter((el, index) => index !== 0), deleteAnswer: true })
    } else {
      this.setState({ answers: answers.filter((el, index) => index !== 1), deleteAnswer: true })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if ((prevState.timer === this.state.timer)) {
      const { NOQuestion, NOTrue, isClick, showCongratePopup, showPopup } = this.state;
      const { level } = this.props.user_info
      if (level !== 4) {
        if (NOQuestion === 10) {
          if (NOTrue >= 5 && !showCongratePopup) {
            this.setState({ showCongratePopup: true, NOQuestion: 1, NOTrue: 0, voice: true, again: false })
            this.props.updateUser({ ...this.props.user_info, level: this.props.user_info.level + 1 })
          } else if (NOTrue < 5 && !showPopup) {
            this.setState({ showPopup: true, NOQuestion: 1, NOTrue: 0, tryAgainVoice: true, again: false })
          }
        } else if (isClick && NOQuestion < 10) {

          setTimeout(() => {
            this.setState({ isClick: false, classKora: '', correctSound: false })
            const { level } = this.props.user_info
            let questions = shortTable[level];
            let number1 = questions[NOQuestion - 1][0]
            let number2 = questions[NOQuestion - 1][1]
            let answers = [{ answer: number1 * number2, style: "correct" },
            { answer: (number1 * number2) + 2, style: "incorrect" },
            { answer: (number1 * number2) + 3, style: "incorrect" }];
            answers = shuffle(answers)
            answers = convert(answers)
            this.setState({ number1, number2, answers })
          }, 2000);
        }
      } else {
        this.props.history.push(`/congrat-individ`);
      }
    }
  }
  componentDidMount() {
    const { level } = this.props.user_info
    let questions = shortTable[level];
    let number1 = questions[0][0]
    let number2 = questions[0][1]
    let answers = [{ answer: number1 * number2, style: "correct" },
    { answer: (number1 * number2) + 2, style: "incorrect" },
    { answer: (number1 * number2) + 3, style: "incorrect" }];
    answers = shuffle(answers)
    answers = convert(answers)
    this.setState({ number1, number2, answers })
    setInterval(() => {
      this.setState((state) => ({ timer: state.timer - 1 }))
      if (this.state.timer == 0) {
        if (this.state.NOTrue > 5) {
          this.setState({ showCongratePopup: true })
        } else {
          this.setState({ showPopup: true })
        }
      }
    }, 1000)
  }
  selectAnswer = (el) => {
    const { id } = el.currentTarget
    // console.log(el.currentTarget.className,'***');
    this.setState({ classKora: `${el.currentTarget.className}-f` })
    const { number2, number1, NOQuestion, NOTrue, answered } = this.state;
    this.setState({ isClick: true })
    if (number2 * number1 == id) {
      let answer = answered.map((el, index) => {
        if (NOQuestion == index + 1) el = 1;
        return el
      })
      this.setState({ NOQuestion: NOQuestion + 1, NOTrue: NOTrue + 1, answered: answer, correctSound: true })
    } else {
      let answer = answered.map((el, index) => {
        if (NOQuestion == index + 1) el = 0;
        return el
      })
      this.setState({ NOQuestion: NOQuestion + 1, answered: answer })
    }

  }
  closePopUp = () => {
    const { level } = this.props.user_info
    let questions = shortTable[level];
    let number1 = questions[0][0]
    let number2 = questions[0][1]
    let answers = [{ answer: number1 * number2, style: "correct" },
    { answer: (number1 * number2) + 2, style: "incorrect" },
    { answer: (number1 * number2) + 3, style: "incorrect" }];
    answers = shuffle(answers)
    answers = convert(answers)
    // this.setState({ number1, number2, answers })
    this.setState({
      showCongratePopup: false,
      answered: [2, 2, 2, 2, 2, 2, 2, 2, 2],
      deleteAnswer: false,
      showTable: false,
      NOQuestion: 1,
      timer: 15,
      // again: true,
      // isClick: true,
      openTable: false,
      number1, number2, answers,
      showPopup: false, voice: false, tryAgainVoice: false
    })
    // console.log(this.state.NOQuestion, '*****');

  }
  render() {
    const { number1, number2, answers, showPopup, showCongratePopup, voice, tryAgainVoice, answered } = this.state;
    const { level } = this.props.user_info
    return (
      <React.Fragment>
        {this.state.correctSound && <audio autoPlay src={correctSound} />}
        <PopUpCongrat showPopup={showCongratePopup} onClick={this.closePopUp} />
        <Sound voice={voice} />
        <TryAgainSound TryAgainVoice={tryAgainVoice} />
        <PopUpLose showPopup={showPopup} onClick={this.closePopUp} />
        <div className={showPopup || showCongratePopup ? "gameScreen popupBlur" : "gameScreen"}>
          <div className="headerGameIndivid">
            <img src={titleImg} alt="title" className="titleImageInd" />
          </div>
          <div className="counterWithHelp">
            <div className="counterNew">
              <img src={counter} title="sdd" alt="dd" className="counter" />
              <p className="counterParagGameInd"> {arabic_num[level]}</p>
            </div>
            <div className="helpingDiv">

              <div className="helpingTitle">
                <img src={helping2} alt="" className="helpingTitleImg" />
              </div>

              <div className="helpingContent">
                <img src={helping} alt="" className="helpingImg" />
                <div className="choices">
                  {this.state.deleteAnswer ?
                    <img src={deleteAnswer2} alt="" className="deleteAnswer2" /> :
                    <img src={deleteTableG} alt="" className="deleteAnswer2" onClick={this.deleteAnswer} />}
                  {this.state.showTable ? <img src={showTableB} alt="" className="deleteAnswer2" /> :
                    <img src={showTableG} alt="" className="deleteAnswer2" onClick={this.showTable} />}
                  {this.state.plusTime ? <img src={plusTimeB} alt="" className="deleteAnswer2" /> :
                    <img src={plusTimeG} alt="" className="deleteAnswer2" onClick={this.plusTime} />}
                </div>
              </div>
            </div>
          </div>
          <div className="quesDiv">
            <img src={questions} alt="title" className="titleImageInd" />
            <p className="questionStatement">{`${arabic_num[number1]} × ${arabic_num[number2]}`}</p>
          </div>

          <img src={haresBlue} alt="hares" className="hares" />

          <div className="answers">
            {answers.map((el, index) =>
              <button className={!this.state.isClick ? `answer${index + 1}` : `answer${index + 1} ${el.style}`} id={el.answer} onClick={this.selectAnswer}>
                {el.arabic_answer}
              </button>
            )}
          </div>

          <img src={koraImg} alt="kora" edt className="koraImg" className={`koraImg ${this.state.classKora}`} />
          <img src={player} alt="kora" edt className="playerImg" className="playerImg" />

          <div className="bottomHead">
            <div className="subHeader33Game">
              <img
                src={frame}
                title="ti"
                alt="dss"
                className="selectedImageFrame33"
              />
              <img src={person(this.props.user_info.person)} title="sdd" alt="dd" className="selectedImage33" />
            </div>
            <div className="subHeader4Game">
              {this.state.timer < 10 ? <img src={timerRed} alt="" className="timer" /> : <img src={timer} alt="" className="timer" />}
              <p className="timerP"> {convertT(this.state.timer)}</p>
            </div>
          </div>
          <div className="koras">
            {answered.map((el) => {
              if (el == 2) return <img src={koraBlack} alt="" className="KorasImg" />
              if (el == 1) return <img src={koraGreen} alt="" className="KorasImg" />
              if (el == 0) return <img src={koraRed} alt="" className="KorasImg" />
            })}
          </div>


        </div>
      </React.Fragment>
    );
  }
};

const mapDispatchToProps = { updateUser };
const mapStateToProps = state => ({
  user_info: state.user.info,
  users: state.user.users,
  isLoggedIn: state.user.isLoggedIn,
  open: state.dialog.open,
  come_from: state.dialog.come_from,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameIndividual2);
