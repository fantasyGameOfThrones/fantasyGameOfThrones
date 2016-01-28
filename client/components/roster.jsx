import React, {Component} from 'react';
import actions from '../services/actionCreators.jsx';

class Roster extends Component {

  data() {
    // formats data from the roster the db sent us to something
    // more usable for the table
    let episodes = [];
    let roster = this.props.roster;
    let temp = {};
    let characters = [];
    if (this.props.characters) {
      const charIds = {};
      for (const key in roster) {
        if (key !== 'points') {
          episodes.push(+key);
          temp[key] = {};
          roster[key].forEach(function(tuple) {
            temp[key][tuple[0]] = +tuple[1];
            if (!charIds[tuple[0]]) {
              charIds[tuple[0]] = +tuple[0];
            }
          });
        }
      }
      characters = this.props.characters.filter((char) => {
        return charIds[char.id];
      });
    }
    episodes = episodes.sort((a,b) => {return +a > +b});
    roster = temp;
    return {roster, episodes, characters};
  }

  renderRoster() {
    const {roster, episodes, characters} = this.data();
    const context = this;
    return (
      <table className="mainTable" >    
        <caption> Roster for {this.props.username}</caption>   
        <thead>   
          <tr>    
            <td className="heading">Character</td>   
            {episodes.map((ep) => {
              return (
                <td key={ep} className="heading">Episode {ep}</td>
              )
            })}
          </tr>   
        </thead>    
        <tbody>   
          {characters.map((char) => {   
            return (
              <tr key={char.id}>    
                <td className="data charName">
                  <div>{char.name}</div>
                  <img className="thumb" src={char.imageUrl}></img>
                </td>
                {episodes.map((ep) => {
                  return <td className="data" key={ep}>
                    {roster[ep][char.id] === undefined || roster[ep][char.id] === null ? '' : roster[ep][char.id]}
                  </td>
                })}
              </tr>
            ) 
          })}   
        </tbody>    
      </table>
    )
  }

  render(){
    return this.renderRoster();
  }
};

export default Roster;

