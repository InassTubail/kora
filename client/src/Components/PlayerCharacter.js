import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import ReactLoading from 'react-loading';

import imageLoader from './playersImage';
import frame from '../assets/frame.png';
import title from '../assets/title.png';
import enter from '../assets/enter.png';

import './PlayerCharacter.css';

export default class PlayerCharacter extends Component {
  state = {
    images: [],
    selectedImage: { src: '', title: '', description: '' },
  };

  componentDidMount() {
    const images = imageLoader();
    this.setState({ images });
  }

  onClick = e => {
    const selectedImage = e.target;
    this.setState({ selectedImage });
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
            <Link to="/select-game-type" className="enter">
              <img src={enter} title="sss" alt="Sss" className="enter" />
            </Link>
          </div>

          <div className="mainDiv">
            {this.state.images.map(({ id, src, title, description }) => (
              <div key={id} className="imagesDiv">
                <img
                  key={id}
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
