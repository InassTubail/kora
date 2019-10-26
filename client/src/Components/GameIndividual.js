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
import { arabic_num, convert } from '../utils/arabic_num'
import player from '../assets/player.png';
import PopUpCongrat from './popUpCongrat';
import PopUpLose from './popUpLose';
import { updateUser } from '../store/actions';
import { shuffle } from '../utils/questionAndAnswer';
import './GameIndividual.css';
import Sound from './SoundAhsant'
import TryAgainSound from './TryAgainSound'


class GameIndividual extends Component {
  state = {
    number1: 0,
    number2: 0,
    answers: [],
    person: "",
    answered: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], //1 true 0 false 2 notanswerd
    NOTrue: 0,
    isClick: false,
    showPopup: false,
    voice: false,
    tryAgainVoice: false,
    showCongratePopup: false,
    classKora: '',
    choiceNumber: [],
    timer: 50,
    allNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    NOQuestion: 0, //when on Click it must be +1 when become 6 appear popup
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.timer === this.state.timer) {
      const { NOQuestion, isClick } = this.state;
      // const { level } = this.props.user_info
      if (NOQuestion < 10) {
        if (isClick) {
          setTimeout(() => {
            this.setState({ isClick: false })
            let { id } = this.props.match.params
            const { allNumber } = this.state
            let randomC = Math.floor(Math.random() * (allNumber.length - 1)) + 0;
            let answers = [{ answer: allNumber[randomC] * id, style: "correct" }, { answer: (allNumber[randomC] * id) + 2, style: "incorrect" }, { answer: (allNumber[randomC] * id) + 3, style: "incorrect" }];
            answers = shuffle(answers)
            let all = allNumber.filter((el) => el !== allNumber[randomC])
            answers = convert(answers)
            this.setState({
              number1: allNumber[randomC], number2: id,
              answers,
              allNumber: all,
            })
          }, 2000);
        }
      } else {
        this.props.history.push(`/congrat-individ`);
      }
    }
  }
  componentDidMount() {
    let { id } = this.props.match.params
    const { allNumber } = this.state
    let randomC = Math.floor(Math.random() * 10) + 1;
    let answers = [{ answer: randomC * id, style: "correct" }, { answer: (randomC * id) + 2, style: "incorrect" }, { answer: (randomC * id) + 3, style: "incorrect" }];
    answers = shuffle(answers)
    answers = convert(answers)
    let all = allNumber.filter((el) => el !== randomC)
    this.setState({
      number1: randomC, number2: id,
      answers,
      allNumber: all,
    })
    // setInterval(() => {
    //   this.setState((state) => ({ timer: state.timer - 1 }))
    //   if (this.state.timer == 0) {
    //     this.props.history.push(`/congrat-individ`);
    //   }
    // }, 1000)
  }
  selectAnswer = (el) => {
    const { id } = el.currentTarget
    // console.log(el.currentTarget.className,'***');
    this.setState({ classKora: `${el.currentTarget.className}-f`, isClick: true })
    const { number2, number1, NOQuestion, answered } = this.state;
    if (number2 * number1 == id) {
      let answer = answered.map((el, index) => {
        if (NOQuestion == index) el = 1;
        return el
      })
      this.setState({ NOQuestion: NOQuestion + 1, answered: answer })
    } else {
      let answer = answered.map((el, index) => {
        if (NOQuestion == index) el = 0;
        return el
      })
      this.setState({ NOQuestion: NOQuestion + 1, answered: answer })
    }

  }
  closePopUp = () => {
    this.setState({ showCongratePopup: false, showPopup: false, voice: false, tryAgainVoice: false })
  }
  render() {
    const { number1, number2, answers, showPopup, showCongratePopup, voice, tryAgainVoice, answered } = this.state;
    return (
      <React.Fragment>
        <PopUpCongrat showPopup={showCongratePopup} onClick={this.closePopUp} />
        <Sound voice={voice} />
        <TryAgainSound TryAgainVoice={tryAgainVoice} />
        <PopUpLose showPopup={showPopup} onClick={this.closePopUp} />
        <div className={showPopup || showCongratePopup ? "gameScreen popupBlur" : "gameScreen"}>
          <div className="headerGameIndivid">
            <img src={titleImg} alt="title" className="titleImageInd" />
            <div className="quesDiv">
              <img src={questions} alt="title" className="titleImageInd" />
              <p className="questionStatement">{`${arabic_num[number1]} * ${arabic_num[number2]}`}</p>
            </div>
          </div>
          <img src={haresBlue} alt="hares" className="hares" />

          <div className="answers">
            {answers.map((el, index) =>
              <button className={!this.state.isClick ? `answer${index + 1}` : `answer${index + 1} ${el.style}`} id={el.answer} onClick={this.selectAnswer}>
                {/* {convert(el.answer)} */} {el.arabic_answer}
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
              <img src={timer} alt="" className="timer" />
              <p className="timerP"> {this.state.timer}</p>

              {/* <img src={counter} title="sdd" alt="dd" className="counter" />
              <p className="counterParagGameInd">{this.props.user_info.level} / 4</p> */}

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
)(GameIndividual);
