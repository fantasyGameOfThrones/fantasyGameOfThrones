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

//Routes:

// AUTH
{
  'signup': {
    verb: 'POST',
    url: 'api/signup',
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
    url: 'api/login',
    reqBody: {
      username: string,
      password: string,
    },
    resBody: { // this will get the meat of our data
      token: token,
      user: {
        id: integer,
        username: sring,
        email: string,
        leagueId: integer,
        roster:[
          [[charId, pointsForCharFromEp], [charId, pointsForCharFromEp]], //index = episodeId
          [[charId, pointsForCharFromEp], [charId, pointsForCharFromEp]],
          [[charId, pointsForCharFromEp], [charId, pointsForCharFromEp]],
        ],
      },
      league: { //TODO: make this an array of leagues to support multiple leagues
        id: integer,
        name: string,
        creatorId: integer // represents the user who make the league
        members: [
          {
            username: string,
            id: integer,
            email: string,
            leagueId: integer,
            roster: roster //see resBody.user.roster for example
          }
        ]
      },
      characters: [
        {
          name: string,
          house: string,
          image: string,
        }
      ],
      events: [
        {
          id: integer,
          type: string,
          description: string,
          episodeId: integer // fk of episode
          points: integer
        }
      ]
    }
  },
}

// USERS

{
  'update a user': {
    verb: 'PUT',
    url: 'api/users/:userId',
    reqBody: {
      password: string, //optional
      email: string, // optional
      league: integer, // optional
    },
    resBody: {
      user: User
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
    url: 'api/leagues/new',
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

// USERSTOCHARACTERS

{
  'draft or add a character': {
    verb: 'POST',
    url: '/api/usersToCharacters',
    reqBody: {
      userId: integer,
      characterId: integer
    },
    resBody: {
      // should have everything the user property in a resBody from POST to
      // login has
      user: User,
      league: League,
    }
  }
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