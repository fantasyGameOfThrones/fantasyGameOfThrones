'use strict';

var fs = require('fs');

const users = [
  {
    id: 1,
    username: 'kylecho',
    email: 'kylecho.work@gmail.com',
    leagueId: 1,
    episodes: {
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
    episodes: {
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
    episodes: {
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
      episodes: {
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
      episodes: {
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
      episodes: {
        16: [1,2,3,4,5,6,7,8,9,10],
        17: [1,2,3,4,5,6,7,8,9,10],
        18: [1,2,3,4,5,6,7,8,9,10],
        19: [1,2,3,4,5,6,7,8,9,10],
        20: [1,2,3,4,5,6,7,8,9,10],
      }
    }
  ]
}];

const characters = fs.readFileSync('./testData/characterData.txt', 'utf8', function(err, data) {
  return data;
})
.split('\n')
.map(function(char) {
  var parts = char.split(',');
  return {
    id: parts[0],
    name: parts[1].trim(),
    nickname: parts[2] ? parts[2].trim() : null,
    house: parts[3] ? parts[3].trim() : null,
    imageUrl: parts[4].trim()
  };
});

const events = fs.readFileSync('./testData/eventData.txt', 'utf8', function(err, data) {
  return data;
})
.split('\n')
.map(function(char) {
  var parts = char.split(',');
  return {
    id: parts[0],
    type: parts[1],
    description: parts[2],
    episodeId: parts[3],
    characterId: parts[4],
    points: parts[5]
  };
});

const testData = {
  login: {
    token: 'abc123',
    user: users[1],
    league: leagues[0],
    characters: characters,
    events: events,
  },
  users: users,
  leagues: leagues,
  characters: characters,
  events: events
};

fs.writeFileSync('./dbTemplate.json', JSON.stringify(testData));