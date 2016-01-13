'use strict';
import network from './network.jsx';

import * as auth from './actionCreators/auth.jsx';
import * as league from './actionCreators/league.jsx';
import * as ui from './actionCreators/ui.jsx';
import * as user from './actionCreators/user.jsx';


export default Object.assign({}, auth, league, ui, user);

export {auth, league, ui, user}


