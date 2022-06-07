const request = require('request')

const geocode = (address, callback) => {
    if (!address) {
        return callback("Please provide a location", undefined)
    }
    const url = 'http://api.positionstack.com/v1/forward?access_key=96ffa7b207be3a108794f7778b0aed87&query=' + encodeURIComponent(address) + '&limit=1'

    request({url, json: true}, (error, { body }) => { // body is deconstructed from response object
        if (error){
            callback("Unable to connect to location services!", undefined)
        }
        else if (body.error) {
            callback(body.error.context.query.message, undefined)
        }
        else if (body.data.length < 1) {
            callback("Couldn't Find Location. Try Again!", undefined)
        }
        else {
            callback(undefined, {
                name: body.data[0].label, 
                latitude: body.data[0].latitude, 
                longitude: body.data[0].longitude
            })
        }
    })
}

module.exports = geocode