import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import imageLoader from './playersImage';
// import frame from '../assets/frame.png';
// import title from '../assets/title.png';
// import enter from '../assets/enter.png';
import history from '../history';
import { updateUser } from '../store/actions';
import socket from '../utils/api';

import './PlayerCharacter.css';

class PlayerCharacter extends Component {
  state = {
    images: [],
    selectedImage: { id: 0, src: '', title: '', description: '' },
    error:""
  };

  componentDidMount() {
    const images = imageLoader();
    this.setState({ images });
  }

  onClick = e => {
    const selectedImage = e.target;
    console.log(selectedImage.id,'selectedImageselectedImage');
  
    this.setState({ selectedImage });
  };

  selectPerson = e => {
    if(this.state.selectedImage.id === 0 ){
      this.setState({ error: "يجب ان تختار صورة لشخصيتك" });
    }else {
    this.props.updateUser({
      ...this.props.user_info,
      person: this.state.selectedImage.id,
    });

    socket.emit('update_pic', {
      username: this.props.user_info.username,
      person: this.state.selectedImage.id,
    });
    this.props.history.push(`/select-game-type`);
  }};

  render() {
    return (
      <React.Fragment>
        {/* <ReactLoading type="bars" color="#fff" height={667} width={375} /> */}
        <div className="mainView">
          <div className="header">
            <img src={'https://user-images.githubusercontent.com/30287981/68534486-bb63f500-033d-11ea-97c8-bf41209fc2cd.png'} title="sss" alt="Sss" className="titleImage" />
            <div className="subHeader">
              <img
                src={'https://user-images.githubusercontent.com/30287981/68534044-d2ecaf00-0338-11ea-8523-8bf353a3359a.png'}
                title="ti"
                alt="dss"
                className="selectedImageFrame"
              />
              {this.state.images[0] ? (
                <img
                  src={this.state.selectedImage.src}
                  title={this.state.selectedImage.title}
                  alt={this.state.selectedImage.description}
                  className="selectedImage"
                />
              ) : null}
            </div>
          </div>
          {this.state.error ? <p className="errorMeassage2"> {this.state.error} *</p> : null}

          <div className="enterButton">
            <button onClick={this.selectPerson}>
              <img src={'https://user-images.githubusercontent.com/30287981/68533976-0f6bdb00-0338-11ea-8a2e-2d1f62c2e236.png'} title="دخول" alt="Sss" className="enter" />
            </button>
          </div>

          <div className="mainDiv">
            {this.state.images.map(({ id, src, title, description }) => (
              <div key={id} className="imagesDiv">
                <img
                  key={id}
                  id={id}
                  src={src}
                  title={title}
                  alt={description}
                  className="charactersImage"
                  onClick={this.onClick}
                />
              </div>
            ))}
          </div>

          {/* <h1>اختار شكل اللاعب</h1>
        <Link to="/select-game-type">
          انتقل الى اختيار نوع اللعبة فردي ام ثنائي
        </Link> */}
         <div className="welcomess2">
        <p className="welcomeP2">فكرة واعداد الأستاذ</p>
        <p>عبد العزيز عبدالله الحازمي</p>
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
)(PlayerCharacter);
