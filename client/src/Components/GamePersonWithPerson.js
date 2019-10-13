import React, { Component } from 'react';
import { connect } from 'react-redux';

import koraImg from '../assets/kora.png';
// import person from '../assets/1.png';
import { person } from './playersImage';
import frame from '../assets/frame.png';
import hares from '../assets/hares.png';
import titleImg from '../assets/tit.png';
import questions from '../assets/questions.png';
import counterRed from '../assets/counterRed.png';
import counterBlue from '../assets/counterBlue.png';

import player from '../assets/player.png';
import PopUpCongrat from './popUpCongrat';
import PopUpLose from './popUpLose';
import { updateUser } from '../store/actions';
import './GamePersonWithPerson.css';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function questionsAndAnswers(level) {
  var number1, number2, answers = [];
  switch (level) {
    case 1:
      number1 = Math.floor(Math.random() * 3)
      number2 = Math.floor(Math.random() * 12) + 1
      break;
    case 2:
      number1 = Math.floor(Math.random() * 6) + 4
      number2 = Math.floor(Math.random() * 12)
      break;
    case 3:
      number1 = Math.floor(Math.random() * 9) + 7;
      number2 = Math.floor(Math.random() * 12)
      break;
    case 4:
      number1 = Math.floor(Math.random() * 12) + 10;
      number2 = Math.floor(Math.random() * 12)
      break;
    default:
  }
  if (number1 || number2) {
    answers.push({ answer: number1 * number2, style: "correct" })
    while (answers.length !== 3) {
      let randomly = ({ answer: (number1 * number2) + Math.floor(Math.random() * 12), style: "incorrect" })
      if (!answers.every((el) => el.answer === randomly.answer)) {
        answers.push(randomly)
      }
    }
    answers = shuffle(answers)
  }
  return { number1, number2, answers }
}
class GamePersonWithPerson extends Component {
  state = {
    number1: 0,
    number2: 0,
    answers: [],
    person: "",
    NOTrue: 0,
    isClick: false,
    showPopup: false,
    showCongratePopup: false,
    NOQuestion: 0, //when on Click it must be +1 when become 6 appear popup
  }
  componentDidUpdate() {
    const { NOQuestion, NOTrue, isClick, showCongratePopup, showPopup } = this.state;
    const { level } = this.props.user_info
    if (level !== 4) {
      if (NOQuestion === 6) {
        if (NOTrue >= 3 && !showCongratePopup) {
          this.setState({ showCongratePopup: true, NOQuestion: 0, NOTrue: 0 })
          this.props.updateUser({ ...this.props.user_info, level: this.props.user_info.level + 1 })
        } else if (NOTrue < 3 && !showPopup) {
          this.setState({ showPopup: true, NOQuestion: 0, NOTrue: 0 })
        }
      }
      if (isClick) {
        setTimeout(async () => {
          this.setState({ isClick: false })
          const { number1, number2, answers } = questionsAndAnswers(this.props.user_info.level);
          this.setState({ number1, number2, answers })
        }, 2000);
      }
    } else {
      this.props.history.push(`/congrat-individ`);
    }
  }
  componentDidMount() {
    const { number1, number2, answers } = questionsAndAnswers(this.props.user_info.level);
    this.setState({ number1, number2, answers })

  }
  selectAnswer = (el) => {
    const { id } = el.currentTarget
    const { number2, number1, NOQuestion, NOTrue } = this.state;
    this.setState({ isClick: true })
    if (number2 * number1 == id) {
      this.setState({ NOQuestion: NOQuestion + 1, NOTrue: NOTrue + 1 })
    } else {
      this.setState({ NOQuestion: NOQuestion + 1 })
    }
  }
  closePopUp = () => {
    this.setState({ showCongratePopup: false, showPopup: false })
  }
  render() {
    const { number1, number2, answers, showPopup, showCongratePopup } = this.state;
    return (
      <React.Fragment>
        <PopUpCongrat showPopup={showCongratePopup} onClick={this.closePopUp} />
        <PopUpLose showPopup={showPopup} onClick={this.closePopUp} />
        <div className={showPopup || showCongratePopup ? "gameScreen2 popupBlur" : "gameScreen2"}>
          <div className="header2">
          <div>
            <img src={titleImg} alt="title" className="titleImage2" />
            </div>

            <div className="quesDiv2">
              <img src={questions} alt="title" className="titleImage2" />
              <p  className="questionStatement2">{`${number1} * ${number2}`}</p>
            </div>
          </div>
          <img src={hares} alt="hares" className="hares2" />

          <div className="answers2">
            {answers.map((el, index) =>
              <button className={!this.state.isClick ? `answer${index + 1}` : `answer${index + 1} ${el.style}`} id={el.answer} onClick={this.selectAnswer}>
                {el.answer}
              </button>
            )}
          </div>
          <img src={koraImg} alt="kora" edt className="koraImg2" />
          <img src={player} alt="kora" edt className="playerImg2" />


       <div className="subHeadersGroup">
          <div className="subHeader332">
            <img
              src={frame}
              title="ti"
              alt="dss"
              className="selectedImageFrame332"
            />
            <img src={person(this.props.user_info.person)} title="sdd" alt="dsdd" className="selectedImage332" />
            <div className="blueColor"><p>اسم اللاعب</p></div>

          </div>

           <div className="subHeader3321">
            <img
              src={frame}
              title="ti"
              alt="dss"
              className="selectedImageFrame332"
            />
            <img src={person(this.props.user_info.person)} title="sdd" alt="dd" className="selectedImage332" />
            <div className="redColor"><p>اسم اللاعب</p></div>
          </div>
          </div>

          <div className="subHeader42">

          <div >
          <img src={counterBlue} title="sdd" alt="dd" className="counter2" />
            <p className="counterParag2">{this.props.user_info.level} / 4</p>
          </div>

          <div>
          <img src={counterRed} title="sdd" alt="dd" className="counter2" />
            <p className="counterParag2">{this.props.user_info.level} / 4</p>
          </div>
           
            {/* --- */}
            {/* <p className="counterParag">{this.props.user_info.level}</p> */}
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
)(GamePersonWithPerson);
