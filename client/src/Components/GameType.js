import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class GameType extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/individualGame">فردي</Link>
        <Link to="/select-compititor">ثنائي</Link>
      </React.Fragment>
    );
  }
}
