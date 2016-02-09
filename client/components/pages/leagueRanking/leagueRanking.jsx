import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './../../../services/actionCreators.jsx';

import './leagueRanking.less';

class LeagueRanking extends Component {
  
  render() {
    return (
      <div className="got__leagueRanking">
        <h3>League Ranking</h3>
        <ul>
          {this.props.users.map((user, index) => {
            return (
              <li key={index}
                  className='sidebar_text clickable'
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
  const users = Object.keys(state.data.league).length === 0 ? [] : state.data.league.users;
  
  return {
    users: users.sort((a,b) => {
      return a.roster.points < b.roster.points;
    }),
  };
};

export default connect(select)(LeagueRanking);




