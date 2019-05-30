const cache = {};

function get(key) {

    let user = cache[key];

    if (!user) {

        user = {
            cached_calls: 0,
            non_cached_calls: 0,
            requests: []
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