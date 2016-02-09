import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './../../../services/actionCreators.jsx';

import './joinLeague.less';

class JoinLeague extends Component {
  createLeague() {
    let leagueName = document.getElementById('leagueNameInput');
    this.props.dispatch(actions.createLeague(leagueName.value));
    leagueName.value = '';
  }

  acceptInvitation(invitationId) {
    this.props.dispatch(actions.acceptInvitation(invitationId));
  }

  declineInvitation(invitationId) {
    this.props.dispatch(actions.declineInvitation(invitationId));
  }

  renderInvitations() {
    if (this.props.invitations && this.props.invitations.length !== 0) {
      return (
        <div>
          <h3> Pending invitations: </h3>
          {this.props.invitations.map((invite) => {
            return <div>
              Invitation to league {invite.leagueId}
              <button className='clickable' onClick={() => this.acceptInvitation(invite.id)}>Accept and Join</button>
              <button className='clickable' onClick={() => this.declineInvitation(invite.id)}>Decline</button>
            </div>
          })}
        </div>
      );
    } else {
      return (<h3>You are not currently invited to any leagues. Create a league instead!</h3>);
    }
  }

  render(){
    return (
      <div className="got__joinLeague">
        {this.renderInvitations()}
        <h3>Create A League</h3>
        <div>
          <input type="textarea" id="leagueNameInput" placeholder="League Name"/>
          <button className='clickable' onClick={this.createLeague.bind(this)}>Create League</button>
        </div>
      </div>
    );
  }
}

const select = (state) => {
  return {
    invitations: state.data.invitations,
  };
};

export default connect( select )( JoinLeague );