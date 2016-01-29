import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../services/actionCreators.jsx';
// import io from 'socket.io';
import io from './../../node_modules/socket.io/node_modules/socket.io-client/socket.io.js';

class Draft extends Component {
  constructor(props){
    super(props);
    this.socket = null;
    this.state = {};
  }

  startDraft() {
    this.props.dispatch(actions.startDraft());
  }

  openSocket() {
    this.socket = io.connect('http://localhost:8080');

    this.socket.on('sendLeagueId', () => {
      console.log('sendLeageId heard');
      this.socket.emit('returnLeagueId', {league_id:1})
    });

    this.socket.on('lemur', () => {
      console.log('lemur');
    });

    this.socket.on('updateStore', (state) => {
      this.setState(state);
    })

  }
  init () {
    this.socket.emit('init', this.props.self.id);
  }
  print () {
    console.log(this.props.self.id);
    console.log(this.props)
  }
  moose() {
    this.socket.emit('moose');
  }
  renderLoggedOn () {
    return (
      <div>
        <div>
          <span>Logged On</span>
          {this.state.teams.map((team,i) => {          
            return team.loggedOn ? (
              <div key={i}>
                {this.props.league.users
                  .filter((user) => user.id === team.id)
                  .map((user,i) => {
                    return (
                      <div key={i}>
                        {user.username}
                      </div>
                    )
                  }
                )}
              </div>) : null
            }
          )}
        </div>
        <div>
          <span>Not Logged On</span>
          {this.state.teams.map((team)=>{
            return !team.loggedOn ? (
              <div>
                {this.props.league.users
                  .filter((user)=> user.id === team.id)
                  .map((user, i) => {
                    return (
                      <div key={i}>
                        {user.username}
                      </div>
                    )
                  })
                }

              </div>) : null
            }
          )}
        </div>
      </div>
    )
  }

  renderDraftPanel(){
    return (
      <div className='draft_panel'>
        {this.renderLoggedOn()}
      </div>

    )
  }
  render() {
    console.log('state: ', this.state);
    console.log('props:', this.props);
    return (
      <div className="draft_container">

        {this.props.draft.draftStatus === 'PRE_DRAFT' ? (<nav>
          <input key={1} type="button" onClick={this.openSocket.bind(this)} value="connect"/>
          <input key={2} type="button" onClick={this.init.bind(this)} value="init"/>
          <input key={3} type="button" onClick={this.print.bind(this)} value="print"/>
          <input key={4} type="button" onClick={this.moose.bind(this)} value="ping"/>
          <input key={5} type="button" onClick={this.startDraft.bind(this)} value='Start Draft'/>
        </nav>) : null}

        {this.state.draftStatus ? this.renderDraftPanel() : null}

      </div>
    );
  }
};

const select = ( state ) => {
  return {
    self:state.data.auth.self,
    characters: state.data.characters,
    draft: state.data.draft,
    league: state.data.league
  };
};

export default connect( select )( Draft );