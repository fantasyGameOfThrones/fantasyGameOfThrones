import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../services/store.jsx';

class LeagueRanking extends Component {

  renderUser() {
    return (
      <ul>
        {this.props.users.map((user, index) => {
          return (
            <li key={index}>{user.username}</li>
          );
        })}
      </ul>
    );
  }
  
  render() {
    return (
      <div>
        {this.renderUser()}
      </div> 
    );
  }

};

const select = (state) => {
  let users = state.data.league.members;

  users = users.map((user) => {
    let points = 0;
    for (var char in user.episodes) {
      user.episodes[char].forEach((episode) => {
        state.data.events.forEach((event) => {
          if (event.episodeId === episode.id && event.characterId === char) {
            points += event.points;
          }
        });
      });
    };
    return {...user, points};
  });

  console.log(users);

  return {
    users,
  };
};

export default connect(select)(LeagueRanking);




