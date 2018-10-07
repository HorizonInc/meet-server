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
        console.log(req.body.groupId);
        console.log(req.body.location.lat);
        let recievedData = req.body;

            GroupData.findOne({"_id" : req.body.groupId})
                .then((group) => {
                    if(group === null) {
                        console.log("Group not found!");
                        res.writeHead('404');
                        res.end("The group you are trying to access doesn't exist!");
                    } else {
                        for(let i = 0; i < group.accepted_members.length; i++) {
                            if(group.accepted_members[i].meetId === recievedData.meetId) {
                                group.accepted_members[i].location.lat = recievedData.location.lat;
                                group.accepted_members[i].location.lng = recievedData.location.lng;
                                group.save();
                            }
                        }

                    }
                }).catch(err => {
                    console.log("Error: " + err);
                    res.writeHead('502');
                    res.end('Error: ' + err);
                });
        //});
    });
};
