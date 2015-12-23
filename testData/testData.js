'use strict';
var _ = require('underscore');

var fs = require('fs');


const users = [
  {
    id: 1,
    username: 'kylecho',
    email: 'kylecho.work@gmail.com',
    leagueId: 1,
    characters: {
      1: [1,2,3,4,5,6,7,8,9,10],
      2: [1,2,3,4,5,6,7,8,9,10],
      3: [1,2,3,4,5,6,7,8,9,10],
      4: [1,2,3,4,5,6],
      5: [1,2,3,4,5,6,7,8,9,10],
      6: [7,8,9,10],
    }
  },
  {
    id: 2,
    username: 'naomijacobs',
    email: 'naomiajacobs@gmail.com',
    leagueId: 1,
    characters: {
      7: [1,2,3,4,5,6,7,8,9,10],
      8: [1,2,3,4,5,6,7,8,9,10],
      9: [1,2,3,4,5,6,7,8,9,10],
      10: [1,2,3,4,5,6],
      11: [1,2,3,4,5,6,7,8,9,10],
      12: [7,8,9,10],
    }
  },
  {
    id: 3,
    username: 'wholigan',
    email: 'wholey@gmail.com',
    leagueId: 1,
    characters: {
      13: [1,2,3,4,5,6,7,8,9,10],
      14: [1,2,3,4,5,6,7,8,9,10],
      15: [1,2,3,4,5,6,7,8,9,10],
      16: [1,2,3,4,5,6],
      17: [1,2,3,4,5,6,7,8,9,10],
      18: [7,8,9,10],
    }
  }
];

const leagues = [{
  id: 1,
  name: 'TempestTargaryens',
  creatorId: 1,
  members: [
    {
      id: 2,
      username: 'uncleLehman',
      email: 'uncleLehman@gmail.com',
      leagueId: 1,
      characters: {
        4: [7,8,9,10],
        6: [1,2,3,4,5,6],
        7: [1,2,3,4,5,6,7,8,9,10],
        8: [1,2,3,4,5,6,7,8,9,10],
        9: [1,2,3,4,5,6,7,8,9,10],
        10: [1,2,3,4,5,6,7,8,9,10],
      } 
    },
    {
      id: 3,
      username: 'brian',
      email: 'kgraham@gmail.com',
      leagueId: 1,
      characters: {
        11: [1,2,3,4,5,6,7,8,9,10],
        12: [1,2,3,4,5,6,7,8,9,10],
        13: [1,2,3,4,5,6,7,8,9,10],
        14: [1,2,3,4,5,6,7,8,9,10],
        15: [1,2,3,4,5,6,7,8,9,10],
      }
    },
    {
      id: 4,
      username: 'wholigan',
      email: 'wholey@gmail.com',
      leagueId: 1,
      characters: {
        16: [1,2,3,4,5,6,7,8,9,10],
        17: [1,2,3,4,5,6,7,8,9,10],
        18: [1,2,3,4,5,6,7,8,9,10],
        19: [1,2,3,4,5,6,7,8,9,10],
        20: [1,2,3,4,5,6,7,8,9,10],
      }
    }
  ]
}];

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

function findPoints(charId, epId) {
 return _.reduce(events, (accum, event, idx) => {
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
  return roster;
}

const testData = {
  login: {
    token: 'abc123',
    user: users[0],
    roster: makeRoster(users[0].characters),
    league: leagues[0],
    characters: characters,
    events: events,
  },
  users: users,
  leagues: leagues,
  characters: characters,
  events: events
};

fs.writeFileSync(__dirname + '/dbTemplate.json', JSON.stringify(testData));