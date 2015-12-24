import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Home extends Component {
  render(){
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

const select = (state) => {
  return {

  };
};

export default connect(select)(Home);