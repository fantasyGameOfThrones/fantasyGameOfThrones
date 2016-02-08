import React, {Component} from 'react';
import {connect} from 'react-redux';
import Footer from './components/containers/footer/footer.jsx';
import Header from './components/containers/header/header.jsx';
import Content from './components/containers/content/content.jsx';
import RightNav from './components/containers/rightNav/rightNav.jsx';
import Login from './components/pages/login/login.jsx';
import Signup from './components/pages/signup/signup.jsx';

import './app.less';

class App extends Component {

  composedApp() {
    
    return (
      <div id="composedApp" className="got__app">
        <Header />
        <div className="body_container">
          <Content />
          {this.props.contentDisplay !== 'DRAFT' ? <RightNav /> : null}
        </div>
        <Footer />
        {this.props.children}
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
    authDisplay: state.ui.authDisplay,
    contentDisplay: state.ui.contentDisplay
  };
};

export default connect(select)(App);