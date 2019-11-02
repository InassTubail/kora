import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mabrouk from '../assets/mabrouk.png';
// import person from '../assets/1.png';
import frame from '../assets/frame.png';
import cup from '../assets/cup.png'
import playAgain from '../assets/playAgain.png';
import { connect } from 'react-redux';
import { updateUser, replay_Game } from '../store/actions';
import { person } from './playersImage';
import clup from '../assets/clup.mp3'
import socket from '../utils/api';

import './Congrat.css';

class Congrat extends Component {
  replay = () => {
    socket.emit('finishGame', this.props.user_info.room,  this.props.user_info.roomName)
    this.props.replay_Game();
    this.props.history.push('/select-game-type')
  }
  render() {
    let winTeam = []
    const { redScore, redTeam, blueTeam, blueScore } = this.props.play;
    if (redScore > blueScore) {
      winTeam = redTeam
    } else {
      winTeam = blueTeam
    }
    return (
      <React.Fragment>
        <div className="congratDiv">
          <audio autoPlay src={clup} />

          <div className="congratTitleDiv">
            <img src={mabrouk} alt="" className="congratTitleImg" />
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
      </React.Fragment>
    );
  }
};

const mapDispatchToProps = { updateUser, replay_Game };
const mapStateToProps = state => ({
  user_info: state.user.info,
  play: state.user.play
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Congrat);
