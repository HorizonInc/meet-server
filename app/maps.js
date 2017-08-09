module.exports = (app, client, request) => {

    var lat, lng, placeId;

    app.post("/searchAddress", (req, res) => {
        address = req.body.address;
        var apiKey = "AIzaSyBQwi7V3FhSUlktCXpeOD7xJUTprH22uYM";

        request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}` +
                    `&key=${apiKey}`, (err, body) => {
                        if(err) {
                            console.log(err);
                        } else {
                            var data = JSON.parse(body);
                            lat = data.geometry.locaiton.lat;
                            lng = data.geometry.location.lng;
                            placeId = data.geometry.place_id;
                            res.redirect("/maptest");
                        }
                    });
    });

    app.get("/AddressGet", (req, res) => {
        var place = {
            "lat" : lat,
            "lng" : lng,
            "place" : placeId
        }

        res.end(place);
    });

}
