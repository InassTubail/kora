import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import playAgain from '../assets/playAgain.png'
import { connect } from 'react-redux';
// import frame from '../assets/frame.png';
// import person from '../assets/1.png'
import './CongratsPWP.css';

class CongratsPWP extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="congratIndivid1">

           <div className="subHeaderPWP">
              <img
                src={'https://user-images.githubusercontent.com/30287981/68534044-d2ecaf00-0338-11ea-8523-8bf353a3359a.png'}
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

<img src={'https://user-images.githubusercontent.com/30287981/68533807-0712a080-0336-11ea-9ff1-62450694e1a4.png'} alt="playAgain"/>
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
