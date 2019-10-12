import React, { Component } from 'react';  
import  excellent from '../assets/excellent.png'
import './popUpCongrat.css';  

class popUpCongrat extends Component {  

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
  <div className='popupCongrat'>
 <div className="excellentDiv" > 
  <img src={excellent} alt="excellent" className="excellent"/>
  </div>  
  <button className="nextStage"/>

</div> 
: null  
}  
</div>  

);  
}  
}  

export default popUpCongrat;