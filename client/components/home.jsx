import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Home extends Component {

  renderMainTable() {
    const context = this;
    return (
      <table className="mainTable" >    
        <caption> Roster for {this.props.username}</caption>   
        <thead>   
          <tr>    
            <td className="heading">Character</td>   
            {this.props.episodes.map((ep) => {
              return (
                <td key={ep} className="heading">Episode {ep}</td>
              )
            })}
          </tr>   
        </thead>    
        <tbody>   
          {this.props.characters.map((char) => {   
            return (
              <tr key={char.id}>    
                <td className="data charName">
                  <div>{char.name}</div>
                  <img className="thumb" src={char.imageUrl}></img>
                </td>
                {this.props.episodes.map((ep) => {
                  return <td className="data" key={ep}>
                    {context.props.roster[ep][char.id]}
                  </td>
                })}
              </tr>
            ) 
          })}   
        </tbody>    
      </table>
    )
  }

  // replace ul with this.renderMainTable() once it's worked out
  render(){
    return this.renderMainTable();
  }
}

const select = (state) => {
  let characters = [];
  let episodes = [];
  let roster = state.data.auth.self.roster || {};
  let temp = {};
  if (state.data.characters) {
    // get char ids from user roster
    let charIds = {};
    for (let key in roster) {
      if (key !== 'points') {
        // get episodes
        episodes.push(key);
        temp[key] = {};
        // get drafted characters
        roster[key].forEach(function(tuple) {
          if (!characters[tuple[0]]) {
            // add charid
            charIds[tuple[0]] = tuple[0];
            temp[key][tuple[0]] = tuple[1];
          }
        });
      }
    }
    characters = state.data.characters.filter((char) => {
      return charIds[char.id];
    });
  }
  episodes = episodes.sort((a,b) => {return +a > +b});
  roster = temp;

  return {
    username: state.data.auth.self.username,
    characters,
    episodes,
    roster,
  };
};

export default connect(select)(Home);
