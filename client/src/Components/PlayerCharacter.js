import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PlayerCharacter extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>اختار شكل اللاعب</h1>
        <Link to="/select-game-type">
          انتقل الى اختيار نوع اللعبة فردي ام ثنائي
        </Link>
      </React.Fragment>
    );
  }
}
