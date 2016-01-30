import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../services/actionCreators.jsx';
import io from 'socket.io-client';

const SOCKET_IP = process.env.SOCKET_IP.toString() || "localhost"

class Draft extends Component {

  constructor(props){
    super(props);
    this.socket = null;
    this.state = {picked: {}};
  }

  static getTime (seconds) {
    var timeString = '';
    if(!seconds){
      timeString = '0:00';
    }else{
      timeString = (seconds / 60 | 0).toString();
      timeString += ':';
      timeString += seconds % 60 < 10 ? '0' : '';
      timeString += (seconds % 60).toString();
    }
    return timeString;
  }

  componentDidMount () {
    let teamById = {};
    let charById = {};

    this.props.league.users.forEach((user, i) => {
      teamById[user.id] = user;
    });

    this.props.characters.forEach((char, i) => {
      charById[char.id] = char;
    });

    this.setState({
      userById:teamById,
      charById
    });

    return true;
  }

  startDraft() {
    this.props.dispatch(actions.startDraft());
    this.socket.emit('startDraft');
  }

  openSocket() {
    this.socket = io.connect(`http://${SOCKET_IP}:8080`);

    this.socket.on('sendLeagueId', () => {
      this.socket.emit('returnLeagueId', {league_id:1});
    });

    this.socket.on('lemur', () => {
      console.log('lemur');
    });

    this.socket.on('updateStore', (state) => {
      if(this.componentDidMount()) {
        this.setState(state);
      }
    })
    this.socket.on('charDrafted', (pick) => {
      console.log('heard');
      this.state.picked[pick.char_id] = true;
      this.setState({
        picked:this.state.picked
      })
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

  renderUser(id, key) {
    return (
      <div className={this.state.currentTeamId === id ? 'current_team':''} key={key}>
        {this.state.userById[id].username}
        {this.state.teams[id-1].characters.map((id, i) => (<div key={i}>{this.state.charById[id].name}</div>))}
      </div>
    );
  }

  renderUsers () {
    const loggedOn = [];
    const notLoggedOn = [];

    this.state.teams.forEach((team,i) => {
      const el = this.renderUser(team.id, i);
      team.loggedOn ? loggedOn.push(el) : notLoggedOn.push(el);
    });

    return (
      <div className='draft_user_log'>
        <div>
          <span>Logged In</span>
          {loggedOn}
        </div>
        <div>
          <span>Not Logged In</span>
          {notLoggedOn}
        </div>
      </div>
    );
  }

  renderTimer () {
    return (
      <div className='draft_timer'>
        <span>{Draft.getTime(this.state.timer.seconds)}</span>
      </div>
    );
  }

  draftCharacter (id) {
    if(this.props.self.id === this.state.currentTeamId){
      this.socket.emit('draftCharacter',
        {team_id: this.props.self.id, char_id: id}
      )
      this.state.picked[id] = true;
      this.setState({
        picked:this.state.picked
      });
    }
  }

  renderCharacters () {
    return (
      <div className='draft_characters'>
        {this.props.characters
          .filter((char) => !this.state.picked[char.id])
          .map((char,i) => {
          return (
            <div 
              key={i} 
              className="draft_character_container"
              onClick={this.draftCharacter.bind(this,char.id)}
              >
              <span > {char.name} </span>
            </div>
          );
        })}
      </div>
    );
  }

  renderDraftPanel () {
    return (
      <div className='draft_panel'>
        <div className='draft_user_panel'>
          {this.renderUsers()}
          {this.state.timer && this.state.timer.seconds ? this.renderTimer() : null}
        </div>
        {this.state.draftStatus === 'MID_DRAFT' ? this.renderCharacters() : null}
      </div>
    );
  }

  render() {
    return (
      <div className="draft_container">

        {this.props.draft.draftStatus === 'PRE_DRAFT' || /*testing*/this.props.draft.draftStatus === 'MID_DRAFT'? 
        (<nav>
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