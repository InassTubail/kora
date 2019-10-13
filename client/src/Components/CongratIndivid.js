import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import playAgain from '../assets/playAgain.png'
import { connect } from 'react-redux';
import './CongratIndivid.css';

class GameIndividual extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="congratIndivid">
          <div className="winnerPlayerDiv">
            <p className="winnerPlayer">{this.props.user_info.username}</p>
          </div>
          <div className="playAgain">
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
)(GameIndividual);
