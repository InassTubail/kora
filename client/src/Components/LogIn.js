import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LogIn.css';
import InputImg from '../assets/inputImg.png';

import { login } from '../store/actionCreators/user';


class LogIn extends Component {
  state = {
    name: '',
    error: '',
  };

  // eslint-disable-next-line react/sort-comp
  onChange = e => {
    const { value } = e.target;
    this.setState({ name: value });
  };

  onClick = e => {
    e.preventDefault();
    let isExit = false;
    this.props.users &&
      this.props.users.forEach(cc => {
        if (cc.username === this.state.name) {
          isExit = true;
        }
      });
    if (isExit) {
      this.setState({ error: 'هذا الاسم مستخدم ,حاول باسم أخر ' });
    } else {
      this.props.login(this.state.name);
    }
  };

  render() {
    return this.props.isLoggedIn ? (
      <Redirect to="/player-Character" />
    ) : (
      <div id="signInBox" className="signInBox">
        <div className="signInContainer">
          {/* <h1 className="signInTitle">تسجيل الدخول</h1> */}
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form id="nameForm">
            <img src={InputImg} alt="jj" />
            <input
              id="name"
              className="name"
              type="text"
              name="name"
              onChange={this.onChange}
              placeholder="ادخــل اسمــك هنــا"
            />
            <button className="send" onClick={this.onClick} type="submit">
              دخـــول
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { login };
const mapStateToProps = state => ({
  user_info: state.user.info,
  users: state.user.users,
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
