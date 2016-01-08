import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Home extends Component {
  // replace ul with this.renderMainTable() once it's worked out
  render(){
    return (
      <div>
        <h1>Home</h1>
        <ul>
          HOME
        </ul>
      </div>
    );
  }

  renderMainTable() {
    const context = this;
    return (
      <table className="mainTable" >    
        <caption> My Roster </caption>   
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
                <td className="data">
                  <div>{char.name}</div>
                  <div>{char.house}</div>
                  <img className="thumb" src={char.imageUrl}></img>
                </td>
                {this.props.episodes.map((ep) => {
                  return <td className="data" key={ep}>
                    {context.props.roster[char.id][ep]}
                  </td>
                })}
              </tr>
            ) 
          })}   
        </tbody>    
      </table>
    )
  }
}

const select = (state) => {
  // let chars = [];
  // if (state.data.characters) {
  //   chars = state.data.characters.filter((char) => {
  //     return state.data.user.characters[char.id];
  //   });
  // }
  // const roster = state.data.user.roster || {};

  return {
    // characters: chars,
    // episodes: [1,2,3,4,5,6,7,8,9,10],
    // roster,
  };
};

export default connect(select)(Home);