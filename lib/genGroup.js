'use strict';
const mongoose = require('mongoose');
var GroupData = mongoose.model('GroupData');
var UserData = mongoose.model('UserData');

module.exports = (app) => {
    /*

        {
            groupAdmin: {
                id: id,
                location: {
                    lat: ...,
                    lng: ...
                }
            },
            groupMembers: [
                {
                    meetId: id
                    location: {
                        lat: ...
                        lng: ...
                    }
                },
                {
                    meetId: id,
                    location: {
                        lat: ...
                        lng: ...
                    }
                },
                ... (max 10 people)
            ]
        }

    */

    app.post('/createGroup', (async (req, res) => {
        var invitedMembers = JSON.parse(req.body.invitedMembers);
        var groupMembers = [];
        var groupId = ObjectId();

        groupMembers.push(req.query.groupAdmin)

        var groupEntry = {
            _id: groupId,
            groupAdminId: req.query.groupAdmin.id,
            accepted_members: groupMembers,
            invited_members: invitedMembers
        };

        var newGroup = new GroupData(groupEntry);
        await newGroup.save()
            .then(savedUser => {
                console.log(savedUser);
            }).catch(e => {
                console.log(e);
            });

        for(let i = 0; i <= invitedMembers.length(); i++) {
            await UserData.findOne({ meetId: invitedMembers[i].meetId})
              .then(async (user) => {
                let updatedInviteArray = user.invites.push(groupEntry._id);

                let updateInvites = {
                    _id: user._id,
                    name: user.name,
                    meetId: user.meetId,
                    pictureURL: user.pictureURL,
                    invites: updatedInviteArray
                }

                await UserData.findOneAndUpdate({_id: user._id}, updatedInvites)
                    .catch(e => {
                        console.log(e);
                    });
              }).catch(e => {

              });

        };


    }));
};
