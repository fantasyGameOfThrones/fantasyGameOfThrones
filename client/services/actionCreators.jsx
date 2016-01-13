'use strict';
import network from './network.jsx';

import * as auth from './actionCreators/auth.jsx';
import * as league from './actionCreators/league.jsx';
import * as navigation from './actionCreators/navigation.jsx';
import * as user from './actionCreators/user.jsx';
import * as draft from './actionCreators/draft.jsx';

export default Object.assign({}, auth, league, navigation, user, draft);

export {auth, league, navigation, user, draft}


