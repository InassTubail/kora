import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import button1 from '../assets/button1.png';
// import button2 from '../assets/button2.png';
// import centerKora from '../assets/kora.png';
// import selectGameTypes from '../assets/selectGameTypes.png';
// import playIndividual from '../assets/playIndividual.png';
// import playWithGroup from '../assets/playWithGroup.png';
// import vsPlayType from '../assets/VS.png'


import './GameType.css';

const GameType = () => {
  return (
    <React.Fragment>
      <div className="mainDivv">

        <div className="selectGameTypes">
          <img src={'https://user-images.githubusercontent.com/30287981/68534340-34624d00-033c-11ea-98b4-e8db5427338c.png'} alt="selectGameTypes" className="selectGameTypesImg" />
        </div>

        <div className="playIndividual">
          <img src={'https://user-images.githubusercontent.com/30287981/68534268-2d870a80-033b-11ea-8e5b-085541abfeb6.png'} alt="playIndividual" className="playIndividualImg" />
        </div>

        <div className="game-individualButton">
          <Link to="/tables">
            <img className="button-game-individual" src={'https://user-images.githubusercontent.com/30325727/68527820-0c4efb80-02f4-11ea-9af8-5daae7b563e9.png'} alt="individual game" />
          </Link>
        </div>



        <div className="kora">
          <img className="centerKora" src={'https://user-images.githubusercontent.com/30287981/68534189-05e37280-033a-11ea-9293-e877ff99f10c.png'} alt="ddfd" />
        </div>



        <div className="playWithGroup">
          <img src={'https://user-images.githubusercontent.com/30287981/68534283-658e4d80-033b-11ea-829c-2bb8ca06121a.png'} alt="playWithGroupImg" className="playWithGroupImg" />
        </div>



        <div className="vsPlayType">
          <span>Team1</span>
          <img src={'https://user-images.githubusercontent.com/30287981/68533609-61f6c880-0333-11ea-8d05-a761803c7eeb.png'} alt="vsPlayType" className="vsPlayTypeImg" />
          <span className="">Team2</span>
        </div>
        <div className="select-compititorButton">
          <Link to="/select-compititor">
            <img className="button2-select-compititor" src={'https://user-images.githubusercontent.com/30325727/68527819-0c4efb80-02f4-11ea-972d-c8fe3c58e113.png'} alt="group game" />
          </Link>
        </div>

      </div>
    </React.Fragment>
  );
};
export default GameType;