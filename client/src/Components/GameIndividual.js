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
import player from '../assets/player.png';
import PopUpCongrat from './popUpCongrat';
import PopUpLose from './popUpLose';
import { updateUser } from '../store/actions';
import { questionsAndAnswers } from '../utils/questionAndAnswer'
import './GameIndividual.css';

class GameIndividual extends Component {
  state = {
    number1: 0,
    number2: 0,
    answers: [],
    person: "",
    NOTrue: 0,
    isClick: false,
    showPopup: false,
    showCongratePopup: false,
    classKora: '',
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
    this.setState({ showCongratePopup: false, showPopup: false })
  }
  render() {
    const { number1, number2, answers, showPopup, showCongratePopup } = this.state;
    return (
      <React.Fragment>
        <PopUpCongrat showPopup={showCongratePopup} onClick={this.closePopUp} />
        <PopUpLose showPopup={showPopup} onClick={this.closePopUp} />
        <div className={showPopup || showCongratePopup ? "gameScreen popupBlur" : "gameScreen"}>
          <div className="headerGameIndivid">
            <img src={titleImg} alt="title" className="titleImage" />
            <div className="quesDiv">
              <img src={questions} alt="title" className="titleImage" />
              <p className="questionStatement">{`${number1} * ${number2}`}</p>
            </div>
          </div>
          <img src={haresBlue} alt="hares" className="hares" />

          <div className="answers">
            {answers.map((el, index) =>
              <button className={!this.state.isClick ? `answer${index + 1}` : `answer${index + 1} ${el.style}`} id={el.answer} onClick={this.selectAnswer}>
                {el.answer}
              </button>
            )}
          </div>
          <img src={koraImg} alt="kora" edt className="koraImg" className={this.state.classKora} />
          <img src={player} alt="kora" edt className="playerImg" />

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
              <img src={counter} title="sdd" alt="dd" className="counter" />
              <p className="counterParagGameInd">{this.props.user_info.level} / 4</p>
              {/* --- */}
              {/* <p className="counterParag">{this.props.user_info.level}</p> */}
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
  users: state.user.users,
  isLoggedIn: state.user.isLoggedIn,
  open: state.dialog.open,
  come_from: state.dialog.come_from,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameIndividual);
