import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import { updateUser } from '../store/actions';
import socket from '../utils/api';
import titleTable from '../assets/table-title.png';
import table2 from '../assets/table-2.png';
import table3 from '../assets/table-3.png';
import table4 from '../assets/table-4.png';
import table5 from '../assets/table-5.png';
import table6 from '../assets/table-6.png';
import table7 from '../assets/table-7.png';
import table8 from '../assets/table-8.png';
import table9 from '../assets/table-9.png';
import table10 from '../assets/table-10.png';
import tableshort from '../assets/table-short.png';
import tablebg from '../assets/table-bg.png';


import './Tables.css';

class Tables extends Component {
 
  render() {
    return (
      <React.Fragment>
      <div class="multiplication-tables">
        <div class="tables-title">
            <img src={titleTable}alt="" />
        </div>
        <div class="tables-loo">
            <a href="" class="table-link">
                <img src={table2} alt="" />
            </a>
            <a href="" class="table-link">
                <img src={table3} alt="" />
            </a>
            <a href="" class="table-link">
                <img src={table4} alt="" />
            </a>
            <a href="" class="table-link">
                <img src={table5} alt="" />
            </a>
            <a href="" class="table-link">
                <img src={table6} alt="" />
            </a>
            <a href="" class="table-link">
                <img src={table7} alt="" />
            </a>
            <a href="" class="table-link">
                <img src={table8} alt="" />
            </a>
            <a href="" class="table-link">
                <img src={table9} alt="" />
            </a>
            <a href="" class="table-link">
                <img src={table10} alt="" />
            </a>

        </div>
        <div class="footer">
            <img src={tablebg} alt="" />
            <a href="" class="short-table">
                <img src={tableshort} alt="" />
            </a>
        </div>
    </div>
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
)(Tables);
