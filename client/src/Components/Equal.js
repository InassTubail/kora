import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mabrouk from '../assets/equal.png';
import mabroukCongrate from '../assets/mabrouk.png';
// import person from '../assets/1.png';
import frame from '../assets/frame.png';
import playAgain from '../assets/playAgain.png';
import vs from '../assets/VS.png'
import { connect } from 'react-redux';
import { updateGame } from '../store/actions';
import { person } from './playersImage';
import clup from '../assets/clup.mp3'
import socket from '../utils/api';
import { groupGame } from '../utils/questionAndAnswer';
import { arabic_num, convert, convertT } from '../utils/arabic_num'
import { type_index } from '../utils/customPlay'
// import clup from '../assets/clup.mp3'
import cup from '../assets/cup.png'

import './Congrat.css';
import './Equal.css';

class Equal extends Component {
  state = {
    redTime: 0,
    blueTime: 0,
    replay: false
  }
  componentDidMount() {
    const { room } = this.props.user_info
    const { timer } = this.props.play
    if (timer.length === 0) {
      this.setState({ replay: true })
      setTimeout(() => {
        if (this.props.play.isMyRole) {
          this.props.updateGame({ ...this.props.play, numberOfQuestion: 0, blueScore: 0, redScore: 0, number1: 0, number2: 0, answers: [] })
          let { number1, number2, answers, filterdQuestions } = groupGame(type_index[this.props.play.indexOfQuestion]);
          answers = convert(answers)
          let data = {
            number1, number2, answers, currentPlayer: JSON.parse(room)[0],
            result: false, questions: filterdQuestions, fromEqual: true
          }
          socket.emit('startGame', { room, data }, this.props.play.roomName)
        }
      }, 10000);
    } else {
      let redTime = 0, blueTime = 0
      timer.forEach(element => {
        if (element.isTrue) {
          if (element.currentPlayerColor == 'red') {
            redTime = redTime + element.time
          }
          if (element.currentPlayerColor == 'blue') {
            blueTime = blueTime + element.time
          }
        }
      });
      this.setState({ redTime, blueTime })
    }
  }

  render() {
    let result, winTeam;
    let { blueTime, redTime } = this.state
    const { redTeam, blueTeam } = this.props.play;

    if (blueTime == redTime) {
      result = 'equal';
    } else if (blueTime > redTime) {
      result = 'congrat';
      winTeam = blueTeam
    } else if (blueTime < redTime) {
      result = 'congrat';
      winTeam = redTeam
    }
    return result === 'equal' ?
      (
        <React.Fragment>
          <div className="equalDiv">
            <audio autoPlay src={clup} />

            <div className="equalTitleDiv">
              <img src={mabrouk} alt="" className="congratTitleImg" />
            </div>
            <div className="congratPlayerImage">
              {this.props.play.blueTeam.map((el, index) =>
                <div className="playersImagesEqual">
                  <img
                    src={frame}
                    title="ti"
                    alt="dss"
                    className="selectedImageFrameCongrat"
                  />
                  <img src={person(el.person)} title="sdd" alt="dd"
                    className={`selectedImageCongratEqual  playerEqual${index} `}
                  />
                  <p className="winnerPlayerEqual">{el.username}</p>
                </div>
              )}
            </div>

            <div className="vsEqual">
              <img src={vs} alt="vs" className="vsEqualImg" /></div>

            <div className="congratPlayerImage">
              {this.props.play.redTeam.map((el, index) =>
                <div className="playersImagesEqual">
                  <img
                    src={frame}
                    title="ti"
                    alt="dss"
                    className="selectedImageFrameCongrat"
                  />
                  <img src={person(el.person)} title="sdd" alt="dd" className={`selectedImageCongratEqual  playerEqual${index} `} />
                  <p className="winnerPlayerEqual">{el.username}</p>
                </div>
              )}

            </div>
            <div className="playAgainCongrat">
              {!this.state.replay ? <Link onClick={this.replay}>
                <img src={playAgain} alt="playAgainCongratImg" className="playAgainEqualImg" />
              </Link> :
                <p className="playAgainWait">
                  شارك في التحدي الأخير ,,, اللاعب الأسرع هو الرابح
           <br />
                  انتظر 10 ثواني
          </p>

              }
            </div>
          </div>
        </React.Fragment>
      ) :
      (
        <React.Fragment>
          <div className="congratDiv">
            <audio autoPlay src={clup} />

            <div className="congratTitleDiv">
              <img src={mabroukCongrate} alt="" className="congratTitleImg" />
            </div>
            <div className="congratPlayerImage">
              {winTeam.map((el, index) =>
                <div className="playersImagesCongrat">
                  <img
                    src={frame}
                    title="ti"
                    alt="dss"
                    className="selectedImageFrameCongrat"
                  />
                  <img
                    src={person(el.person)}
                    title="sdd" alt="dd" className={`selectedImageCongrat  playerG${index} `} />
                  <p className="winnerPlayerCongrat">{el.username}</p>
                </div>
              )}

            </div>
            <div className="congratCup">
              <img src={cup} alt="" className="cup" />
            </div>
            <div className="playAgainCongrat">
              <Link onClick={this.replay}>
                <img src={playAgain} alt="playAgainCongratImg" className="playAgainCongratImg" />
              </Link>
            </div>
          </div>

          {/* </div> */}
        </React.Fragment>
      );
  }
};

const mapDispatchToProps = { updateGame };
const mapStateToProps = state => ({
  user_info: state.user.info,
  play: state.user.play
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Equal);
