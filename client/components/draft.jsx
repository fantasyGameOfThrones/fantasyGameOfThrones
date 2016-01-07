import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../services/actionCreators.jsx';
import io from 'socket.io-client';


class Draft extends Component {
  componentWillMount() {
    const url = `${location.protocol}//${location.hostname}:8090?leagueId=${this.props.leagueId}&userId=${this.props.userId}`;
    this.socket = io(url, { multiplex: false }); // force new connection
    this.socket.on(`DRAFT_STATE_${this.props.leagueId}`, (state) => {
      this.props.dispatch(actions.setDraftState(state));
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  startDraft() {
    this.socket.emit('action', {
      type: 'START_DRAFT',
      payload: {
        leagueId: this.props.leagueId
      }
    })
  }

  resetDraft() {
    this.socket.emit('action', {
      type: 'RESET_DRAFT',
      payload: {
        leagueId: this.props.leagueId
      }
    }) 
  }
  
  render(){
    console.log('draft:', this.props.draft)
    return (
      <div>
        <h1>Draft</h1>
        {this.props.draft.status === 'NOT_STARTED' ?
          <button onClick={this.startDraft.bind(this)}>Start Draft</button> :
          <button onClick={this.resetDraft.bind(this)}>Reset Draft</button>
        }
      </div>
    );
  }
};

const select = ( state ) => {
  // REMOVE THIS BEFORE CHECKING IN
  // DUMB HACKY WAY TO FAKE MANY USERS/LEAGUES:
  //   http://localhost:4000?<userId>&<leagueId>
  const [userId, leagueId] = location.search.replace(/\?/, '').split('&');
  return {
    userId,
    leagueId,
    draft: state.data.draft
  };
};

export default connect( select )( Draft );