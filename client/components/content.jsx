import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../services/store.jsx';
import Home from './home.jsx';
import Trade from './trade.jsx';
import Draft from './draft.jsx';


class Content extends Component {

  //will render differently depending on state.ui.content
  renderMain(){
    switch(store.getState().ui.contentDisplay){
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

let select = ( state ) => {
  return {
    selectedPlayer: state.ui.selectedPlayer,
    contentDisplay: state.ui.contentDisplay,
    characters: state.data.characterData,
  };
};

export default connect ( select )( Content );




