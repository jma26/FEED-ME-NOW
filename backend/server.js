const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Handle cors
app.use(cors());
// Handle requested data with body-parser, turn on object nesting
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const yelpKey = require('./yelpConfig.js')['yelpAPIKey'];

// Set config defaults for axios globally
axios.defaults.baseURL = "https://api.yelp.com/v3/";
axios.defaults.headers.common['Authorization'] = `Bearer ${yelpKey}`;

const port = 8000;

app.post('/getrestaurant', (req, res, next) => {
    let yelpParams;
    // Check if gelocation is shared
    if (req.body.hasGeolocation) {
        yelpParams = {
            term: 'restaurants',
            latitude: req.body.lat,
            longitude: req.body.lng
        }
    }
    axios.get('businesses/search', {
        params: {...yelpParams}
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

