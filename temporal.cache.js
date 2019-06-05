const ms = require("millisecond");
const config = require("./config");

const cache = {};

module.exports = {

    get: (key) => {
        return cache[key];
    },

    set: (key, value, time = config.forecast_cache_duration) => {
        setTimeout(() => {
            delete cache[key];
        }, ms(time));
        return cache[key] = value;
    }

};