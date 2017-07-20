module.exports = () => {
    const redis = require("redis");

    const client = redis.createClient();

    client.on("connect", (err) => {
        if(err != undefined)
            console.log("there was an error connecting to the redis store: " + err);
    });

    return client;
}
