const request = require('request')


const currentWeather = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=51b220611c16247db2ce6a2a9c851ae7&units=f&query=' + lat + ',' + lon

    request({ url, json: true}, (error, { body }) => { // body is deconstructed from response object
        if(error) {
            callback("Unable to connect to weather service!", undefined)
        }
        else if (body.error) {
            callback("Invalid Query. Please provide proper coordinates", undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is " + body.current.temperature +"°F out, and feels like " + body.current.feelslike + "°F.")
        }
        
    })
} 

module.exports = currentWeather