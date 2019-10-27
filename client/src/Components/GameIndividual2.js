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

import player from '../assets/player.png';
import PopUpCongrat from './popUpCongrat';
import PopUpLose from './popUpLose';
import { updateUser } from '../store/actions';
import { questionsAndAnswers } from '../utils/questionAndAnswer'
import './GameIndividual2.css';
import Sound from './SoundAhsant'
import TryAgainSound from './TryAgainSound'


class GameIndividual2 extends Component {
  state = {
    number1: 0,
    number2: 0,
    answers: [],
    person: "",
    NOTrue: 0,
    isClick: false,
    showPopup: false,
    voice:false,
    tryAgainVoice:false,
    showCongratePopup: false,
    classKora: '',
    NOQuestion: 0, //when on Click it must be +1 when become 6 appear popup
  }
  componentDidUpdate() {
    const { NOQuestion, NOTrue, isClick, showCongratePopup, showPopup,voice ,tryAgainVoice} = this.state;
    const { level } = this.props.user_info
    if (level !== 4) {
      if (NOQuestion === 6) {
        if (NOTrue >= 3 && !showCongratePopup) {
          this.setState({ showCongratePopup: true, NOQuestion: 0, NOTrue: 0 ,voice:true })
          this.props.updateUser({ ...this.props.user_info, level: this.props.user_info.level + 1 })
        } else if (NOTrue < 3 && !showPopup) {
          this.setState({ showPopup: true, NOQuestion: 0, NOTrue: 0,tryAgainVoice:true })
        }
      }
      if (isClick) {
        setTimeout(async () => {
          this.setState({ isClick: false })
          const { number1, number2, answers } = questionsAndAnswers(this.props.user_info.level);
          this.setState({ number1, number2, answers, classKora: "" })
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
    // console.log(el.currentTarget.className,'***');
    this.setState({ classKora: `${el.currentTarget.className}-f`  })
    const { number2, number1, NOQuestion, NOTrue } = this.state;
    this.setState({ isClick: true })
    if (number2 * number1 == id) {
      this.setState({ NOQuestion: NOQuestion + 1, NOTrue: NOTrue + 1 })
    } else {
      this.setState({ NOQuestion: NOQuestion + 1 })
    }

  }
  closePopUp = () => {
    this.setState({ showCongratePopup: false, showPopup: false ,voice:false,tryAgainVoice:false })
  }
  render() {
    const { number1, number2, answers, showPopup, showCongratePopup,voice,tryAgainVoice } = this.state;
    return (
      <React.Fragment>
        <PopUpCongrat showPopup={showCongratePopup} onClick={this.closePopUp} />
        <Sound voice={voice}/>
        <TryAgainSound TryAgainVoice={tryAgainVoice}/>
        <PopUpLose showPopup={showPopup} onClick={this.closePopUp} />
        <div className={showPopup || showCongratePopup ? "gameScreen popupBlur" : "gameScreen"}>
          <div className="headerGameIndivid">
            <img src={titleImg} alt="title" className="titleImageInd" />
          </div>

<div className="counterWithHelp">
          <div className="counterNew">   
               <img src={counter} title="sdd" alt="dd" className="counter" />
              <p className="counterParagGameInd"> 4</p> 
           </div>

         
         <div className="helpingDiv">

<div className="helpingTitle">
<img  src={helping2} alt="" className="helpingTitleImg"/>
</div>

<div className="helpingContent">
<img src={helping} alt="" className="helpingImg"/>
<div className="choices">
{/* <img src={displayTable} alt="" className="displayTable"/> */}
{/* <img src={addTime} alt="" className="AddTime"/> */}
{/* <img src={deleteAnswer2} alt="" className="deleteAnswer2"/>
<img src={deleteAnswer2} alt="" className="deleteAnswer2"/>
<img src={deleteAnswer2} alt="" className="deleteAnswer2"/> */}
</div>
</div>
</div>



</div>
          <div className="quesDiv">
              <img src={questions} alt="title" className="titleImageInd" />
              <p className="questionStatement">{`${number1} * ${number2}`}</p>
            </div>

          <img src={haresBlue} alt="hares" className="hares" />

          <div className="answers">
            {answers.map((el, index) =>
              <button className={!this.state.isClick ? `answer${index + 1}` : `answer${index + 1} ${el.style}`} id={el.answer} onClick={this.selectAnswer}>
                {el.answer}
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
            <img src={timer} alt="" className="timer"/>
          <p className="timerP"> 4</p> 

              {/* <img src={counter} title="sdd" alt="dd" className="counter" />
              <p className="counterParagGameInd">{this.props.user_info.level} / 4</p> */}
             
            </div>
          </div>
          <div className="koras">
             <img src={koraGreen} alt="" className="KorasImg"/>
             <img src={koraGreen} alt="" className="KorasImg"/>
             <img src={koraGreen} alt="" className="KorasImg"/>
             <img src={koraGreen} alt="" className="KorasImg"/>
             <img src={koraGreen} alt="" className="KorasImg"/>
             <img src={koraGreen} alt="" className="KorasImg"/>
             <img src={koraGreen} alt="" className="KorasImg"/>
             <img src={koraGreen} alt="" className="KorasImg"/>
             <img src={koraGreen} alt="" className="KorasImg"/>
             <img src={koraGreen} alt="" className="KorasImg"/>
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
