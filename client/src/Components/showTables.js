import React from 'react';
import './PopAccept.css';
import './PopWaiting.css';
import table2 from '../assets/table2.png'
import x from '../assets/x.png'

function Table(props) {
    // const { props } = propss;
    return <div className="popup1" style={{ background: '#21212194' }}>

        <div className="popupCongrat1">
            <button onClick={props.close} >X</button>
            {/* <div className='popWaiting'> */}
            <img src={table2} style={{ width: '50%;' }} width="50%" />
            {/* </div> */}
        </div>
    </div>
}

export default Table;