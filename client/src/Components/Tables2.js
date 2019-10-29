import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import { updateUser } from '../store/actions';
import socket from '../utils/api';
import titleTable from '../assets/table-title.png';
import table2 from '../assets/23.png';
import table3 from '../assets/45.png';
import table4 from '../assets/67.png';
import table5 from '../assets/89.png';



import tableshort from '../assets/table-short.png';
import tablebg from '../assets/table-bg.png';

import './Tables2.css';

class Tables2 extends Component {
    render() {
        let tables = [table2, table3, table4, table5]
        return (
            <React.Fragment>
                <div class="multiplication-tables1">
                    <div class="tables-title1">
                        <img src={titleTable} alt="" />
                    </div>
                    <div class="tables-loo1">
                        {tables.map((el, index) =>
                            <Link to={`tables/${index + 2}`} class="table-link1">
                                <img src={el} alt="" />
                            </Link>
                        )}
                    </div>
                    <div class="footer1">
                        <img src={tablebg} alt="" />
                        <Link to="/tables/short" class="short-table1">
                            <img src={tableshort} alt="" />
                        </Link>
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
)(Tables2);
