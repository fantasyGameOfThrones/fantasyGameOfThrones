import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../services/actionCreators.jsx';
// import io from 'socket.io';
import io from './../../node_modules/socket.io/node_modules/socket.io-client/socket.io.js';

class Draft extends Component {
  constructor(){
    super();
    this.socket = null;

  }
  startDraft() {
    this.props.dispatch(actions.startDraft());
  }
  openSocket() {

    this.socket = io.connect('http://localhost:8080');

    this.socket.on('lemur', () => {
      console.log('lemur');
    });

  }
  moose() {
    this.socket.emit('moose');
  }
  render() {
    return (
      <div>
        <h1>Draft</h1>
        <input type="button" onClick={this.openSocket.bind(this)} value="connect"/>
        <input type="button" onClick={this.moose.bind(this)} value="ping"/>
        <input type="button" onClick={this.startDraft.bind(this)} value='Start Draft'/>
      </div>
    );
  }
};

const select = ( state ) => {
  return {
    characters: state.characters,
    draft: state.draft
  };
};

export default connect( select )( Draft );