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
              <li
                key={index}
                className='sideBarText'
              >
                {user.username}, points: {user.points}
              </li>
            );
          })}
        </ul>
      </div> 
    );
  }

};

const select = (state) => {
  let users = state.data.league.members;

  users = users.map((user) => {
    //super inefficient way to calculate points
    //TODO: should happen server-side
    let points = 0;
    for (var char in user.characters) {
      user.characters[char].forEach((episode) => {
        state.data.events.forEach((event) => {
          if (event.episodeId === episode && +event.characterId === +char) {
            points += event.points;
          }
        });
      });
    return {...user, points};
    };
  }).sort((a,b) => {return a.points < b.points});

  return {
    users,
  };
};

export default connect(select)(LeagueRanking);




