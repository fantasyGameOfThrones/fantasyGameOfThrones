import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../services/actionCreators.jsx';

class LeftNav extends Component {
  render() {
    const tabs = ['HOME','DRAFT','TRADE']
    return (
      <div id="left">
        <ul>
          {tabs.map((tab, i)=><li key={i} onClick={this.navigate.bind(this, tab)}>{tab}</li>)}
        </ul>
      </div>
    );
  }
  navigate(tab){
    console.log(`#func to nav to ${tab}`);
    this.props.dispatch(actions.navigateTo(tab));
  }
  
};

const select = ( state ) => {
  return {};
};

export default connect( select )( LeftNav );