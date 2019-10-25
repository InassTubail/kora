import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import title from '../assets/title.png';
import history from '../history';
import { updateUser } from '../store/actions';
import socket from '../utils/api';
import titleTable from '../assets/titleTable.png'
import table2 from '../assets/table2.png'
import table3 from '../assets/table3.png'
import table4 from '../assets/table4.png'
import table5 from '../assets/table5.png'
import table6 from '../assets/table6.png'
import table7 from '../assets/table7.png'
import table8 from '../assets/table8.png'
import table9 from '../assets/table9.png'
import table10 from '../assets/table10.png'
import tableSpec from '../assets/tableSpec.png'
import letsStart from '../assets/letsStart.png'


import './selectTable.css';

class SelectTable extends Component {
 
  render() {
    return (
      <React.Fragment>
        {/* <ReactLoading type="bars" color="#fff" height={667} width={375} /> */}
        {/* <div className="mainTable">
          <div className="header">
            <img src={titleTable} title="title" alt="title" className="titleTable" />
            </div>

         

    <div className="allTables">
           <img src={table2}  className="imagesTable"/> 
                    <img src={table3} className="imagesTable"/> 
                    <img src={table4} className="imagesTable"/> 
                    <img src={table5} className="imagesTable"/> 
                    <img src={table6} className="imagesTable"/> 
                    <img src={table7} className="imagesTable"/> 
                    <img src={table8} className="imagesTable"/> 
                    <img src={table9} className="imagesTable"/> 
                    <img src={table10} className="imagesTable"/> 
                    <img src={tableSpec} className="tableSpec"/> 

                    </div>
                 */}

{/* <div className="letsStart">
<img src={letsStart} alt="letsStartImg" className="letsStartImg"/>
</div> */}

        {/* </div> */}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { updateUser };
const mapStateToProps = state => ({
  user_info: state.user.info,
  // users: state.user.users,
  // isLoggedIn: state.user.isLoggedIn,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTable);
