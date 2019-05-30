const util = require("./util");
const helmet = require("helmet");
const express = require("express");
const request = require("request");
const config = require("./config");
const usersCache = require("./users.cache");
const temporalCache = require("./temporal.cache");

const app = express()
app.use(helmet());

app.get("/users/dump", (req, res) => {
    const users = usersCache.all();
    return res.status(200).send(users);
});

app.get("/cache/:location/dump", (req, res) => {

    const location = req.params.location;

    const data = temporalCache.get(location);

    if (data) {
        return res.status(200).send(data);
    }

    return res.status(200).send({ message: "Location not cached" });

});

app.get("/api/forecast/:latitude/:longitude/:uuid", (req, res) => {

    let [latitude, longitude, uuid] = [req.params.latitude, req.params.longitude, req.params.uuid];

    latitude = Number(latitude).toFixed(config.location_precision);
    longitude = Number(longitude).toFixed(config.location_precision);

    const location = `${latitude}:${longitude}`;

    let data = temporalCache.get(location);

    if (data) {
        return util.forecast({
            response: res,
            uuid: uuid,
            data: data,
            cached: true,
            location: location
        });
    }

    const url = `https://api.darksky.net/forecast/${config.api_key}/${latitude},${longitude}?exclude=minutely,hourly,alerts,flags&units=si`;

    const opts = { method: "GET", url: url, jar: true };

    request(opts, (error, response, body) => {

        if (error || response.statusCode !== 200) {
            return res.status(500).send(config.default_error_message);
        }

        return util.forecast({
            response: res,
            uuid: uuid,
            location: location,
            data: JSON.parse(body)
        });

    });

});

app.get("/status", (req, res) => {
    return res.status(200).send({ name: config.application_name, version: config.application_version });
});

app.get("/*", (req, res) => {
    return res.status(500).send(config.default_error_message);
})

app.listen(config.server_port, () => {
    console.log(`App ready! Listening at port ${config.server_port}!`)
});