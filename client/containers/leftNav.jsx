import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class LeftNav extends Component {
  renderTabs(tabs) {
    return tabs.map((tab, i) => {
      return (
        <li key={i} 
            className="clickable"
            onClick={this.navigate.bind(this,tab)}>
          {tab}
        </li>
      );
    });
  }
  render() {
    const tabs = ['HOME', 'DRAFT', 'TRADE', 'RANKINGS', 'ROSTERS', 'LOGOUT']
    return (
      <div id="left">
        <ul>
          {this.renderTabs(tabs)}
        </ul>
      </div>
    );
  }
  navigate(tab) {
    if(tab==='LOGOUT'){
      return this.props.dispatch(actions.logOut());
    }
    this.props.dispatch(actions.navigateTo(tab));
  }
  
};

const select = (state) => {
  return {};
};

export default connect(select)(LeftNav);