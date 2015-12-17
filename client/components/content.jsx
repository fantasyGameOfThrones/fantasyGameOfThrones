import React, { Component } from 'react';
import { connect } from 'react-redux';
import CharacterTable from './characterTable.jsx';
import PlayerTable from './playerTable.jsx';
import TeamTable from './teamTable.jsx';

export default class Content extends Component {

  //will render differently depending on state.ui.content
  render() {

    return <div id='center'>
      <CharacterTable />
      <PlayerTable />
      <TeamTable />
    </div>;

  }

};

let select = ( state ) => {
  return {
    selectedPlayer: state.ui.selectedPlayer,
    characters: state.data.characterData,
  };
};