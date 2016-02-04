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
        // send email to invite person to join fgot
        res.status(200).json({success: true, message: 'Your friend hasn\'t joined us yet, so we sent them an email telling them how to join.'});
      })
    } else {
      if (!user.league) {
        // user exists and doesn't have a league - good
        return Invitation.create({
          leagueId,
          moderatorId,
          email,
        })
        .then((invitation) => {
          res.status(200).json({success: true});
        })
      } else {
        // user is already in a league
        res.status(409).json({success: false, message: 'User is already in a league, so you cannot invite them to yours.'});
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