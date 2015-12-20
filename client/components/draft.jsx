import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Draft extends Component {
  render(){
    return (
      <div>
        <h1>Draft</h1>
      </div>
    );
  }
};

const select = ( state ) => {
  return {

  };
};

export default connect( select )( Draft );