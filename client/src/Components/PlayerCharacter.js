import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import imageLoader from './playersImage';
import frame from '../assets/frame.png';
import title from '../assets/title.png';
import enter from '../assets/enter.png';
import history from '../history';
import { updateUser } from '../store/actions';
import './PlayerCharacter.css';
// import { Socket } from 'net';
const io = require('socket.io-client');


class PlayerCharacter extends Component {
  state = {
    images: [],
    selectedImage: { id: 0, src: '', title: '', description: '' },
  };

  componentDidMount() {
    const images = imageLoader();
    this.setState({ images });
  }

  onClick = e => {
    const selectedImage = e.target;
    this.setState({ selectedImage });
  };

  selectPerson = e => {
    const socket = io.connect('http://localhost:8080');
    this.props.updateUser({
      ...this.props.user_info,
      person: this.state.selectedImage.id,
    });

    socket.emit('update_pic', {
      username: this.props.user_info.username,
      person: this.state.selectedImage.id,
    });
    this.props.history.push(`/select-game-type`)
  };

  render() {
    return (
      <React.Fragment>
        {/* <ReactLoading type="bars" color="#fff" height={667} width={375} /> */}
        <div className="mainView">
          <div className="header">
            <img src={title} title="sss" alt="Sss" className="titleImage" />
            <div className="subHeader">
              <img
                src={frame}
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

          <div className="enterButton">
            <button className="enter" onClick={this.selectPerson}>
              {/* //to="/select-game-type" */}
              <img src={enter} title="دخول" alt="Sss" className="enter" />
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
