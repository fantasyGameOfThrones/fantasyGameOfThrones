import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';
import classNames from 'classnames';

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
      case 'NEW LEAGUE':
        return this.props.dispatch(actions.navigateTo('NEW_LEAGUE'));
      case 'ROSTERS':
        return this.props.dispatch(actions.changeRosterUser(this.props.user));
      default:
        this.props.dispatch(actions.navigateTo(tab));
    }
  }

  render() {
    return (
      <div id="header">
        <div className="leftHeader">
          <h1>FGOT</h1>
          <ul className="leftNavTabs">
            {this.renderTabs(this.props.tabs)}
          </ul>
        </div>
        <div className="RightHeader">
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
  if (!state.data.league) {
    tabs.push('NEW LEAGUE');
  }

  return {
    tabs,
    user: state.ui.rosterUser || state.data.auth.self,
    currentTab: state.ui.contentDisplay || 'HOME',
  };
};

export default connect(select)(Header);



