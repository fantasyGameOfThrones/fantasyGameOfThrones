import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './../../../services/actionCreators.jsx';
import classNames from 'classnames';

import './header.less';

class Header extends Component {

  renderTabs(tabs) {
    var context = this;
    return tabs.map((tab, i) => {
      var classes = classNames('clickable', {
        currentTab: context.props.currentTab === tab,
      });
      return (
        <li key={i} 
            className={classes}
            onClick={this.navigate.bind(this,tab)}>
          {tab}
        </li>
      );
    });
  }

  navigate(tab) {
    switch(tab) {
      case 'LOGOUT':
        return this.props.dispatch(actions.logOut());
      case 'JOIN A LEAGUE':
        return this.props.dispatch(actions.navigateTo('JOIN_A_LEAGUE'));
      case 'ROSTERS':
        return this.props.dispatch(actions.changeRosterUser(this.props.user));
      default:
        this.props.dispatch(actions.navigateTo(tab));
    }
  }

  render() {
    return (
      <div className="got__header">
        <div className="left_header">
          <h1>FGOT</h1>
          <ul className="left_nav_tabs">
            {this.renderTabs(this.props.tabs)}
          </ul>
        </div>
        <div className="right_header">
          <ul>
            {this.renderTabs(['LOGOUT'])}
          </ul>
        </div>
      </div>
    );
  }

};

const select = (state) => {
  let tabs = ['HOME', 'DRAFT', 'TRADE', 'RANKINGS', 'ROSTERS'];
  if (Object.keys(state.data.league).length === 0) {
    tabs.push('JOIN A LEAGUE');
  } else {
    tabs.push('LEAGUE');
  }

  // check if emtpy object
  var rosterUser = Object.keys(state.ui.rosterUser).length === 0 ? state.data.auth.self : state.ui.rosterUser;

  return {
    tabs,
    user: rosterUser,
    currentTab: state.ui.contentDisplay || 'HOME',
  };
};

export default connect(select)(Header);



