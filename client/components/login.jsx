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
    this.props.dispatch(actions.changeAuthDisplay('SIGNUP'));
  }


  render() {
    return (
      <div>
        <div>
          <input type="textarea" id="usernameLogin" placeholder="email"/>
          <input type="password" id="passwordLogin"placeholder="password"/>
          <button className='clickable' onClick={this.loginClick.bind(this)}>Login</button>
        </div>
        <button className='clickable' onClick={this.signupClick.bind(this)}>Go To Sign Up</button>
      </div>
    );
  }

};

const select = (state) => {
  return {
  };
};

export default connect(select)(Login);