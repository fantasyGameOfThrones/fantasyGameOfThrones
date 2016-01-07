import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './containers/footer.jsx';
import Header from './containers/header.jsx';
import Content from './containers/content.jsx';
import LeftNav from './containers/leftNav.jsx';
import RightNav from './containers/rightNav.jsx';
import Login from './components/login.jsx';

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

  // render() {
  //   return this.props.token ? this.composedApp() : <Login/>;
  // }

}

let select = (state) => {
  return { 
    token: state.data.auth.token
  };
};

export default connect(select)(App);