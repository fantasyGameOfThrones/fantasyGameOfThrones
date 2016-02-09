import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './../../../services/actionCreators.jsx';

import './signup.less';

class Signup extends Component{
  
  loginClick() {
    this.props.dispatch(actions.changeAuthDisplay('LOGIN'));
  }

  signupClick() {
    let ubox = document.getElementById('usernameSignup');
    let ebox = document.getElementById('emailSignup');
    let pbox = document.getElementById('passwordSignup');
    this.props.dispatch(actions.signUp(ubox.value, ebox.value, pbox.value));
    ubox.value = ebox.value = pbox.value = '';
  }


  render() {
    return (
      <div className="got__signup">
        <div>
          <input type="textarea" id="usernameSignup" placeholder="username"/>
          <input type="textarea" id="emailSignup" placeholder="email"/>
          <input type="password" id="passwordSignup" placeholder="password"/>
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