import React, { Component } from 'react';
import { connect } from 'react-redux';

import koraImg from '../assets/kora.png';
// import person from '../assets/1.png';
import { person } from './playersImage';
import frame from '../assets/frame.png';
import hares from '../assets/hares.png';
import titleImg from '../assets/tit.png';
import questions from '../assets/questions.png';
import counter from '../assets/counter.png';
import player from '../assets/player.png';
import './GameIndividual.css';

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
      if (!answers.every((el)=>el.answer === randomly.answer)) {
        answers.push(randomly)
      }
    }
    answers = shuffle(answers)
  }
  return { number1, number2, answers }
}
class GameIndividual extends Component {
  state = {
    number1: 0,
    number2: 0,
    answers: [],
    person: "",
    NOTrue: 0,
    isClick: false,
    NOQuestion: 0, //when on Click it must be +1 when become 6 appear popup
  }
  // did upfate for changing level next props !== next state
  componentDidUpdate() {
    const { NOQuestion, NOTrue, isClick } = this.state;
    if (NOQuestion === 6) {
      if (NOTrue >= 3) {
        //popup sucess
        // chamge level to +1
      } else {
        //popup again game
      }
    }
    if (isClick) {
      setTimeout(async () => {
        this.setState({ isClick: false })
        const { number1, number2, answers } = questionsAndAnswers(this.props.user_info.level);
        this.setState({ number1, number2, answers })
      }, 2000);
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
  render() {
    const { number1, number2, answers } = this.state;
    return (
      <div className="gameScreen">
        <div className="header">
          <img src={titleImg} alt="title" className="titleImage" />
          <div className="quesDiv">
            <img src={questions} alt="title" className="titleImage" />
            <input type="text" className="questionStatement" value={`${number1} * ${number2}`} />
          </div>
        </div>
        <img src={hares} alt="hares" className="hares" />

        <div className="answers">
          {answers.map((el, index) =>
            <button className={!this.state.isClick ? `answer${index + 1}` : `answer${index + 1} ${el.style}`} id={el.answer} onClick={this.selectAnswer}>
              {el.answer}
            </button>
          )}
        </div>
        <img src={koraImg} alt="kora" edt className="koraImg" />
        <img src={player} alt="kora" edt className="playerImg" />

        <div className="subHeader33">
          <img
            src={frame}
            title="ti"
            alt="dss"
            className="selectedImageFrame33"
          />
          <img src={person(this.props.user_info.person)} title="sdd" alt="dd" className="selectedImage33" />
        </div>
        <div className="subHeader4">
          <img src={counter} title="sdd" alt="dd" className="counter" />
          <p className="counterParag">33</p>
        </div>
      </div>
    );
  }
};

// const mapDispatchToProps = { getUsers, openDialog, closeDialog, updateUser };
const mapStateToProps = state => ({
  user_info: state.user.info,
  users: state.user.users,
  isLoggedIn: state.user.isLoggedIn,
  open: state.dialog.open,
  come_from: state.dialog.come_from,
});
export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(GameIndividual);
