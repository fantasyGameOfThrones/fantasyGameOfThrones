import React, {Component} from 'react';
import {connect} from 'react-redux';

import './footer.less';

class Footer extends Component {

  render() {
    return (
      <div className="got__footer">
        <h1>Footer</h1>
      </div>
    );
  }

};

const select = (state) => {
  return {};
};

export default connect(select)(Footer);