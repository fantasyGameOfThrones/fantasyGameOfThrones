import React, {Component} from 'react';
import {connect} from 'react-redux';
import Home from './../../pages/home/home.jsx';
import Trade from './../../pages/trade/trade.jsx';
import Draft from './../../pages/draft/draft.jsx';
import Login from './../../pages/login/login.jsx';
import JoinLeague from './../../pages/joinLeague/joinLeague.jsx';
import Rosters from './../../pages/roster/rosters.jsx';
import League from './../../pages/league/league.jsx';

import './content.less';

class Content extends Component {

  //will render differently depending on state.ui.content
  renderMain() {
    switch(this.props.contentDisplay) {
      case 'HOME':
        return <Home/>;
      case 'TRADE':
        return <Trade/>;
      case 'DRAFT':
        return <Draft/>;
      case 'JOIN_A_LEAGUE':
        return <JoinLeague />;
      case 'LEAGUE':
        return <League />;
      case 'ROSTERS':
        return <Rosters rosterUser={this.props.rosterUser}/>;
      default:
        return <Home/>;
    }
  }

  render() {
    return (
      <div className="got__content">
        {this.renderMain()}
      </div> 
    );
  }

};

const select = (state) => {
  return {
    contentDisplay: state.ui.contentDisplay,
    rosterUser: state.ui.rosterUser,
  };
};

export default connect(select)(Content);




