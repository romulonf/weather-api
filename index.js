const util = require("./util");
const helmet = require("helmet");
const express = require("express");
const request = require("request");
const config = require("./config");
const darksky = require("./darksky");
const usersCache = require("./users.cache");
const temporalCache = require("./temporal.cache");

const app = express()
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const middleware = {
    auth: function (req, res, next) {
        if (req.body.secretKey === config.secret_key) {
            return next();
        }
        return res.status(403).json(config.messages.unauthorized);
    }
}

app.post("/users", middleware.auth, (req, res) => {
    const users = usersCache.all();
    return res.status(200).json(users);
});

app.post("/cache/:location", middleware.auth, (req, res) => {

    const location = req.params.location;

    const data = temporalCache.get(location);

    if (data) {
        return res.status(200).json(data);
    }

    return res.status(200).json({ message: "Location not cached" });

});

app.post("/api/forecast", middleware.auth, (req, res) => {

    let [latitude, longitude, uuid] = [req.body.latitude, req.body.longitude, req.body.uuid];

    latitude = Number(latitude).toFixed(config.location_precision);
    longitude = Number(longitude).toFixed(config.location_precision);

    const location = `${latitude}:${longitude}`;

    let data = temporalCache.get(location);

    if (data) {
        return util.forecast({
            res: res,
            uuid: uuid,
            data: data,
            cached: true,
            location: location
        });
    }

    const url = darksky.getUrl(config.api_key, latitude, longitude);

    const opts = { method: "GET", url: url, jar: true };

    request(opts, (error, response, body) => {

        if (error || response.statusCode !== 200) {
            return res.status(500).json(config.messages.internal_server_error);
        }

        return util.forecast({
            res: res,
            uuid: uuid,
            cached: false,
            location: location,
            data: JSON.parse(body)
        });

    });

});

app.get("/status", (req, res) => {
    return res.status(200).json({ name: config.application_name, version: config.application_version });
});

app.get("/*", (req, res) => {
    return res.status(404).json(config.messages.not_found);
});

app.listen(config.server_port, () => {
    console.log(`App ready! Listening at port ${config.server_port}!`)
});