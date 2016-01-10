import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Signup extends Component{
  loginClick() {
    this.props.dispatch(actions.changeAuthDisplay('LOGIN'));
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
          <input type="textarea" id="usernameSignup" placeholder="email"/>
          <input type="password" id="passwordSignup"placeholder="password"/>
          <button className='clickable' onClick={this.signupClick.bind(this)}>Signup</button>
        </div>
        <button className='clickable' onClick={this.loginClick.bind(this)}>Go To Log In</button>
      </div>
    );
  }

};

const select = (state) => {
  return {
  };
};

export default connect(select)(Signup);