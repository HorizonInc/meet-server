"use strict";
const mongoose = require('../db.js');
const GroupData = mongoose.model('GroupData');
const UserData = mongoose.model('UserData');

module.exports = (app) => {
    /*
        The JSON object that is posted to /acceptInvte :
        {
            user: { -The userId of the person accepting the invite-
                meetId:...,
                location: {
                    lat: ...,
                    lng: ...
                }
            }
            groupId: -The groupId of the group the person is invited to-
        }
    */

    app.post('/acceptInvite', (async (req, res) => {
        await GroupData.findOne({ _id: req.body.groupId})
            .then(group => {
                if(group === null) {
                    res.end('Group does not exist!');
                } else {
                    group.accepted_members.push(req.body.user);
                    group.save();
                }
            }).catch(e => {
                console.log(e);
            });

            res.end('/group/' + req.body.groupId);
    }));
};
