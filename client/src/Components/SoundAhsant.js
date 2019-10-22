import sss from '../assets/ahsant.WAV'
import React, { Component } from 'react';



class Sound  extends Component {

  render() {
    return ( 
      <div>
       {this.props.voice ?
  <audio autoPlay src={sss}  />
  :null}
  </div>
)}}

export default Sound;
