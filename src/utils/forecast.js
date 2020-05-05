const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c9e402e5e708315ec4b3ab91b8bd78a7&query=${lat},${long}&units=m`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback('Unable to find location');
        }
        else {
            // let temp = response.body.current.temperature;
            // let humid = response.body.current.humidity;
            // let overcast = response.body.current.weather_descriptions[0];

            let { temperature: temp, humidity: humid, weather_descriptions: overcast, feelslike: feels } = body.current;

            // callback(undefined, `${overcast} It is currently ${temp} degrees celcius out and humidity is ${humid} % out.`);
            callback(undefined, `${overcast[0]} It is currently ${temp} degrees celcius out and humidity is ${humid} % out. and it is feels like ${feels} outside.`);

        }
    })
}



module.exports = forecast;