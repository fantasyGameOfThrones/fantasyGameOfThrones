'use strict';
import network from './network.jsx';

import * as auth from './actionCreators/auth.jsx';
import * as league from './actionCreators/league.jsx';
import * as ui from './actionCreators/ui.jsx';
import * as user from './actionCreators/user.jsx';
import * as draft from './actionCreators/draft.jsx';
import * as trade from './actionCreators/trade.jsx';

export default Object.assign({}, auth, league, ui, user, draft, trade);

export default Object.assign({}, auth, league, ui, user, draft, trade);

export {auth, league, ui, user, draft, trade}

