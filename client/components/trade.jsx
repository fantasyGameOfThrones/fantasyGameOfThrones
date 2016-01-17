import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Trade extends Component {

  data() {
    // Setup roster to contain images
    // charactersLeft filters through user roster, then league roster
    // whatever is left goes into undrafted array
    let tempRoster = {};
    let userRoster = []; // final roster
    let charactersLeft = {};
    let undrafted = [];
    
    this.props.roster.forEach((char) => {
      if (!tempRoster[char[0]]) {
        tempRoster[char[0]] = {};
      }
    });
    //check if char is in roster
    // if yes, give it correct properties
    // if no, send it to charactersLeft
    this.props.characters.forEach((char) => {
      if (tempRoster[char.id]) {
        tempRoster[char.id].id = char.id,
        tempRoster[char.id].name = char.name;
        tempRoster[char.id].imageUrl = char.imageUrl;
        userRoster.push(tempRoster[char.id]);
      } else {
        charactersLeft[char.id] = {
          id: char.id,
          name: char.name,
          imageUrl: char.imageUrl
        };
      }
    });
    // go through each users roster 
    // and check which characters they drafted
    this.props.users.forEach((user) => {
      for (var key in user.roster) {
        if (charactersLeft[key]) {
          delete charactersLeft[key];
        }
      }
    });
    // remainder goes in undrafted
    for (var key in charactersLeft) {
      undrafted.push(charactersLeft[key]);
    }

    return {undrafted, userRoster};

  }

  render() {
    let {undrafted, userRoster} = this.data();

    return (
      <div>
        <h1>Trade Stuff</h1>
        <h2> YOUR ROSTER </h2>
        <ul>
          {userRoster.map((char) => {
            return (
              <li key={char.id}>
                <div>{char.name}</div>
                <img className="thumb" src={char.imageUrl}></img>
              </li>
            )
          })}
        </ul>
        <h2>UNDRAFTED</h2>
        <ul>
          {undrafted.map((char) => {
            return (
              <li key={char.id}>
                <div>{char.name}</div>
                <img className="thumb" src={char.imageUrl}></img>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

const select = ( state ) => {
  console.log(state)
  const currentEpisode = Object.keys(state.data.user.roster).length - 2;
  const roster = state.data.user.roster[currentEpisode];
  const characters = state.data.characters;
  const users = state.data.league.users;
  const username = state.data.user.username;
  return { roster, characters, users, username, currentEpisode };
};

export default connect( select )( Trade );