import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Trade extends Component {

  data() {

  }

  render() {
    return (
      <div>
        <h1>Trade Stuff</h1>
      </div>
    );
  }
}

const select = ( state ) => {
  return {

  };
};

export default connect( select )( Trade );