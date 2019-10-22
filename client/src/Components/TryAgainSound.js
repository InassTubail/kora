import TryAgain from '../assets/TryAgainSound.mp3'
import React, { Component } from 'react';

class TryAgainSound  extends Component {

  render() {
    return ( 
      <div>
       {this.props.TryAgainVoice ?
  <audio autoPlay src={TryAgain}  />
  :null}
  </div>
)}}

export default TryAgainSound;
