import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Login extends Component{
  loginClick() {
    let ubox = document.getElementById('usernameInput');
    let pbox = document.getElementById('passwordInput');
    this.props.dispatch(actions.logIn(ubox.value, pbox.value));
    ubox.value = pbox.value = '';
  }
  render() {
    return (
      <div>
        <input type="textarea" id="usernameInput" paceholder="email"/>
        <input type="password" id="passwordInput"paceholder="password"/>
        <div className='clickable' onClick={this.loginClick.bind(this)}>Login</div>
      </div>
    );
  }

};

const select = (state) => {
  return {
  };
};

export default connect(select)(Login);