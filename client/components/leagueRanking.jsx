import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../services/store.jsx';

class LeagueRanking extends Component {
  
  render() {
    return (
      <div>
        <ul>
          {this.props.users.map((user, index) => {
            return (
              <li key={index} className='sideBarText'>
                {user.username}, points: {user.roster.points}
              </li>
            );
          })}
        </ul>
      </div> 
    );
  }
};

const select = (state) => {
  var users = state.data.league ? state.data.league.users : [];
  
  return {
    users: users.sort((a,b) => {
      return a.roster.points < b.roster.points;
    }),
  };
};

export default connect(select)(LeagueRanking);




