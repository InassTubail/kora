import React, { Component } from 'react';
import './PopAccept.css';
import './PopWaiting.css';

let tables = {
  0: 'https://user-images.githubusercontent.com/30325727/68527817-0c4efb80-02f4-11ea-8db3-3a3f2f36806d.png',
  2: 'https://user-images.githubusercontent.com/30325727/68527493-21299000-02f0-11ea-9bfc-fdfe8a39be76.png',
  3: 'https://user-images.githubusercontent.com/30325727/68527492-21299000-02f0-11ea-9f1b-2549f5b464de.png',
  4: 'https://user-images.githubusercontent.com/30325727/68527491-2090f980-02f0-11ea-910b-1febbb6e1fa4.png',
  5: 'https://user-images.githubusercontent.com/30325727/68527490-2090f980-02f0-11ea-81af-1bff231e298a.png',
  6: 'https://user-images.githubusercontent.com/30325727/68527489-1ff86300-02f0-11ea-97e8-beaf4edd365b.png',
  7: 'https://user-images.githubusercontent.com/30325727/68527488-1ff86300-02f0-11ea-8e22-a94f0c592244.png',
  8: 'https://user-images.githubusercontent.com/30325727/68527486-1cfd7280-02f0-11ea-89f2-60483284b4c7.png',
  9: 'https://user-images.githubusercontent.com/30325727/68527485-1cfd7280-02f0-11ea-89b4-44c4fafd7282.png',
  10: 'https://user-images.githubusercontent.com/30325727/68527484-1cfd7280-02f0-11ea-8aaa-83c891377fbd.png'
}

class Table extends Component {
  render() {
    return (<div className="popup1" style={{ background: '#21212194' }}>
      <div className="popupCongrat1">
        <button onClick={this.props.close} >X</button>
        {this.props.id == 0 ? <img src={tables[0]} className="tabb" /> :
          <img src={tables[this.props.id]} style={{ width: '50%;' }} width="50%" />}
      </div>
    </div>)
  }
}


export default Table;