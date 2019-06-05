const config = require("./config");
const darksky = require("./darksky");
const usersCache = require("./users.cache");
const temporalCache = require("./temporal.cache");

module.exports = {

    forecast: function (opts = { uuid, location, data, res, cached: false }) {

        const data = opts.data;
        const response = opts.res;
        const cached = opts.cached;
        const location = opts.location;

        let user = usersCache.get(opts.uuid);

        let requests = user.requests,
            history = requests.history;

        history.push({
            cached: cached,
            time: Date.now(),
            location: location
        });

        if (history.length > config.location_log_size) {
            history.shift();
        }

        if (cached) {
            ++requests.cached;
        } else {
            ++requests.new;
            temporalCache.set(location, data, config.forecast_cache_duration);
        }

        const forecastData = cached ? darksky.currentForecast(data) : data.currently;

        return response.status(200).send({
            ...forecastData,
            _cached: cached
        });

    }

}