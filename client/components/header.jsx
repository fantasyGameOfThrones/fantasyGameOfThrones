import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../services/actionCreators.jsx';

class Header extends Component {

  render() {
    return (
      <div id="header">
        <h1>Fantasy Game of Thrones</h1>
        <input type="button" onClick={this.getCharacters.bind(this)} value="characters"/>
      </div>
    );
  }
  getCharacters() {
    this.props.dispatch(actions.getCharacters());
  }

};

let select = (state) => {
  return {
    selectedPlayer: state.ui.selectedPlayer,
    characters: state.data.characterData,
  }
}

export default connect(select)(Header);