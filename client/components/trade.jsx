import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Trade extends Component {
  // NEEEED:
  // --->  A save button that sends updated roster to db
  // ---> Buttons with an onClick event for each character to be swapped
  // --> Buttons for each roster char to be swapped
      // --> Maybe once roster selected one exists, (extra param on props, rosterClicked)
      //    click on undrafted one and they will swap? ( for now )
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
    const {dispatch} = this.props;
    let {undrafted, userRoster} = this.data();
    return (
      <div>
        <h1>Trade Stuff</h1>
        <ul>
        <h2> YOUR ROSTER </h2>
          {userRoster.map((char) => {
            return (
              <li key={char.id}>
                <div>{char.name}</div>
                <button onClick={() => this.props.swap(char.id)}>
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
                <button onClick={() => this.props.swap(char.id)}>
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
  console.log(state)
  const currentEpisode = Object.keys(state.data.user.roster).length - 2;
  const roster = state.data.user.roster[currentEpisode];
  const characters = state.data.characters;
  const users = state.data.league.users;
  const username = state.data.user.username;
    
  let firstToSwap = 0;
  let secondToSwap = 0;

  let swap = (entry) => {
    if (!firstToSwap) {
      firstToSwap = entry;
    } else if (!secondToSwap) {
      secondToSwap = entry;
      roster.forEach((char) => {
        if (char[0] === firstToSwap) {
          char[0] = secondToSwap;
          console.log(char[0]);
        }
      })
      firstToSwap = 0;
      secondToSwap = 0;
    }
  };

  return { roster, characters, users, username, currentEpisode, swap };
};

export default connect( select )( Trade );