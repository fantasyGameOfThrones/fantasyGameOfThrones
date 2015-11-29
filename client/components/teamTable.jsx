import React from 'react';
import { connect } from 'react-redux';

let TeamTable = React.createClass({

  render() {
    return <table className="teamTable">
      <caption> Team Members </caption>
      <thead>
        <tr>
        <td className="heading">First Name</td>
        <td className="heading">Last Name</td>
        <td className="heading">House</td>
        </tr>
      </thead>
      <tbody>
      { this.props.team.map(( character ) => {
        return <tr key={ character.id }>
          <td className="data firstName">{character.firstName}</td>
          <td className="data lastName">{character.lastName}</td>
          <td className="data house">{character.house}</td>
        </tr>
      }) }
      </tbody>
    </table>
  },

});

let select = ( state ) => {
  console.log('rendering, team is: ', state.data.teamData);

  return {
    team: state.data.teamData,
  };
};

module.exports = connect( select )( TeamTable );