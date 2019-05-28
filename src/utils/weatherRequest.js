const request = require('request')

const weatherRequest = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/bd3eb78908882402db27261132c1a4bd/${latitude},${longitude}?units=si`

    request({url, json: true},(error,{body}) => {

        if(error) {
            callback('Oops!! Sorry you are not connected to the internet!!',undefined)
        }
        else if(body.error) {
            callback('Unable to find location',undefined)
             }

             else {
                callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.'
                )
             }
    }
    )

   }

   module.exports = weatherRequest