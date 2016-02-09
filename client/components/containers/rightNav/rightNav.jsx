import React, {Component} from 'react';
import {connect} from 'react-redux';
import LeagueRanking from './../../pages/leagueRanking/leagueRanking.jsx';

import './rightNav.less'

export default class RightNav extends Component {

  render() {
    return (
      <div className="got__right_nav">
        <LeagueRanking />
      </div>
    );
  }

};

const select = (state) => {
  return {};
};

export default connect(select)(RightNav);