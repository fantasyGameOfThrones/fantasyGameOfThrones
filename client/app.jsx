
import React from 'react';
import { connect } from 'react-redux';
import CharacterTable from './components/characterTable.jsx';
import PlayerTable from './components/playerTable.jsx';
import TeamTable from './components/teamTable.jsx';

let App = React.createClass({

  render() {
    return (
      <div id="composedApp">
        <div id="header"><h1>Fantasy Game of Thrones</h1></div>
        <div id="body">
          <div id="left"><h1>Left Panel</h1></div>
          <div id="center">
            <CharacterTable />
            <PlayerTable />
            <TeamTable />
          </div>
          <div id="right"><h1>Right Panel</h1></div>
        </div>
        <div id="footer"><h1>Footer</h1></div>
      </div>
    );
  },

});

let select = function( state ){
  return { token: state.token };
};

module.exports = connect( select )( App );