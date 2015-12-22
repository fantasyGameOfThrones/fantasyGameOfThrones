import * as action from './services/actionConstants.jsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './containers/footer.jsx';
import Header from './containers/header.jsx';
import Content from './containers/content.jsx';
import LeftNav from './containers/leftNav.jsx';
import RightNav from './containers/rightNav.jsx';

class App extends Component {

  render() {
    return (
      <div id="composedApp">
        <Header />
        <div id="body">
          <LeftNav />
          <Content />
          <RightNav />
        </div>
        <Footer />
      </div>
    );
  }

}

let select = function( state ){
  return { token: state.token };
};

export default connect( select )( App );