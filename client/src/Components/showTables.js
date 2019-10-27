import React, { Component } from 'react';
import './PopAccept.css';
import './PopWaiting.css';
import table2 from '../assets/table2.png'
import table3 from '../assets/table3.png'
import table4 from '../assets/table4.png'
import table5 from '../assets/table5.png'
import table6 from '../assets/table6.png'
import table7 from '../assets/table7.png'
import table8 from '../assets/table8.png'
import table9 from '../assets/table9.png'
import table10 from '../assets/table10.png'

import x from '../assets/x.png'


let tables = {
  2:table2,
  3:table3,
  4:table4,
  5:table5,
  6:table6,
  7:table7,
  8:table8,
  9:table9,
  10:table10
}

class Table extends Component {

  render() {
    // const { props } = propss;
    return( <div className="popup1" style={{ background: '#21212194' }}>

        <div className="popupCongrat1">
            <button onClick={this.props.close} >X</button>
            {/* <div className='popWaiting'> */}
            <img src={tables[this.props.id]}  style={{ width: '50%;' }} width="50%" />
            {/* </div> */}
        </div>
    </div>)
  }
}


export default Table;
  // tables = (id) => {
  //   let src;
  //   tables.map((el)=>{
  //     if(el.id == id){
  //       src = el.src 
  //     }
  //     return el;
  //   })
  //   return src;
  // }


// export const tables = [
//   { id: 2, src:table2 },
//   { id: 3, src: table3},
//   { id: 4, src: table4},
//   { id: 5, src: table5},
//   { id: 6, src: table6},

//   { id: 7, src: table7},
//   { id: 8, src: table8},
//   { id: 9, src: table9},
//   { id: 10, src: table10,  },
// ];
// let tsab = {
//   2: table2,

// }