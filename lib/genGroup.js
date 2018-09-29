'use strict';
const mongoose = require('mongoose');
var GroupData = mongoose.model('GroupData');

module.exports = (app) => {
    /*

        {
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

    app.post('/createGroup', (req, res) => {
        var members = JSON.parse(req.body.groupMembers);
        var groupId = ObjectId();

        var groupEntry = {
            _id: groupId,
            members: members
        }

        var newGroup = new GroupData(groupEntry);
        newGroup.save()
        .then(savedUser => {
            console.log(savedUser);
        }).catch(e => {
            console.log(e);
        });

    });
};
