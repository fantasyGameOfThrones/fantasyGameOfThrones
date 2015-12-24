'use strict';
var _ = require('underscore');
var fs = require('fs');

const characters = fs.readFileSync(__dirname + '/characterData.txt', 'utf8', (err, data) => {
  return data;
})
.split('\n')
.map((char) => {
  var parts = char.split(',');
  return {
    id: +parts[0].trim(),
    name: parts[1].trim(),
    nickname: parts[2] ? parts[2].trim() : null,
    house: parts[3] ? parts[3].trim() : null,
    imageUrl: parts[4].trim()
  };
});

const events = fs.readFileSync(__dirname + '/eventData.txt', 'utf8', (err, data) => {
  return data;
})
.split('\n')
.map((event) => {
  var parts = event.split(',');
  return {
    id: +parts[0].trim(),
    type: parts[1].trim(),
    description: parts[2].trim(),
    episodeId: +parts[3].trim(),
    characterId: +parts[4].trim(),
    points: +parts[5].trim(),
  };
});

const user1Chars = {
  1: [1,2,3,4,5,6,7,8,9,10],
  2: [1,2,3,4,5,6,7,8,9,10],
  3: [1,2,3,4,5,6,7,8,9,10],
  4: [1,2,3,4,5,6],
  5: [1,2,3,4,5,6,7,8,9,10],
  6: [7,8,9,10],
};

const user2Chars = {
  4: [7,8,9,10],
  6: [1,2,3,4,5,6],
  7: [1,2,3,4,5,6,7,8,9,10],
  8: [1,2,3,4,5,6,7,8,9,10],
  9: [1,2,3,4,5,6,7,8,9,10],
  10: [1,2,3,4,5,6,7,8,9,10],
};

const user3Chars = {
  11: [1,2,3,4,5,6,7,8,9,10],
  12: [1,2,3,4,5,6,7,8,9,10],
  13: [1,2,3,4,5,6,7,8,9,10],
  14: [1,2,3,4,5,6,7,8,9,10],
  15: [1,2,3,4,5,6,7,8,9,10],
};

const user4Chars = {
  16: [1,2,3,4,5,6,7,8,9,10],
  17: [1,2,3,4,5,6,7,8,9,10],
  18: [1,2,3,4,5,6,7,8,9,10],
  19: [1,2,3,4,5,6,7,8,9,10],
  20: [1,2,3,4,5,6,7,8,9,10],
};

const user = {
  id: 1,
  username: 'kylecho',
  email: 'kylecho.work@gmail.com',
  leagueId: 1,
  characters: user1Chars,
  roster: makeRoster(user1Chars),
};

const league = {
  id: 1,
  name: 'TempestTargaryens',
  creatorId: 1,
  members: [
    user,
    {
      id: 2,
      username: 'uncleLehman',
      email: 'uncleLehman@gmail.com',
      leagueId: 1,
      characters: user2Chars,
      roster: makeRoster(user2Chars),
    },
    {
      id: 3,
      username: 'brian',
      email: 'kgraham@gmail.com',
      leagueId: 1,
      characters: user3Chars,
      roster: makeRoster(user3Chars),
    },
    {
      id: 4,
      username: 'wholigan',
      email: 'wholey@gmail.com',
      leagueId: 1,
      characters: user4Chars,
      roster: makeRoster(user4Chars),
    }
  ]
};


function findPoints(charId, epId) {
 return _.reduce(events, (accum, event) => {
    if (+event.episodeId === +charId && +event.episodeId === +epId) {
      return accum + event.points;
    }
    return accum;
  }, 0);
}

function makeRoster(characters) {
  const roster = {};
  _.each(characters, (char, key) => {
    roster[key] = {};
    _.each(char, (ep) => {
      roster[key][ep] = findPoints(key, ep);
    });
  });
  roster.points = _.reduce(roster, (accum, char) => {
    return accum + _.reduce(char, (accum, epPoints) => {
      return accum + epPoints;
    }, 0);
  }, 0);
  return roster;
}

const testData = {
  login: {
    token: 'abc123',
    user: user,
    league: league,
    characters: characters,
    events: events,
  },
  characters: characters,
  events: events
};

fs.writeFileSync(__dirname + '/dbTemplate.json', JSON.stringify(testData));