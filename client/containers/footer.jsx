import React, {Component} from 'react';
import {connect} from 'react-redux';

class Footer extends Component {

  render() {
    return <div id="footer"><h1>Footer</h1></div>;
  }

};

const select = (state) => {
  return {};
};

export default connect(select)(Footer);