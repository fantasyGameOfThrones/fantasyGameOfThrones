
import React from 'react';
import { connect } from 'react-redux';
import CharacterTable from './components/characterTable.jsx';
import PlayerTable from './components/playerTable.jsx';

var App = React.createClass({

  render() {
    return <div>
      <CharacterTable />
      <PlayerTable />
    </div>;
  },

});

var select = function( state ){
  return { token: state.token };
};

module.exports = connect( select )( App );