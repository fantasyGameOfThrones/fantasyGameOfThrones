export const user = {
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
};

export const league = {
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
};

export const characters = [];



function addCharacter(id, name, nickname, house, imageUrl) {
  characters.push({
    id: id,
    name: name,
    nickname: nickname,
    house: house,
    imageUrl: imageUrl,
  });
}





