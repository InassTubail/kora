import React from 'react';
import './PopAccept.css';

function PopAccept(propss) {
  const { props } = propss;
  return props.open ? (props.type == 'invite' ? (
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
  ) : (<div className='popWaiting'>
    <div className='popup_innerWaiting'>
      <button 
      // onClick={this.togglePopup} 
      className="cancelInvitation">الغـاء الدعـوة</button>
    </div>
  </div>)) : null
}

export default PopAccept;