import React, { Component } from 'react';
// import lose from '../assets/lose.png';
import './popUpLose.css';

class popUpLose extends Component {

  state = { showPopup: false };


  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div>
        {/* <button onClick={this.togglePopup}> Click To Launch Popup</button>   */}
        {this.props.showPopup ?
          <div className="popup">
            <div className='popupCongrat'>
              <div className="excellentDiv" >
                <img src={'https://user-images.githubusercontent.com/30287981/68534258-029cb680-033b-11ea-9747-2cfe7a3b8471.png'} alt="excellent" className="excellent" />
              </div>
              <button className="nextStage" onClick={this.props.onClick} />
            </div>
          </div>
          : null
        }
      </div>

    );
  }
}

export default popUpLose;