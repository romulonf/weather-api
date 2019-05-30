const config = require("./config");
const usersCache = require("./users.cache");
const temporalCache = require("./temporal.cache");

module.exports = {

    forecast: function (opts = { uuid, location, data, res, cached: false }) {

        const data = opts.data;
        const response = opts.res;
        const cached = opts.cached;
        const location = opts.location;

        let user = usersCache.get(opts.uuid);

        let requests = user.requests;

        requests.push({
            cached: cached,
            time: Date.now(),
            location: location
        });

        if (requests.length > config.location_log_size) {
            requests.shift();
        }

        if (cached) {
            ++user.cached_calls;
        } else {
            ++user.non_cached_calls;
            temporalCache.set(location, data);
        }

        return response.status(200).send({
            ...data,
            _cached: cached
        });

    }

}