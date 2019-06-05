# Weather API

NodeJS application to query/cache Darksky weather forecast

# Before running the application

Change the default values of `api_key` and `secret_key`. Following are two possible ways of changing them:

1) edit the `config.js` file and insert your own API/secret key;
2) start the node application using both `API_KEY` and `SECRET_KEY` arguments;

You can find your **API key** into your [Darsky](https://darksky.net) account settings.

The **secret key** is intended to protect your endpoints from unathorized access. 

Create a random key and ensure that every request sent to your API inform the same key into the `secretKey` body parameter.

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
`[POST] /users`: return the stored users  
`[POST] /cache/:location`: return the cached JSON for the given location. Location format is $latitude:$longitude  
`[POST] /api/forecast`: return the forecast for the given location. Mandatory body parameters are: `latitude`, `longitude` and `uuid`.  

Any other endpoint will return a NOT FOUND (http status 404)
