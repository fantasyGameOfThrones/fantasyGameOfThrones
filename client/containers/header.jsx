import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Header extends Component {

  render() {
    return (
      <div id="header">
        <h1>Fantasy Game of Thrones</h1>
        <button onClick={this.goToNewLeague.bind(this)}>New League</button>
      </div>
    );
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