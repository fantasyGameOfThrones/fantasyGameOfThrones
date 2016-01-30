// Any function we use with Invitation Routing goes here
var db = require('../../dbInterface');
var Invitation = db.Invitation;
var User = db.User;


var create = (req, res, next) => {
  // get leagueid, moderatorid, and email
  var leagueId = req.body.leagueId;
  var email = req.body.email;
  var moderatorId = req.headers.id;

  return User.findOne({where: {email}})
  .then((user) => {
    if (!user) {
      return Invitation.create({
        leagueId,
        moderatorId,
        email
      })
      .then((invitation) => {
        // send email
        // tell invitor what happened
      })
    } else {
      if (!user.league) {
        return Invitation.create({
          leagueId,
          moderatorId,
          email,
          invitedUser: user.id,
        })
        .then((invitation) => {
          res.status(200).send({success: true});
        })
      } else {
        // user is already in a league
        res.status(409).send('User is already in a league, so you cannot invite them.');
      }
    }
  })
  .catch((error) => {
    console.error('Error creating invitation: ', error);
    res.status(500).send('Server error creating invitation: ', error);
  })
    // if user does not have a league
      // create invitation to them for that league
    // else
      // tell them the user already has a league
  // else
    // create invitation anyway
    // send them an email
    // tell invitor what happened
};


module.exports = {
  create,
  update,
  retrieve,
};