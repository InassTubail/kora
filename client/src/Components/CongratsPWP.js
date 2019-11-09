import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import playAgain from '../assets/playAgain.png'
import { connect } from 'react-redux';
import frame from '../assets/frame.png';
// import person from '../assets/1.png'
import './CongratsPWP.css';

class CongratsPWP extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="congratIndivid1">

           <div className="subHeaderPWP">
              <img
                src={frame}
                title="ti"
                alt="dss"
                className="selectedImageFramePWP"
              />
                <img
                  src={'https://user-images.githubusercontent.com/30325727/68527261-abbcc000-02ed-11ea-9b23-4ae3b5c7c212.png'}
                  className="selectedImagePWP"
                />
            </div>


          <div className="winnerPlayerDiv">
            <p className="winnerPlayer">{this.props.user_info.username}</p>
          </div>
          <div className="playAgainn">
          <Link>

<img src={playAgain} alt="playAgain"/>
</Link>

          </div>

        </div>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({
  user_info: state.user.info,
});
export default connect(
  mapStateToProps,
)(CongratsPWP);
