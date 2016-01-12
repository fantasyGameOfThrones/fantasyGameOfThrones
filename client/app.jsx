import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './containers/footer.jsx';
import Header from './containers/header.jsx';
import Content from './containers/content.jsx';
import RightNav from './containers/rightNav.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';

class App extends Component {
  composedApp() {
    return (
      <div id="composedApp">
        <Header />
        <div id="body">
          <Content />
          <RightNav />
        </div>
        <Footer />
      </div>
    );
  }

  render() {
    if (this.props.token) {
      return this.composedApp();
    }
    if (this.props.authDisplay === 'LOGIN') {
      return <Login/>;
    } else {
      return <Signup/>;
    }
  }

}

let select = (state) => {
  return { 
    token: state.data.auth.token,
    authDisplay: state.ui.authDisplay
  };
};

export default connect(select)(App);