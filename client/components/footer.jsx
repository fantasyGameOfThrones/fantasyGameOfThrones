import React from 'react';
import { connect } from 'react-redux';

let Footer = React.createClass({

  render() {
    return <div id="footer"><h1>Footer</h1></div>;
  },

});

module.exports = connect( select )( Footer );