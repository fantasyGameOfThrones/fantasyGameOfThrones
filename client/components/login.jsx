import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Login extends Component{
  loginClick() {
    let ubox = document.getElementById('usernameLogin');
    let pbox = document.getElementById('passwordLogin');
    this.props.dispatch(actions.logIn(ubox.value, pbox.value));
    ubox.value = pbox.value = '';
  }

  signupClick() {
    let ubox = document.getElementById('usernameSignup');
    let pbox = document.getElementById('passwordSignup');
    this.props.dispatch(actions.signUp(ubox.value, pbox.value));
    ubox.value = pbox.value = '';
  }


  render() {
    return (
      <div>
        <div>
          <input type="textarea" id="usernameLogin" placeholder="email"/>
          <input type="password" id="passwordLogin"placeholder="password"/>
          <button className='clickable' onClick={this.loginClick.bind(this)}>Login</button>
        </div>
        <div>
          <input type="textarea" id="usernameSignup" placeholder="email"/>
          <input type="password" id="passwordSignup"placeholder="password"/>
          <button className='clickable' onClick={this.signupClick.bind(this)}>Signup</button>
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