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
import { type_index } from '../utils/customPlay'
import './Tables2.css';

class Tables2 extends Component {
    selectTab = (index) => {
        const { username, accpet } = this.props.user_info
        // console.log(index.target.id);
        let room = JSON.stringify([username, ...accpet])
        this.props.updateGame({ ...this.props.play,indexOfQuestion: index.target.id })
        let { number1, number2, answers, filterdQuestions } = groupGame(type_index[index.target.id]);
        answers = convert(answers)
        let data = {
            number1, number2, answers, currentPlayer: username, result: false, questions: filterdQuestions
        }
        socket.emit('startGame', { room, data }, this.props.user_info.roomName)
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
    play: state.user.play,
    user_info: state.user.info,
    users: state.user.users,
    isLoggedIn: state.user.isLoggedIn,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tables2);