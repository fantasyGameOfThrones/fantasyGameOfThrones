import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Trade extends Component {
  // dispatch each time a character is clicked, update the state

  //used to populate droppedHistory array (it may have duplicates so we iterate)
  createCharsWithImages(char, arr) {
    arr.forEach((item) => {
      if (item.id === char.id) {
        item.name = char.name;
        item.imageUrl = char.imageUrl;
      }
    });
  }

  data() {
    // Setup roster to contain images
    // charactersLeft filters through user roster, then league roster
    // whatever is left goes into undrafted array
    let tempRoster = {};     // build roster objects for userRoster array
    let allCharacters = {};  // used to add images to dropped players (character picked up)
    let droppedChecker = {}; // used for adding images to dropped players (character dropped)
    let charactersLeft = {}; // characters not in league
    let userRoster = [];     // final roster
    let undrafted = [];      // total undrafted
    let droppedHistory = []; // recent drop history

    // grab each char from roster that is currently apart of the roster (not dropped chars)
    this.props.roster.filter((character) => {
      if (character[2]) {
        droppedHistory.push({
          id: character[0],
          points: character[1],
          droppedFor: character[2],
          updatedAt: character[3]
        });
        droppedChecker[character[0]] = true;
      }
      return !character[2];
    })
    .forEach((char) => {
      if (!tempRoster[char[0]]) {
        tempRoster[char[0]] = {};
        tempRoster[char[0]].points = char[1];
        tempRoster[char[0]].droppedFor = char[2];
      }
    });
    //check if char is in roster
    // if yes, give it correct properties
    // if no, send it to charactersLeft
    this.props.characters.forEach((char) => {
      allCharacters[char.id] = char;
      // if char is in droppedHistory, populate the array with more attributes
      if (droppedChecker[char.id]) {
        this.createCharsWithImages(char, droppedHistory);
      }
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
      undrafted.push(charactersLeft[key]);  
    }

    //dropped history, sort by most recent, add image attr. to char it was traded for
    droppedHistory
      .sort((cur, next) => { 
        return new Date(cur.updatedAt) < new Date(next.updatedAt);
      })
      .forEach((char) => {
        if (allCharacters[char.id]) {
          let tradedChar = char.droppedFor;
          char.droppedImg = allCharacters[tradedChar].imageUrl;
          char.droppedName = allCharacters[tradedChar].name;
        }
      });

    return {undrafted, userRoster, droppedHistory};

  }

  render() {
  
    const {dispatch, tradeDisplay} = this.props;
    let {undrafted, userRoster, droppedHistory} = this.data();

    const buildDropHistory = (histArr, droppedFor) => {
      let name = 'name', image = 'imageUrl';
      if (droppedFor) {
        name = 'droppedName';
        image = 'droppedImg';
      }
      return histArr.map((char, i) => {
        var key = i;
        if (i < 8) {
          return (
            <li key={key}>
              <div>{char[name]}</div>
                <img className="thumb" src={char[image]}></img>
            </li>
          ); 
        }  
      }).filter((character) => {
        return character !== undefined;
      })
    };

    const buildTradeView = (roster, action) => {
      return roster.map((char) => {
        return (
          <li key={char.id}>
            <div>{char.name}</div>
            <button onClick={() => this.props.dispatch(actions.changeTradeChar(char.id, action))}>
              <img className="thumb" src={char.imageUrl}></img>
            </button>
          </li>
        );
      });
    };
    
    return (
      <div>
        <h1>Trade Stuff</h1>
        <button onClick={() => this.props.dispatch(actions.initiateTrade(tradeDisplay, this.props.currentEpisode))}>
          Submit Trade
        </button>
        <ul>
        <h2> YOUR ROSTER </h2>
          {buildTradeView(userRoster, 'DROP')}
        </ul>

        <ul>
        <h2>UNDRAFTED</h2>
          {buildTradeView(undrafted, 'ADD')}
        </ul> 
        <h2>TRADE HISTORY</h2>

        <ul>
        <h3>Dropped:</h3>
          {buildDropHistory(droppedHistory)}
        </ul> 

        <ul>
        <h3>For:</h3>
          {buildDropHistory(droppedHistory, true)}
        </ul>

      </div>
    );
  }
}

const select = ( state ) => {

  const currentEpisode = Object.keys(state.data.auth.self.roster).length - 1;
  const roster = state.data.auth.self.roster[currentEpisode];
  const characters = state.data.characters;
  const users = state.data.league.users;
  const username = state.data.auth.self.username;
  const tradeDisplay = state.ui.tradeDisplay;

  return { roster, characters, users, username, currentEpisode, tradeDisplay };
};

export default connect( select )( Trade );