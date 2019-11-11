import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import playAgain from '../assets/playAgain.png'
import { connect } from 'react-redux';
import { updateUser } from '../store/actions';

import './CongratIndivid.css';

class GameIndividual extends Component {
  replay = () => {
    this.props.updateUser({ ...this.props.user_info, level: 1 })
    this.props.history.push(`/select-game-type`);
  }
  render() {
    return (
      <React.Fragment>
        <div className="congratIndivid">
          <div className="winnerPlayerDiv">
            <p className="winnerPlayer">{this.props.user_info.username}</p>
          </div>
          <div className="playAgain">
            <Link onClick={this.replay}>
              <img src={'https://user-images.githubusercontent.com/30287981/68533807-0712a080-0336-11ea-9ff1-62450694e1a4.png'} alt="playAgain" />
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

const mapDispatchToProps = { updateUser };
const mapStateToProps = state => ({
  user_info: state.user.info,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameIndividual);
