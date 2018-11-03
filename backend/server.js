const express = require('express');
const app = express();
const axios = require('axios');

const yelpKey = require('./yelpConfig.js')['yelpAPIKey'];

const port = 8000;

app.get('/getrestaurant', (req, res, next) => {

});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

