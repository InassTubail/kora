import React, { Component } from 'react';
import koraImg from '../assets/kora.png';
import person from '../assets/1.png';
import frame from '../assets/frame.png';
import hares from '../assets/hares.png';
import titleImg from '../assets/tit.png';
import questions from '../assets/questions.png';
import counter from '../assets/counter.png';
import player from '../assets/player.png';

import './GameIndividual.css';

// class GameIndividual extends Component {
const GameIndividual = () => {
  // state = { addClass: false };

  // toggle() {
  //   console.log('hhh');
  //   this.setState({ addClass: true });
  // }

  // render() {
  // const answers = ['answer1'];
  // if (this.state.addClass) {
  //   answers.push('green');
  // }

  return (
    <div className="gameScreen">
      <div className="header">
        <img src={titleImg} alt="title" className="titleImage" />
        <div className="quesDiv">
          <img src={questions} alt="title" className="titleImage" />
          <input type="text" className="questionStatement" />
        </div>
      </div>
      <img src={hares} alt="hares" className="hares" />

      <div className="answers">
        <div className="answer1">
          <p>66</p>
        </div>
        {/* <div className={answers.join(' ')} onClick={this.toggle}></div> */}
        <div className="answer2">
          {' '}
          <p>66</p>
        </div>
        <div className="answer3">
          {' '}
          <p>66</p>
        </div>
      </div>
      <img src={koraImg} alt="kora" edt className="koraImg" />
      <img src={player} alt="kora" edt className="playerImg" />

      <div className="subHeader3">
        <img src={frame} title="ti" alt="dss" className="selectedImageFrame3" />
        <img src={person} title="sdd" alt="dd" className="selectedImage3" />
      </div>
      <div className="subHeader4">
        <img src={counter} title="sdd" alt="dd" className="counter" />
        <p className="counterParag">33</p>
      </div>
    </div>
  );
  // }
};
export default GameIndividual;
