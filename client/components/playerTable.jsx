import React from 'react';
import { connect } from 'react-redux';

var PlayerTable = React.createClass({

  render() {
    return <table>
      <thead>
        <tr>
          <td>Name</td>
        </tr>
      </thead>
      <tbody>
        { this.props.players.map(function(player) {
          return <tr key={player.id}>
            <td>{player.name}</td>
          </tr>
        }) }
      </tbody>
    </table>
  },

});

var select = function( state ){
  return {
    selectedPlayer: state.ui.selectedPlayer,
    players: state.data.playerData,
  };
};

module.exports = connect( select )( PlayerTable );