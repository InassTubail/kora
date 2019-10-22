import React, { Component } from 'react';
import excellent from '../assets/excellent.png'
import ahsant from '../assets/ahsant.WAV'
import './popUpCongrat.css';

const Sound = ( { soundFileName, ...rest } ) => (
  <audio autoPlay src={ahsant} {...rest} />
)


class popUpCongrat extends Component {
  render() {
    return (
      <div>
        {/* <button onClick={this.togglePopup}> Click To Launch Popup</button> */}
        {this.props.showPopup ?
          <div className="popup1">
          <Sound  />
            <div className='popupCongrat1'>
              <div className="excellentDiv1" >
                <img src={excellent} alt="excellent" className="excellent1" />
              </div>
              <button className="nextStage1" onClick={this.props.onClick} />
            </div>
          </div>
          : null
        }
      </div>

    );
  }
}

export default popUpCongrat;