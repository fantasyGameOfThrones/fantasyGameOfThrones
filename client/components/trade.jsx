import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Trade extends Component {
  // dispatch each time a character is clicked, update the state

  data() {
    // Setup roster to contain images
    // charactersLeft filters through user roster, then league roster
    // whatever is left goes into undrafted array
    let tempRoster = {};
    let userRoster = []; // final roster
    let charactersLeft = {};
    let undrafted = [];
    console.log('props: ', this.props)
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
        tempRoster[char.id].inRoster = true;
        userRoster.push(tempRoster[char.id]);
      } else {
        charactersLeft[char.id] = {
          id: char.id,
          name: char.name,
          imageUrl: char.imageUrl
        };
      }
    });
    // ESTABLISH UNDRAFTED CHARACTERS
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
      charactersLeft[key].inRoster = false;
      undrafted.push(charactersLeft[key]);  
    }

    return {undrafted, userRoster};

  }

  render() {
  
    const {dispatch, tradeDisplay} = this.props;
    let {undrafted, userRoster} = this.data();

    return (
      <div>
        <h1>Trade Stuff</h1>
        <button onClick={() => this.props.dispatch(actions.initiateTrade(tradeDisplay, this.props.currentEpisode))}>Submit Trade</button>

        <ul>
        <h2> YOUR ROSTER </h2>
          {userRoster.map((char) => {
            return (
              <li key={char.id}>
                <div>{char.name}</div>
                <button onClick={() => this.props.dispatch(actions.changeTradeChar(char.id, 'DROP'))}>
                  <img className="thumb" src={char.imageUrl}></img>
                </button>
              </li>
            )
          })}
        </ul>

        <ul>
        <h2>UNDRAFTED</h2>
          {undrafted.map((char) => {
            return (
              <li key={char.id}>
                <div>{char.name}</div>
                <button onClick={() => this.props.dispatch(actions.changeTradeChar(char.id, 'ADD'))}>
                  <img className="thumb" src={char.imageUrl}></img>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

const select = ( state ) => {
  console.log("state: ", state)

  const currentEpisode = Object.keys(state.data.auth.self.roster).length - 2;
  const roster = !Object.keys(state.ui.rosterUser).length ? state.data.auth.self.roster[currentEpisode] : state.ui.rosterUser[currentEpisode + 1];
  const characters = state.data.characters;
  const users = state.data.league.users;
  const username = state.data.auth.self.username;
  const tradeDisplay = state.ui.tradeDisplay;
  console.log('ROSTER: ', roster)
  return { roster, characters, users, username, currentEpisode, tradeDisplay };
};

export default connect( select )( Trade );