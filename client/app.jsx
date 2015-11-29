
import React from 'react';
import { connect } from 'react-redux';
import CharacterTable from './components/characterTable.jsx';
import PlayerTable from './components/playerTable.jsx';
import TeamTable from './components/teamTable.jsx';

let App = React.createClass({

  render() {
    return <div>
      <CharacterTable />
      <PlayerTable />
      <TeamTable />
    </div>;
  },

});

let select = function( state ){
  return { token: state.token };
};

module.exports = connect( select )( App );