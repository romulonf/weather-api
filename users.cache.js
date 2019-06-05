const cache = {};

function get(key) {

    let user = cache[key];

    if (!user) {

        user = {
            requests: {
                new: 0,
                cached: 0,
                history: []
            }
        };

        set(key, user);
    }

    return user;
}

function set(key, value) {
    cache[key] = value;
}

function all() {
    return cache;
}

module.exports = {
    all: all,
    get: get,
    set: set
};