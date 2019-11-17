import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateGame, replay_Game } from '../store/actions';
import { person } from './playersImage';
import clup from '../assets/clup.mp3'
import socket from '../utils/api';
import { groupEqual } from '../utils/questionAndAnswer';
import { arabic_num, convert, convertT } from '../utils/arabic_num'
import { type_index } from '../utils/customPlay'

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
    this.props.updateGame({ ...this.props.play, numberOfQuestion: 0, blueScore: 0, redScore: 0, number1: 0, number2: 0, answers: [] })
    if (timer.length === 0) {
      this.setState({ replay: true })
      setTimeout(() => {
        if (this.props.play.isMyRole) {
          let { number1, number2, number3, answers, filterdQuestions } = groupEqual(type_index[this.props.play.indexOfQuestion]);
          answers = convert(answers)
          let data = {
            number1, number2, number3, answers, currentPlayer: JSON.parse(room)[0],
            result: false, questions: filterdQuestions, fromEqual: true
          }
          socket.emit('startGame', { room, data }, this.props.user_info.roomName)
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
  replayGame = () => {
    socket.emit('finishGame', this.props.user_info.room, this.props.user_info.roomName)
    this.props.replay_Game();
    this.props.history.push('/select-game-type')
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
              <img src={'https://user-images.githubusercontent.com/30287981/68533892-0af2f280-0337-11ea-860d-a0fdd9bf27b2.png'} alt="" className="congratTitleImg" />
            </div>
            <div className="congratPlayerImage">
              {this.props.play.blueTeam.map((el, index) =>
                <div className="playersImagesEqual">
                  <img
                    src={'https://user-images.githubusercontent.com/30287981/68534044-d2ecaf00-0338-11ea-8523-8bf353a3359a.png'}
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
              <img src={'https://user-images.githubusercontent.com/30287981/68533609-61f6c880-0333-11ea-8d05-a761803c7eeb.png'}  alt="vs" className="vsEqualImg"  /></div>

            <div className="congratPlayerImage">
              {this.props.play.redTeam.map((el, index) =>
                <div className="playersImagesEqual">
                  <img
                    src={'https://user-images.githubusercontent.com/30287981/68534044-d2ecaf00-0338-11ea-8523-8bf353a3359a.png'}
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
              {!this.state.replay ? <Link onClick={this.replayGame}>
                <img src={'https://user-images.githubusercontent.com/30287981/68533807-0712a080-0336-11ea-9ff1-62450694e1a4.png'} alt="playAgainCongratImg" className="playAgainEqualImg" />
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
              <img src={'https://user-images.githubusercontent.com/30287981/68533806-0548dd00-0336-11ea-93c0-7ba5ceb69904.png'} alt="" className="congratTitleImg" />
            </div>
            <div className="congratPlayerImage">
              {winTeam.map((el, index) =>
                <div className="playersImagesCongrat">
                  <img
                    src={'https://user-images.githubusercontent.com/30287981/68534044-d2ecaf00-0338-11ea-8523-8bf353a3359a.png'}
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
              <img src={'https://user-images.githubusercontent.com/30287981/68533971-0844cd00-0338-11ea-878b-abd537d54ade.png'} alt="" className="cup" />
            </div>
            <div className="playAgainCongrat">
              <Link onClick={this.replayGame}>
                <img src={'https://user-images.githubusercontent.com/30287981/68533807-0712a080-0336-11ea-9ff1-62450694e1a4.png'} alt="playAgainCongratImg" className="playAgainCongratImg" />
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
  }
};

const mapDispatchToProps = { updateGame, replay_Game };
const mapStateToProps = state => ({
  user_info: state.user.info,
  play: state.user.play
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Equal);
