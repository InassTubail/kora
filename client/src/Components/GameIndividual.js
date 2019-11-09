import React, { Component } from 'react';
import { connect } from 'react-redux';

// import koraImg from '../assets/kora.png';
import { person } from './playersImage';
// import frame from '../assets/frame.png';
// import titleImg from '../assets/tit.png';
// import questions from '../assets/questions.png';
// import counter from '../assets/counter.png';
// import koraGreen from '../assets/koGreen.png'
// import koraRed from '../assets/koRed.png'
// import koraBlack from '../assets/koBlack.png'
// import timer from '../assets/timer.png'
import { arabic_num, convert } from '../utils/arabic_num'
// import helping from '../assets/help-tools2.png'
// import helping2 from '../assets/help-tools1.png'
// import timerRed from '../assets/redTimer.png'
import PopUpCongrat from './popUpCongrat';
import PopUpLose from './popUpLose';
import { updateUser } from '../store/actions';
import { shuffle } from '../utils/questionAndAnswer';
import './GameIndividual.css';
import Sound from './SoundAhsant'
import TryAgainSound from './TryAgainSound'
// import showTableB from '../assets/showTableB.png'
// import showTableG from '../assets/showTableG.png'
// import plusTimeB from '../assets/plusTimeB.png'
// import plusTimeG from '../assets/plusTimeG.png'
import correctSound from '../assets/correct.mp3';
import ShowTab from './showTables';

