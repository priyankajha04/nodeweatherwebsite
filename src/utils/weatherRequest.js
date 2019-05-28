const request = require('request')

const weatherRequest = (lat,long,callback) => {
    const url = `https://api.darksky.net/forecast/bd3eb78908882402db27261132c1a4bd/${long},${lat}?units=si`

    request({url, json: true},(error,{body}) => {

        if(error) {
            callback('Oops!! Sorry you are not connected to the internet!!',undefined)
        }
        else if(body.error) {
            callback('Unable to find location',undefined)
             }

             else {
                callback(undefined,{
                    Summary : body.daily.data[0].summary,
                     Temperature : body.currently.temperature,
                      Percepitation: body.currently.precipProbability
                })
             }
    }
    )

   }

   module.exports = weatherRequest