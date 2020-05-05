const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');


console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// Define Paths for Express configs
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setups Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Harsh"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Harsh"

    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some help full text',
        title: 'Help',
        name: 'Harsh'
    });
});

app.get('/weather', (req, res) => {
    let place = req.query.address;

    if (!place) {
        return res.send({
            error: 'Please provide address'
        });
    } else {
        geocode(place, (error, { lat, long, location } = {}) => {
            if (error != undefined) {
                return res.send({
                    error: error
                });
            } else {
                forecast(lat, long, (error, forecastData) => {
                    if (error != undefined) {
                        return res.send({
                            error: error
                        });
                    }
                    res.send({
                        forcast: forecastData,
                        address: place,
                        location: location
                    });

                })
            }
        })
    }
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a Search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Harsh",
        message: "Help Article Not Found"
    });
});


// This is error function means 404 error page here we use wild card character '*'
// It is need to come last because it execute when non other value matches

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        message: "404 Page Not Found",
        name: "Harsh"
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
// It is common developer port

// After running the script web server is start on port 3000 to find the port go to browser and type a url i.e., localhost:3000
