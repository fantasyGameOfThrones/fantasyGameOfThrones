import React from 'react';
import { connect } from 'react-redux';

let PlayerTable = React.createClass({

  render() {
    return <table className="playerTable">
      <caption> Players </caption>
      <thead>
        <tr>
          <td className="heading">Name</td>
        </tr>
      </thead>
      <tbody>
        { this.props.players.map(( player ) => {
          return <tr key={player.id}>
            <td className="data name">{player.name}</td>
          </tr>
        }) }
      </tbody>
    </table>
  },

});

let select = ( state ) => {
  return {
    selectedPlayer: state.ui.selectedPlayer,
    players: state.data.playerData,
  };
};

module.exports = connect( select )( PlayerTable );