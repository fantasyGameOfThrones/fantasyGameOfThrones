import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './../../../services/actionCreators.jsx';

import './login.less';

class Login extends Component{
  loginClick() {
    let ubox = document.getElementById('username') || '';
    let pbox = document.getElementById('password') || '';
    this.props.dispatch(actions.logIn(ubox.value, pbox.value));
    ubox.value = pbox.value = '';
  }

  handleKeyDown(e){
    e.which === 13 ? this.loginClick() : null
  }

  signupClick() {
    this.props.dispatch(actions.changeAuthDisplay('SIGNUP'));
  }

  render() {
    return (
      <div className="got__login">
        <div className="container" id="login">
          <h2 className="title">Log in</h2>
          <div className="signup-panel" onKeyDown={(e)=>this.handleKeyDown.call(this,e)}>
              <input id="username" type="username" className="login-username" placeholder="Your username" />
              <input id="password" type="password" className="login-password" placeholder="Password" />
            <a href="?page=reset"><p className="forgot-password">Forgot password?</p></a>
          </div>
          <button onClick={this.loginClick.bind(this)}>Log in</button>
          <div className="footer">
              <div className="remember">
                <input type="checkbox" onChange={()=>null}checked/> 
                <span>Remember me</span>
              </div>
              <span className="clickable" onClick={this.signupClick.bind(this)}>Signup</span>
          </div>
        </div>
      </div>
    );
  }
};

const select = (state) => {
  return {
  };
};

export default connect(select)(Login);



/*
 <div className="got__login">
      






    
      </div>






*/
