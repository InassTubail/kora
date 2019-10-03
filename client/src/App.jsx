import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LogIn from './Components/LogIn';
import playerCharacter from './Components/PlayerCharacter';
import GameType from './Components/GameType';
import SelectCompititor from './Components/SelectCompititor';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/player-Character" component={playerCharacter} />
          <Route exact path="/select-game-type" component={GameType} />
          <Route exact path="/select-compititor" component={SelectCompititor} />
        </Switch>
      </Router>
    );
  }
}

// } else if (
//   dataNewMassg.from == this.state.currentUser &&
//   dataNewMassg.type == 'accept'
// ) {
//   this.setState({
//     isDialogOpen: true,
//     accept: true,
//     room: `game between /${dataNewMassg.from}/${dataNewMassg.to}`
//     refuse: false,
//   });
// } else if (
//   dataNewMassg.from == this.state.currentUser &&
//   dataNewMassg.type == 'refuse'
// ) {
//   this.setState({
//     isDialogOpen: true,
//     refuse: true,
//     accept: true,
//   });
// }
