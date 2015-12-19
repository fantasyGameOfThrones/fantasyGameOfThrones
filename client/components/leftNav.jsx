import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeftNav extends Component {

  render() {
    return (
      <div id="left">
        <h1>Left Panel</h1>
      </div>
    );
  }
  
};

const select = ( state ) => {
  return {};
};

export default connect( select )( LeftNav );