import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../services/actionCreators.jsx';
import Roster from './roster.jsx';

class Rosters extends Component {
  render(){
    return (
      <div>
        <Roster username={this.props.rosterUser.username}
                characters={this.props.characters}
                roster={this.props.rosterUser.roster}/>
      </div>
    );
  }
};

const select = ( state ) => {
  return {
    characters: state.data.characters,
  };
};

export default connect( select )( Rosters );