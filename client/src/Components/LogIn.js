import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LogIn.css';
// import InputImg from '../assets/inputImg.png';

import { login } from '../store/actionCreators/user';

class LogIn extends Component {
  state = {
    error: "",
    name: '',
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
      if(this.state.name){
        if (isExit) {
          this.setState({ error: 'هذا الاسم مستخدم ,حاول باسم أخر ' });
        } else {
          this.props.login(this.state.name);
        }
      }else{
        this.setState({ error: 'يجـب ادخـال اسم مستخدم' });

      }
  };

  render() {
    return this.props.isLoggedIn ? (
      <Redirect to="/player-Character" />
    ) : (
      <div id="signInBox" className="signInBox">
        <div className="signInContainer">
          {/* <h1 className="signInTitle">تسجيل الدخول</h1> */}
          <form id="nameForm">
            <img src={'https://user-images.githubusercontent.com/30325727/68527141-6d72d100-02ec-11ea-8a86-ed7521e733a4.png'} alt="jj" />
            {this.state.error ? <p className="errorMeassage">* {this.state.error}</p> : null}
            
            <input 
              id="name"
              className="nameToLogIn"
              type="text"
              name="name"
              autocomplete="off"
              onChange={this.onChange}
              placeholder="ادخــل اسمــك هنــا"
            />
            <button className="send" onClick={this.onClick} type="submit">
              دخـــول
            </button>
          </form>
        </div>
        <div className="welcomess">
        <p className="welcomeP">فكرة واعداد الأستاذ</p>
        <p>عبد العزيز عبدالله الحازمي</p>
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
