import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import button1 from '../assets/button1.png';
import button2 from '../assets/button2.png';
import centerKora from '../assets/kora.png';

import './GameType.css';

const GameType = () => {
  return (
    <React.Fragment>
      <div className="mainDivv">
        <Link to="/individualGame">
          <img className="button1" src={button1} alt="individual game" />
        </Link>
        <div className="kora">
          <img className="centerKora" src={centerKora} alt="ddfd" />
        </div>
        <Link to="/select-compititor">
          <img className="button2" src={button2} alt="group game" />
        </Link>
      </div>
    </React.Fragment>
  );
};
export default GameType;
