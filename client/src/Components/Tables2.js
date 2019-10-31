import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import { updateUser, updateGame } from '../store/actions';
import socket from '../utils/api';
import titleTable from '../assets/table-title.png';
import table2 from '../assets/23.png';
import table3 from '../assets/45.png';
import table4 from '../assets/67.png';
import table5 from '../assets/89.png';
import tableshort from '../assets/table-short.png';
import tablebg from '../assets/table-bg.png';
import { groupGame } from '../utils/questionAndAnswer';
import { arabic_num, convert, convertT } from '../utils/arabic_num'

import './Tables2.css';
let type_index = {
    0: [[2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10],
    [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10]],
    1: [[4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
    [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10]],
    2: [[6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10],
    [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10]],
    3: [[8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10],
    [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10]],
    4: [[2, 2], [2, 3], [3, 3], [2, 4], [3, 4], [4, 4], [2, 5], [3, 5], [4, 5],
    [5, 5], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [2, 7], [3, 7], [4, 7],
    [5, 7], [6, 7], [7, 7], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8],
    [8, 8], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9]],
}

class Tables2 extends Component {
    selectTab = (index) => {
        const { username, accpet } = this.props.user_info
        // console.log(index.target.id);
        let room = JSON.stringify([username, ...accpet])
        let { number1, number2, answers, filterdQuestions } = groupGame(type_index[index.target.id]);
        answers = convert(answers)
        let data = {
            number1, number2, answers, currentPlayer: username, result: false, questions: filterdQuestions
        }
        socket.emit('startGame', { room, data })
    }
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
                            <Link class="table-link1" >
                                <img src={el} alt="" id={index} onClick={this.selectTab} />
                            </Link>
                        )}
                    </div>
                    <div class="footer1">
                        <img src={tablebg} alt="" />
                        <Link to="/tables/short" class="short-table1">
                            <img src={tableshort} alt="" id={4} onClick={this.selectTab} />
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = { updateUser, updateGame };

const mapStateToProps = state => ({
    open: state.dialog.open,
    user_info: state.user.info,
    users: state.user.users,
    isLoggedIn: state.user.isLoggedIn,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tables2);