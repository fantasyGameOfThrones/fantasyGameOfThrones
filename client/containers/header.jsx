import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Header extends Component {

  render() {
    return (
      <div id="header">
        <input type="button" onClick={this.testNetwork.bind(this)} value="network test"/>
        <h1>Fantasy Game of Thrones</h1>
        <button onClick={this.goToNewLeague.bind(this)}>New League</button>
      </div>
    );
  }

  testNetwork() {
    this.props.dispatch(actions.updateUser(1, {
      email:'rjwholey@gmail.com',
      username:'ser_ryan',
      leagueId: 1,
      episodes: {
        43: [1,2,3,4,5,6,7,8,9,10],
        54: [1,2,3,4,5,6,7,8,9,10],
        82: [1,2,3,4,5,6,7,8,9,10],
        45: [1,2,3,4,5,6,7,8,9,10],
        66: [1,2,3,4,5,6,7,8,9,10],
        58: [1,2,3,4,5,6,7,8,9,10],
      }
    }));
  }

  goToNewLeague() {
    console.log('here');
    this.props.dispatch(actions.navigateTo('NEW_LEAGUE'));
  }

};

const select = (state) => {
  return {
  };
};

export default connect(select)(Header);