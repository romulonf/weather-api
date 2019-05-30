const ms = require("millisecond");

const cache = {};

module.exports = {

    get: (key) => {
        return cache[key];
    },

    set: (key, value, time = "8 hours") => {
        setTimeout(() => {
            delete cache[key];
        }, ms(time));
        return cache[key] = value;
    }

};