"use strict";
const mongoose = require("../db.js");
const GroupData = mongoose.model("GroupData");
const UserData = mongoose.model("UserData");

module.exports = (app) => {
	/*

        {
            place: {
              placeName: ...,
              location: {
                lat: ...,
                lng: ...,
              }
            },
            groupAdmin: {
                id: id,
                location: {
                    lat: ...,
                    lng: ...
                }
            },
            groupMembers: [
                groupAdminId: ...,
                groupName: ...,
                groupName:
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

	app.post("/createGroup", (async (req, res) => {
		var invitedMembers = req.body.invitedMembers;
		var groupMembers = [];
		var groupId;

		groupMembers.push(req.body.groupAdmin);

		var groupEntry = {
			group_admin_id: req.body.groupAdmin.id,
			accepted_members: groupMembers,
			invited_members: invitedMembers
		};

		var newGroup = new GroupData(groupEntry);
		await newGroup.save()
			.then(savedGroup => {
				console.log(savedGroup);
				groupId = savedGroup._id;
			}).catch(e => {
				console.log("Error: " + e);
			});

		for(let i = 0; i < invitedMembers.length; i++) {
			await UserData.findOne({ meetId: invitedMembers[i].meetId })
				.then(user => {
					console.log(user);
					user.invites.push(groupEntry._id);
					user.save();
				}).catch(e => {
					console.log(e);
				});

		}

		res.writeHead("200");
		res.end("Your Group was created, with id: " + groupId);
	}));

	/*
        Object that will be passed into the '/setMeetingPlace' route:

        {
          group_admin_id: ...,
          place_name: ...,
          location: {
            lat: ...,
            lng: ...
          },
          meeting_time: "Date Format"
        }
    */

	app.post("/setMeetingPlace", (async (req, res) => {
		let placeName = req.body.placeName;
		let meetingTime = req.body.meeting_time;
		let location  = {
			lat: req.body.location.lat,
			lng: req.body.location.lng
		};

		await GroupData.findOne({ group_admin_id: req.body.group_admin_id})
			.then((async (group) => {
				group.place.place_name = placeName;
				group.place.location.lat = location.lat;
				group.place.location.lng = location.lng;
				group.place.meeting_time = meetingTime;

				group.markModified("place");
				group.save();
			})).catch(e => {
				console.log("\x1b[31m\x1b[4m", "== Set Meeting Place Error: " + e + " ==");
				res.writeHead("500");
				res.end("Error Setting the Meeting place: " + e);
			});
	}));
};
