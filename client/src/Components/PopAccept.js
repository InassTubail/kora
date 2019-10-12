import React, { Component } from 'react';  
import './PopAccept.css';  

class PopAccept extends Component {  

state = { showPopup: false };  


  togglePopup= () =>{  
this.setState({  
     showPopup: !this.state.showPopup  
});  
 }  

  render() {  
return (  
<div>  
<button onClick={this.togglePopup}> Click To Launch Popup</button>  
{this.state.showPopup ?    
  <div className='popupAccept'>

<div className="containerGame">


  <div className="quesTitl">
  <h1>هل تود اللعب مع ...</h1>
</div>



 <div className='popup_innerAccept'>  
 <div className="cancelInvitationAccept">
 <button onClick={this.togglePopup}  className="buttonPop acceptInPop"/> 
 </div>
 
 <div className="acceptInvitation">
 <button onClick={this.togglePopup}  className="buttonPop rejectInPop"/> 
 </div>

 </div> 


</div>



</div> 
: null  
}  
</div>  

);  
}  
}  

export default PopAccept;