var db = require('../../dbInterface');
var Invitation = db.Invitation;
var User = db.User;
var League = db.League;
var Character = db.Character;
var Event = db.Event;
var makeRoster = require('../helpers.js').makeRoster;
var makeRosters = require('../helpers.js').makeRosters;


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
};

var update = (req, res, next) => {
  console.log('updating invitation');
  var id = req.params.invitationId;
  var status = req.body.status;
  var userId = req.headers.id;
  return Invitation.update({status}, {where: {id}})
  .then(() => {
    // if status is accepted
    if (status === 'accepted') {
      return User.update({leagueId: id}, {where: {id: userId}})
      .then(() => {
        // grab everything like in login
        return User.findOne({
          where: {id: userId},
          include: [{
            model: League,
            include: [{
              model: User,
              attributes: {
                exclude: ['password']
              }
            }]
          }],
          // TODO: why does this break things?
          // attributes: {
          //   exclude: ['password']
          // }
        })
        .then((user) => {
          // TODO: also add rosters for leaguemates
          return makeRoster(user)
          .then((roster) => {
            return Character.findAll()
            .then((characters) => {
              return Event.findAll()
              .then((events) => {
                return Invitation.findAll({where: {email: user.email, status: 'pending'}})
                .then((invitations) => {
                  user.dataValues.roster = roster;
                  // TODO: make this work by excluding password instead of deleting
                  delete user.dataValues.password;
                  if (!user.dataValues.league) {
                    res.status(200).json({
                      user,
                      characters,
                      events,
                      invitations: invitations || [],
                    });
                  } else {
                    return makeRosters(user.dataValues.league.users, user.dataValues.league.latestSeen)
                    .then((rosters) => {
                      user.dataValues.league.users.forEach((leagueUser) => {
                        var id = leagueUser.dataValues.id;
                        leagueUser.dataValues.roster = rosters[id];
                      });
                      res.status(200).json({
                        user,
                        characters,
                        events,
                        invitations: invitations || [],
                      });
                    });
                  }
                })
              });
            });
          });
        });
      });
    } else {
      // grab invitations for this user again and send them back
      return User.findOne({where: {id}})
      .then((user) => {
        return Invitation.findAll({where: {email: user.email, status: 'pending'}})
      })
      .then((invitations) => {
        res.status(200).json({invitations});
      });
    }
  })
  .catch((error) => {
    console.error('Error updating invitation: ', error);
    res.status(500).send('Server error updating invitation: ', error);
  });
}


module.exports = {
  create,
  update,
};