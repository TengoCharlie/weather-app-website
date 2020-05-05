const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hhcmxpZTEyMzIxIiwiYSI6ImNqeTIzbGJ1bDBpN3kzbGxodjlkeDN0enEifQ.r_AGe8RqQxh-NYaf7_bEcQ&limit=1`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (response.body.features.length === 0) {
            callback('Unable to find location');
        }
        else {
            let data = {
                long: response.body.features[0].geometry.coordinates[0],
                lat: response.body.features[0].geometry.coordinates[1],
                location: response.body.features[0].place_name
            }
            callback(undefined, data);
        }
    })
}

module.exports = geocode;