import React from 'react';
import './PopAccept.css';
import './PopWaiting.css';


function PopAccept(propss) {
  const { props } = propss;
  return props.open ? (props.type == 'invite' ? (
    <div className="popup1">
    <div className="popupCongrat1">
    <div className='popupAccept'>
      <div className="containerGame">
        <div className="quesTitl">
          <h1>هل تود اللعب مع ...</h1>
        </div>
        <div className='popup_innerAccept'>
          <div className="cancelInvitationAccept">
            <button
              onClick={propss.handleAccept}
              className="buttonPop acceptInPop" />
          </div>

          <div className="acceptInvitation">
            <button
              onClick={propss.handleReject} 
              className="buttonPop rejectInPop" />
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  ) : ( 
    
    <div className="popup1">
    <div className="popupCongrat1">
      <div className='popWaiting'>
        <div className='popup_innerWaiting'>
          <button 
          // onClick={this.togglePopup} 
          className="cancelInvitation">انسـحاب</button>
        </div>
      </div>
      </div>
      </div>
)) : null
}

export default PopAccept;