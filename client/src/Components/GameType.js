import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import button1 from '../assets/button1.png';
import button2 from '../assets/button2.png';
import centerKora from '../assets/kora.png';
import selectGameTypes from '../assets/selectGameTypes.png';
import playIndividual from '../assets/playIndividual.png';
import playWithGroup from '../assets/playWithGroup.png';
import vsPlayType from '../assets/VS.png'


import './GameType.css';

const GameType = () => {
  return (
    <React.Fragment>
      <div className="mainDivv">

        <div className="selectGameTypes">
          <img src={selectGameTypes} alt="selectGameTypes" className="selectGameTypesImg" />
        </div>

        <div className="playIndividual">
          <img src={playIndividual} alt="playIndividual" className="playIndividualImg" />
        </div>

        <div className="game-individualButton">
          <Link to="/tables">
            <img className="button-game-individual" src={button1} alt="individual game" />
          </Link>
        </div>



        <div className="kora">
          <img className="centerKora" src={centerKora} alt="ddfd" />
        </div>



        <div className="playWithGroup">
          <img src={playWithGroup} alt="playWithGroupImg" className="playWithGroupImg" />
        </div>



        <div className="vsPlayType">
          <span>Team1</span>
          <img src={vsPlayType} alt="vsPlayType" className="vsPlayTypeImg" />
          <span className="">Team2</span>
        </div>
        <div className="select-compititorButton">
          <Link to="/select-compititor">
            <img className="button2-select-compititor" src={button2} alt="group game" />
          </Link>
        </div>

      </div>
    </React.Fragment>
  );
};
export default GameType;
