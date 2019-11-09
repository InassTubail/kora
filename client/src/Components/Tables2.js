import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import { updateUser, updateGame } from '../store/actions';
import socket from '../utils/api';
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
        let tables = ['https://user-images.githubusercontent.com/30325727/68527824-0ce79200-02f4-11ea-93e5-827c55b53800.png',
         'https://user-images.githubusercontent.com/30325727/68527823-0ce79200-02f4-11ea-85f5-345bb112ea11.png',
          'https://user-images.githubusercontent.com/30325727/68527822-0ce79200-02f4-11ea-9b44-987d747597f6.png',
           'https://user-images.githubusercontent.com/30325727/68527821-0ce79200-02f4-11ea-990d-f5a9c5ffaf4a.png']
        return (
            <React.Fragment>
                <div class="multiplication-tables1">
                    <div class="tables-title1">
                        <img src={'https://user-images.githubusercontent.com/30325727/68527635-c5600680-02f1-11ea-99f6-b91e7e4ef9c6.png'} alt="" />
                    </div>
                    <div class="tables-loo1">
                        {tables.map((el, index) =>
                            <Link class="table-link1" >
                                <img src={el} alt="" id={index} onClick={this.selectTab} />
                            </Link>
                        )}
                    </div>
                    <div class="footer1">
                        <img src={'https://user-images.githubusercontent.com/30325727/68527637-c5f89d00-02f1-11ea-8329-495bff217397.png'} alt="" />
                        <Link to="/tables/short" class="short-table1">
                            <img src={'https://user-images.githubusercontent.com/30325727/68527636-c5600680-02f1-11ea-8b5b-d8282b605c22.png'} alt="" id={4} onClick={this.selectTab} />
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