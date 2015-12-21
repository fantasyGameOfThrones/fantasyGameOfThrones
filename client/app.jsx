import * as action from './services/actionConstants.jsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './components/footer.jsx';
import Header from './components/header.jsx';
import Content from './components/content.jsx';
import LeftNav from './components/leftNav.jsx';
import RightNav from './components/rightNav.jsx';

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