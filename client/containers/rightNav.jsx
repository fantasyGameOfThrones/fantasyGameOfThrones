import React, {Component} from 'react';
import {connect} from 'react-redux';
import LeagueRanking from '../components/leagueRanking.jsx';

export default class RightNav extends Component {

  render() {
    return <div id="right"><LeagueRanking /></div>;
  }

};

const select = (state) => {
  return {};
};

export default connect(select)(RightNav);