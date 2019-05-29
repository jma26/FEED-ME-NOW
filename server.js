const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Server static files from React frontend
app.use(express.static(path.join(__dirname, 'feed-me-now/build')));

// Handle cors
app.use(cors());
// Handle requested data with body-parser, turn on object nesting
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set config defaults for axios globally
axios.defaults.baseURL = "https://api.yelp.com/v3/";
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.YELP_API_KEY}`;

const port = process.env.PORT || 5000;

app.post('/restaurants', (req, res, next) => {
    let yelpParams;
    // Check if gelocation is shared
    if (req.body.hasGeolocation) {
        yelpParams = {
            term: 'restaurants',
            limit: 50,
            latitude: req.body.lat,
            longitude: req.body.lng
        }
    }
    axios.get('businesses/search', {
        params: {...yelpParams}
    })
    .then((response) => {
        if (response.data.businesses.length === 0) {
            res.json({error: 'No restaurants found'});
        } else {
            // Pick random restaurant
            const numberOfRestaurants = response.data.businesses.length;
            const randomInteger = Math.floor(Math.random() * numberOfRestaurants);
            let restaurant = response.data.businesses[randomInteger];
            res.json(restaurant);
        }
    })
    .catch((error) => {
        next(new Error('Error while retrieving restaurants from business search endpoint', error));
    })
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/feed-me-now/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

