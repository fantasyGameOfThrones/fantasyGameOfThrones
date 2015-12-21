import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Home extends Component {
  render(){
    return (
      <div>
        <h1>Home</h1>
        <ul>
          {this.renderChars()}
        </ul>
      </div>
    );
  }

  renderChars() {
    return this.props.characters.map((char, index) => {
      return (
        <li key={index}>{char.name}</li>
      );
    });
  }
}

const select = (state) => {
  let chars = [];
  if (state.data.characters) {
    chars = state.data.characters.filter((char) => {
      return state.data.user.episodes[char.id];
    });
  }

  return {
    characters: chars,
  };
};

export default connect(select)(Home);