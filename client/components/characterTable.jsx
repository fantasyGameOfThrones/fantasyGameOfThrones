import React from 'react';
import { connect } from 'react-redux';

var CharacterTable = React.createClass({

  render() {
    return <table>
      <thead>
        <tr>
          <td>First Name</td>
          <td>Last Name</td>
          <td>House</td>
        </tr>
      </thead>
      <tbody>
        { this.props.characters.map(function(char) {
          return <tr key={char.id}>
            <td>{char.firstName}</td>
            <td>{char.lastName}</td>
            <td>{char.house}</td>
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