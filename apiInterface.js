/* API INTERFACE */

models = {
  user: {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    teamID: teamFK,
  },
  team: {
    name: string,
    creator: userFK,
    members: [ userFK ],
    
  }
}