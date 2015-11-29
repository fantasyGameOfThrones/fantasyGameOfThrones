import React from 'react';
import { connect } from 'react-redux';
import actions from '../services/actionCreators.jsx';

let CharacterTable = React.createClass({

  render() {
    return <table
      className="characterTable"
    >
      <caption> Available Characters </caption>
      <thead>
        <tr>
          <td className="heading">First Name</td>
          <td className="heading">Last Name</td>
          <td className="heading">House</td>
        </tr>
      </thead>
      <tbody>
        { this.props.characters.map(( char ) => {
          return <tr key={char.id} onClick={() => { this.draftCharacter( char ) }}>
            <td className="data firstName">{char.firstName}</td>
            <td className="data lastName">{char.lastName}</td>
            <td className="data house">{char.house}</td>
          </tr>
        }) }
      </tbody>
    </table>
  },

  draftCharacter( character ) {
    console.log('getting called with: ', character);
    this.props.dispatch( actions.draftCharacter( character ) );
  },

});

let select = ( state ) => {
  return {
    selectedPlayer: state.ui.selectedPlayer,
    characters: state.data.characterData,
  };
};

module.exports = connect( select )( CharacterTable );