let iniaistate = {
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
  plusTime: false,
  deleteAnswer: false,
  showTable: false,
  correctSound: false,
  openTable: false
}
class GameIndividual extends Component {
  state = { ...iniaistate }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.timer === this.state.timer) {
      const { NOQuestion, isClick } = this.state;
      // const { level } = this.props.user_info
      if (NOQuestion < 10) {
        if (isClick) {
          setTimeout(() => {
            this.setState({ isClick: false, classKora: '', correctSound: false })
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
        if (this.state.NOTrue >= 6 && !this.state.showCongratePopup) {
          this.setState({ showCongratePopup: true })
        } else if (this.state.NOTrue < 6 && !this.state.showPopup) {
          this.setState({ showPopup: true ,tryAgainVoice:true })
        }
        // this.props.history.push(`/congrat-individ`);
      }
    }
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
    setInterval(() => {
      this.setState((state) => ({ timer: state.timer - 1 }))
      if (this.state.timer == 0) {
        if (this.state.NOTrue > 6) {
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
    this.setState({ classKora: `${el.currentTarget.className}-f`, isClick: true })
    const { number2, number1, NOQuestion, answered } = this.state;
    if (number2 * number1 == id) {
      let answer = answered.map((el, index) => {
        if (NOQuestion == index) el = 1;
        return el
      })
      this.setState({ NOQuestion: NOQuestion + 1, answered: answer, NOTrue: this.state.NOTrue + 1, correctSound: true })
    } else {
      let answer = answered.map((el, index) => {
        if (NOQuestion == index) el = 0;
        return el
      })
      this.setState({ NOQuestion: NOQuestion + 1, answered: answer })
    }

  }
  closePopUp = () => {
    let { id } = this.props.match.params
    this.setState({ ...iniaistate })
    if (this.state.NOTrue >= 6) {
      this.props.history.push(`/tables`);
    } else {
      // this.props.history.push(`/tables/${id}`);
      // const { allNumber } = this.state
      let allNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
    }
    // this.setState({ showCongratePopup: false, showPopup: false, voice: false, tryAgainVoice: false })
  }
  closee = () => {
    this.setState({ openTable: false })
  }
  render() {
    let { id } = this.props.match.params
    const { number1, number2, answers, showPopup, showCongratePopup, voice, tryAgainVoice, answered } = this.state;
    return (
      <React.Fragment>
        {this.state.showTable && this.state.openTable && <ShowTab id={id} close={this.closee} />}
        {this.state.correctSound && <audio autoPlay src={correctSound} />}
        <PopUpCongrat showPopup={showCongratePopup} onClick={this.closePopUp} />
        <PopUpLose showPopup={showPopup} onClick={this.closePopUp} />
        <Sound voice={voice} />
        <TryAgainSound TryAgainVoice={tryAgainVoice} />
        <div className={showPopup || showCongratePopup ? "gameScreen popupBlur" : "gameScreen"}>
          <div className="headerGameIndivid">
            <img src={'https://user-images.githubusercontent.com/30287981/68534485-bb63f500-033d-11ea-8fbc-9c35c2c1c26d.png'} alt="title" className="titleImageInd" />
          </div>
          <div className="counterWithHelp">
            <div className="counterNew">
              {/* <img src={counter} title="sdd" alt="dd" className="counter" />
              <p className="counterParagGameInd"> 4</p>  */}
            </div>
            <div className="helpingDiv">
              <div className="helpingTitle">
                <img src={'https://user-images.githubusercontent.com/30287981/68534136-89509400-0339-11ea-9f6a-977425586624.png'} alt="" className="helpingTitleImg" />
              </div>
              <div className="helpingContent">
                <img src={'https://user-images.githubusercontent.com/30287981/68534146-adac7080-0339-11ea-90b7-fa5c4df7e48e.png'} alt="" className="helpingImg" />
                <div className="choices">
                  {this.state.deleteAnswer ?
                    <img src={'https://user-images.githubusercontent.com/30325727/68527977-fb06ee80-02f5-11ea-9fec-4210c3bcfce6.png'} alt="" className="deleteAnswer2" /> :
                    <img src={'https://user-images.githubusercontent.com/30325727/68527975-f17d8680-02f5-11ea-95d8-af067eb2ff73.png'} alt="" className="deleteAnswer2" onClick={this.deleteAnswer} />}
                  {this.state.showTable ? <img src={'https://user-images.githubusercontent.com/30287981/68534363-62e02800-033c-11ea-8c47-c8e25ada4869.png'} alt="" className="deleteAnswer2" /> :
                    <img src={'https://user-images.githubusercontent.com/30287981/68534382-a9ce1d80-033c-11ea-9de1-6ef125810eac.png'} alt="" className="deleteAnswer2" onClick={this.showTable} />}
                  {this.state.plusTime ? <img src={'https://user-images.githubusercontent.com/30287981/68534289-80f95880-033b-11ea-8d62-c2a59a2fec23.png'} alt="" className="deleteAnswer2" /> :
                    <img src={'https://user-images.githubusercontent.com/30287981/68534292-822a8580-033b-11ea-8097-4c4cc0017b57.png'} alt="" className="deleteAnswer2" onClick={this.plusTime} />}
                </div>
              </div>
            </div>
          </div>
          <div className="quesDiv">
            <img src={'https://user-images.githubusercontent.com/30287981/68534308-b56d1480-033b-11ea-9af3-9b8c5affe604.png'} alt="title" className="titleImageInd" />
            <p className="questionStatement">{`${arabic_num[number1]} × ${arabic_num[number2]}`}</p>
          </div>

          <img src={'https://user-images.githubusercontent.com/30325727/68527970-ec203c00-02f5-11ea-8636-a1b3893e5e7b.png'} alt="hares" className="hares" />

          <div className="answers">
            {answers.map((el, index) =>
              <button className={!this.state.isClick ? `answer${index + 1}` : `answer${index + 1} ${el.style}`} id={el.answer} onClick={this.selectAnswer}>
                {el.arabic_answer}
              </button>
            )}
          </div>

          <img src={'https://user-images.githubusercontent.com/30287981/68534189-05e37280-033a-11ea-9293-e877ff99f10c.png'} alt="kora" edt className="koraImg" className={`koraImg ${this.state.classKora}`} />
          <img src={'https://user-images.githubusercontent.com/30325727/68528142-774e0180-02f7-11ea-8ec0-fa2acc7d62ed.png'} alt="kora" edt className="playerImg" className="playerImg" />

          <div className="bottomHead">
            <div className="subHeader33Game">
              <img
                src={'https://user-images.githubusercontent.com/30287981/68534044-d2ecaf00-0338-11ea-8523-8bf353a3359a.png'}
                title="ti"
                alt="dss"
                className="selectedImageFrame33"
              />
              <img src={person(this.props.user_info.person)} title="sdd" alt="dd" className="selectedImage33" />
            </div>
            <div className="subHeader4Game">
              {this.state.timer < 10 ? <img src={'https://user-images.githubusercontent.com/30287981/68534362-5e1b7400-033c-11ea-9bcf-7d570c3f9a19.png'} alt="" className="timer" /> : <img src={'https://user-images.githubusercontent.com/30287981/68534404-f1ed4000-033c-11ea-8d8c-5bc9750ca951.png'} alt="" className="timer" />}
              <p className="timerP"> {this.state.timer}</p>
            </div>
          </div>
          <div className="koras">
            {answered.map((el) => {
              if (el == 2) return <img src={'https://user-images.githubusercontent.com/30287981/68534187-024feb80-033a-11ea-8183-c43af8ef2ca1.png'} alt="" className="KorasImg" />
              if (el == 1) return <img src={'https://user-images.githubusercontent.com/30287981/68534188-0419af00-033a-11ea-8e62-dce1de6dd54c.png'} alt="" className="KorasImg" />
              if (el == 0) return <img src={'https://user-images.githubusercontent.com/30287981/68534192-07ad3600-033a-11ea-89c9-f82c2baf5f2d.png'} alt="" className="KorasImg" />
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
