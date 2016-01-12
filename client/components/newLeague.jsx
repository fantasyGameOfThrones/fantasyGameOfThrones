import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../services/actionCreators.jsx';

class NewLeague extends Component {
  createLeague() {
    let leagueName = document.getElementById('leagueNameInput');
    this.props.dispatch(actions.createLeague(leagueName.value));
    leagueName.value = '';
  }

  render(){
    return (
      <div>
        <h1>NewLeague</h1>
        <div>
          <input type="textarea" id="leagueNameInput" placeholder="League Name"/>
          <button className='clickable' onClick={this.createLeague.bind(this)}>Create League</button>
        </div>
      </div>
    );
  }
}

const select = ( state ) => {
  return {

  };
};

export default connect( select )( NewLeague );