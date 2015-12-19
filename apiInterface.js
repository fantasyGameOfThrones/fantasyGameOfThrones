/* DB MODELS BLURB

- each episode, each character 
    must produce 1 score based off 
    of an accumulation of events

- league owns many users
- users own many characters 
    joined with an 'episodes-owned' 
    table, which describes
    what characters a player owns,
    for which week
*/

/* API INTERFACE */

models = {
  user: {
    id: integer,
    username: string,
    password: string,
    email: string,
    leagueId: teamFK,
  },
  league: {
    id: integer,
    name: string,
    creator: userFK,
    members: [ userFK ],
    
  },
  character: {
    id: integer,
    name: string,
    house: string,
  },
  event: {
    id: integer,
    type: string,
    description: string,
    points: integer,
    season: integer,
    episode: integer,
    character: characterFK,
  }
}

//Routes:

// AUTH
{
  'signup': {
    verb: 'POST',
    url: 'api/auth/signup',
    reqBody: {
      username: string,
      password: string,
      // email later
      // actual name later?
    },
    resBody: {
      user: User, //doesn't include password
      token: token,
    }
  },

  'login': {
    verb: 'POST',
    url: 'api/auth/login',
    reqBody: {
      username: string,
      password: string,
    },
    resBody: { // this will get the meat of our data
      user: User, //doesn't include password
      token: token,
      league: League, //null if user isn't part of a league yet
      characters: [ //null if user hasn't drafted yet
        {
          character: Character,
          events: [Event] //array of that character's events
        }
      ],
    }
  },
}

// USERS

{
  'update a user': {
    verb: 'PUT',
    url: 'api/users/:userId',
    reqBody: {
      password: string, //optional, only if changing password
      // email: string, //for when we support email
      //character drafting info? or will this go in the join table?
    },
    resBody: {
      user: User, //optional
    }
  },

  'delete a user': {
    verb: 'DELETE',
    url: 'api/users/:userId',
    reqBody: null,
    resBody: {
      success: bool,
      userId: integer,
    }
  }
}

// LEAGUES
{
  'create a league': {
    verb: 'POST',
    url: 'api/leagues',
    reqBody: {
      name: string,
      creator: userId,
    },
    resBody: {
      league: League,
    }
  },

  'get league info': {
    verb: 'GET',
    url: '/api/leagues/:leagueId',
    reqBody: null,
    resBody: {
      league: League,
    }
  },

  'update a league': {
    verb: 'PUT',
    url: 'api/leagues/:leagueId',
    reqBody: {
      name: string, //optional
      users: userId //optional
    },
    resBody: {
      league: League,
    }
  },

  'delete a league': {
    verb: 'DELETE',
    url: 'api/leagues/:leagueId',
    reqBody: null
    resBody: {
      success: bool,
      leagueId: integer,
    }
  }
}

// CHARACTERS
{
  'get character info': {
    verb: 'GET',
    url: '/api/characters/:characterId',
    reqBody: null
    resBody: {
      character: Character
    }
  },
}

// EVENTS
{
  'get event info': {
    verb: 'GET',
    url: '/api/events/:eventId',
    reqBody: null,
    resBody: {
      event: Event
    }
  }
}