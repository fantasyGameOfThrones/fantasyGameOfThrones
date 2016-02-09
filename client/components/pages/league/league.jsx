import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './../../../services/actionCreators.jsx';

import './league.less';

class League extends Component {
  advanceLeague() {
    this.props.dispatch(actions.advanceLeague(this.props.league.id, this.props.league.latestSeen));
  }

  leaveLeague() {
    this.props.dispatch(actions.leaveLeague());
  }

  render() {
    let season, episode, episodeText;

    if (this.props.league.latestSeen % 10 === 0) {
      season = Math.floor(this.props.league.latestSeen/10);
      episode = 10;
    } else {
      season = Math.floor(this.props.league.latestSeen/10 + 1);
      episode = this.props.league.latestSeen % 10;
    }

    episodeText = 'Season ' + season + ', Episode ' + episode;
    return (
      <div className="got__league">
        <h1>League</h1>
        <div className="next_episode">
          <div> Latest seen: {episodeText} </div>
          <button onClick={this.advanceLeague.bind(this)}>We've seen the next episode, show us the results!</button>
        </div>
        <div className="leave_league">
          <button onClick={this.leaveLeague.bind(this)}>Leave League</button>
        </div>
      </div>
    );
  }
};

const select = (state) => {
  return {
    id: state.data.auth.self.id,
    league: state.data.league,
  };
};

export default connect( select )( League );