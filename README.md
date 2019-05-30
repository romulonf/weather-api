# Before running the aplication

Make sure to either add your [Darsky](https://darksky.net) api key into the `config.js` file or start your node application passing the `API_KEY` argument.

# Installing the dependencies

Just execute the following command to install the dependencies:

```
npm install
```

# Running the application

Execute the following commands in order to run the application

```
npm run dev
```

# Endpoints

Following is a brief explanation about the available endpoints:

`[GET] /status`: return the name and version of the application
`[GET] /users/dump`: return the stored users
`[GET] /cache/:location/dump`: return the cached JSON for the given location. Location format is $latitude:$longitude
`[GET] /api/forecast/:latitude/:longitude/:uuid`: return the forecast for the given location (lat/long)

Any other endpoint will return an internal server error (http status 500).