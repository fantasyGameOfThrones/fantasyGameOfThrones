
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

var App = React.createClass({

  render() {
    return <h1>Hello, world!</h1>;
  },

});

var select = function( state ){
  return { token: state.token };
};

module.exports = connect( select )( App );