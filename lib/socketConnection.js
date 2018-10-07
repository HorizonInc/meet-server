'use strict';
const mongoose = require('../db.js');
const UserData = mongoose.model('UserData');
const GroupData = mongoose.model('GroupData');

module.exports = (app, io) => {
    app.post('/group/:id', (req, res) => {

        /*
            The object sent through the socket to update the location:

            {
                meetId: ... ,
                groupId: ...,
                location: {
                    lat: ... ,
                    lng: ...
                }
            }
        */

        //io.on('updateLocation', (socket, data) => {
        let recievedData = req.body;
        var groupFound;

        GroupData.findOne({"_id" : req.body.groupId})
            .then((group) => {
                groupFound = group;
                if(group === null) {
                    console.log("Group not found!");
                    res.writeHead('404');
                    res.end("The group you are trying to access doesn't exist!");
                } else {
                    for(let i = 0; i < groupFound.accepted_members.length; i++) {
                        if(groupFound.accepted_members[i].meetId === recievedData.meetId) {
                            groupFound.accepted_members[i].location.lat = recievedData.location.lat;
                            groupFound.accepted_members[i].location.lng = recievedData.location.lng;
                        }
                    }

                }
            }).then(() => {
                groupFound.markModified("accepted_members");
                groupFound.save();
                res.json(groupFound.accepted_members);
                res.end();
            }).catch(err => {
                console.log("Error: " + err);
                res.writeHead('500');
                res.end('Error: ' + err);
            });
        //});
    });
};
