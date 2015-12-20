import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../services/actionCreators.jsx';
import CharacterTable from './characterTable.jsx';
import PlayerTable from './playerTable.jsx';
import TeamTable from './teamTable.jsx';

class Home extends Component {
  render(){
    return (
      <div>
        <CharacterTable />
        <PlayerTable />
        <TeamTable />
      </div>
    );
  }
}

const select = ( state ) => {
  return {

  };
};

export default connect( select )( Home );