import React, { Component } from 'react';
import { connect } from 'react-redux';

import koraImg from '../assets/kora.png';
import person from '../assets/1.png';
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
class GameIndividual extends Component {
  // const GameIndividual = () => {
  // state = { addClass: false };

  // toggle() {
  //   console.log('hhh');
  //   this.setState({ addClass: true });
  // }
  state = {
    number1: 0,
    number2: 0,
    answer: [],
    NOTrue: 0,
    NOQuestion: 0, //when on Click it must be +1 when become 6 appear popup
  }
  // did upfate for changing level next props !== next state
  componentDidUpdate(){
    const { NOQuestion,NOTrue } = this.state;
    if (NOQuestion === 6) {
      if (NOTrue >= 3) {
        //popup sucess
        // chamge level to +1
      }else{
        //popup again game
      }
    }
  }
  componentDidMount() {
    const { score, level } = this.props.user_info
    switch (level) {
      case 1:
        this.setState({
          number1: Math.floor(Math.random() * 3), number2: Math.floor(Math.random() * 12) + 1
        })
        break;
      case 2:
        this.setState({
          number1: Math.floor(Math.random() * 6) + 4, number2: Math.floor(Math.random() * 12)
        })
        break;
      case 3:
        this.setState({
          number1: Math.floor(Math.random() * 9) + 7, number2: Math.floor(Math.random() * 12)
        })
        break;
      case 4:
        this.setState({
          number1: Math.floor(Math.random() * 12) + 10, number2: Math.floor(Math.random() * 12)
        })
        break;
      default:
      // code block
    }
  }
  render() {
    // const answers = ['answer1'];
    // if (this.state.addClass) {
    //   answers.push('green');
    // }

    const { number1, number2 } = this.state;
    var answers = []
    if (number1 || number2) {
      answers.push(this.state.number1 * this.state.number2)
      while (answers.length !== 3) {
        let randomly = ((this.state.number1 * this.state.number2) + Math.floor(Math.random() * 12))
        if (!answers.includes(randomly)) {
          answers.push(randomly)
        }
      }
      answers = shuffle(answers);
    }
    console.log({ answers });
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
          {answers.map((el,index)=> 
          <div className={`answer${index+1}`}>
            <p>{el}</p>
          </div>
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
          <img src={person} title="sdd" alt="dd" className="selectedImage33" />
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
