import React, {Component} from 'react';
import {connect} from 'react-redux';
import Roster from './roster.jsx';

import './rosters.less';

class Rosters extends Component {
  render(){
    return (
      <div className="got__rosters">
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