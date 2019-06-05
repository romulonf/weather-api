module.exports = {

    getUrl: (key, latitude, longitude) => {
        return `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?exclude=minutely,daily,alerts,flags&units=si`
    },

    currentForecast: (json) => {

        const entries = json.hourly.data;

        let hourly = entries.map((entry) => {
            return {
                entry: entry,
                distance: Math.abs(Date.now() - entry.time * 1000)
            };
        });

        return hourly.sort((o1, o2) => o1.distance - o2.distance)[0].entry;

    }

};