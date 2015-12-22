import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../services/store.jsx';
import Home from '../components/home.jsx';
import Trade from '../components/trade.jsx';
import Draft from '../components/draft.jsx';

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
      default:
        return <Home/>
    }
  }
  render() {
    return (
      <div id='center'>
        {this.renderMain()}
      </div> 
    )
  }

};

const select = (state) => {
  return {
    contentDisplay: state.ui.contentDisplay,
  };
};

export default connect(select)(Content);




