import React from 'react';
import { connect } from 'react-redux';

var CharacterTable = React.createClass({

  render() {
    return <table>
      <thead>
        <tr>
          <td className="heading">First Name</td>
          <td className="heading">Last Name</td>
          <td className="heading">House</td>
        </tr>
      </thead>
      <tbody>
        { this.props.characters.map(function(char) {
          return <tr key={char.id}>
            <td className="data firstName">{char.firstName}</td>
            <td className="data lastName">{char.lastName}</td>
            <td className="data house">{char.house}</td>
          </tr>
        }) }
      </tbody>
    </table>
  },

});

var select = function( state ){
  return {
    selectedPlayer: state.ui.selectedPlayer,
    characters: state.data.characterData,
  };
};

module.exports = connect( select )( CharacterTable );