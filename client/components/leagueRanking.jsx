import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../services/store.jsx';
import actions from '../services/actionCreators.jsx';

class LeagueRanking extends Component {
  
  render() {
    return (
      <div>
        <h3>League Ranking</h3>
        <ul>
          {this.props.users.map((user, index) => {
            return (
              <li key={index}
                  className='sideBarText clickable'
                  onClick={() => {this.props.dispatch(actions.changeRosterUser(user))}}>
                {index + 1}: {user.username}, {user.roster.points} points
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




