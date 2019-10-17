import React, { Component } from 'react';
import './PopWaiting.css';

class PopWaiting extends Component {

  state = { showPopup: false };


  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.togglePopup}> Click To Launch Popup</button>
        {this.state.showPopup ?
          <div className='popWaiting'>
            <div className='popup_innerWaiting'>
              <button onClick={this.togglePopup} className="cancelInvitation">الغـاء الدعـوة</button>
            </div>
          </div>
          : null
        }
      </div>

    );
  }
}

export default PopWaiting;