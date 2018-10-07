'use strict';
const mongoose = require('../db.js');
const GroupData = mongoose.model('GroupData');
const UserData = mongoose.model('UserData');

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
        var invitedMembers = req.body.invitedMembers;
        var groupMembers = [];
        var groupId = 903728332322;

        groupMembers.push(req.body.groupAdmin);

        var groupEntry = {
            _id: groupId,
            groupAdminId: req.body.groupAdmin.id,
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

        for(let i = 0; i < invitedMembers.length; i++) {
            await UserData.findOne({ meetId: invitedMembers[i].meetId})
              .then(user => {
                user.invites.push(groupEntry._id);
                user.save();
              }).catch(e => {
                console.log(e);
              });

        };


    }));
};
