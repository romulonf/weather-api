const packageJSON = require("./package.json");

module.exports = {
    messages: {
        not_found: { message: "Not Found" },
        unauthorized: { message: "Unauthorized" },
        internal_server_error: { message: "Internal Server Error" },
    },
    application_name: packageJSON.name,
    server_port: process.env.PORT || 3000,
    application_version: packageJSON.version,
    location_log_size: process.env.LOCATION_LOG_SIZE || 10,
    location_precision: process.env.LOCATION_PRECISION || 2,
    api_key: process.env.API_KEY || "INSERT YOUR API KEY HERE",
    secret_key: process.env.SECRET_KEY || "INSERT YOUR SECRET KEY HERE",
    forecast_cache_duration: process.env.FORECAST_CACHE_DURATION || "6 hours",
};