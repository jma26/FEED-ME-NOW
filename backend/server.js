const express = require('express');
const app = express();
const axios = require('axios');

const yelpKey = require('./yelpConfig.js')['yelpAPIKey'];

// Set config defaults for axios globally
axios.defaults.baseURL = "https://api.yelp.com/v3/";
axios.defaults.headers.common['Authorization'] = `Bearer ${yelpKey}`;

const port = 8000;

app.get('/getrestaurant', (req, res, next) => {
    axios.get('businesses/search', {
        params: {
            term: 'restaurants',
            location: 'Santa Rosa, CA'
        }
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

