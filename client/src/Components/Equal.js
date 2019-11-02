import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mabrouk from '../assets/equal.png';
// import person from '../assets/1.png';
import frame from '../assets/frame.png';
import playAgain from '../assets/playAgain.png';
import vs from '../assets/VS.png'
import { connect } from 'react-redux';
import { updateUser } from '../store/actions';
import { person } from './playersImage';
import clup from '../assets/clup.mp3'


import './Equal.css';

class Equal extends Component {
  // replay = () => {
  //   this.props.updateUser({ ...this.props.user_info, level: 1 })
  //   this.props.history.push(`/select-game-type`);
  // }
  render() {
    return (
      <React.Fragment>
        <div className="equalDiv">
        <audio autoPlay src={clup}  />

          <div className="equalTitleDiv">
            <img src={mabrouk} alt="" className="congratTitleImg" />
          </div>
          <div className="congratPlayerImage">
            {this.props.play.blueTeam.map((el,index) =>
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

            {/* <div className="playersImagesCongrat">
              <img
                src={frame}
                title="ti"
                alt="dss"
                className="selectedImageFrameCongrat"
              />
              <img src={person} title="sdd" alt="dd" className="selectedImageCongrat2" />
              <p className="winnerPlayerCongrat">"sammaaar"</p>
            </div> */}

          </div>

          <div className="vsEqual">
            <img src={vs} alt="vs" className="vsEqualImg" /></div>


          <div className="congratPlayerImage">
            {this.props.play.redTeam.map((el,index) =>
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

            {/* <div className="playersImagesCongrat">
              <img
                src={frame}

                title="ti"
                alt="dss"
                className="selectedImageFrameCongrat"
              />
              <img src={person} title="sdd" alt="dd" className="selectedImageCongrat2" />
              <p className="winnerPlayerCongrat">"sammaaar"</p>
            </div> */}

          </div>
          <div className="playAgainCongrat">
          <p className="playAgainWait">
           شارك في التحدي الأخير ,,, اللاعب الأسرع هو الرابح 
           <br/>
           انتظر 10 ثواني
          </p>
            {/* <Link onClick={this.replay}> */}
            {/* ffd400 */}
              {/* <img src={playAgain} alt="playAgainCongratImg" className="playAgainEqualImg" /> */}
            {/* </Link> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
};

// const mapDispatchToProps = { updateUser };
const mapStateToProps = state => ({
  user_info: state.user.info,
  play: state.user.play
});
export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Equal);
