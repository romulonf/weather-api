const packageJSON = require("./package.json");

module.exports = {
    application_name: packageJSON.name,
    server_port: process.env.PORT || 3000,
    application_version: packageJSON.version,
    default_error_message: "Internal server error",
    api_key: process.env.API_KEY || "ENTER API KEY HERE",
    location_log_size: process.env.LOCATION_LOG_SIZE || 10,
    location_precision: process.env.LOCATION_PRECISION || 2
};