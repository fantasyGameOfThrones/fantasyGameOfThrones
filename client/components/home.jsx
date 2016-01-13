import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';
import Roster from './roster.jsx';

class Home extends Component {

  render(){
    return <div>
      <Roster username={this.props.username}
              characters={this.props.characters}
              roster={this.props.roster}/>
    </div>;
  }
}

const select = (state) => {

  return {
    username: state.data.auth.self.username,
    characters: state.data.characters || [],
    roster: state.data.auth.self.roster || {},
  };
};

export default connect(select)(Home);
