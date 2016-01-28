import React, {Component} from 'react';
import {connect} from 'react-redux';
import Home from '../components/home.jsx';
import Trade from '../components/trade.jsx';
import Draft from '../components/draft.jsx';
import Login from '../components/login.jsx';
import NewLeague from '../components/newLeague.jsx';
import Rosters from '../components/rosters.jsx';
import League from '../components/league.jsx';

class Content extends Component {

  //will render differently depending on state.ui.content
  renderMain() {
    switch(this.props.contentDisplay) {
      case 'HOME':
        return <Home/>
      case 'TRADE':
        return <Trade/>
      case 'DRAFT':
        return <Draft/>
      case 'NEW_LEAGUE':
        return <NewLeague />;
      case 'LEAGUE':
        return <League />;
      case 'ROSTERS':
        return <Rosters rosterUser={this.props.rosterUser}/>;
      default:
        return <Home/>
    }
  }
  render() {
    return (
      <div id='center'>
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




