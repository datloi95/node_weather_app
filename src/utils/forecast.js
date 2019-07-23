const request = require('request');

const forecast = (latitude,longitude, callback) =>{
    
    const url = 'https://api.darksky.net/forecast/b73c7257435d6b000cdfff3a1097484f/' + latitude + ',' + longitude + '?units=si';
    request({url: url, json: true}, (error, response)=>{
    if (error){
        callback('Unable to connect to weather url')
    }
    else if (response.body.error){
        callback("Invalid location")
    }
    else {
        callback(undefined, response.body.daily.data[0].summary + " Temp: " + response.body.currently.temperature + "C.There is " + response.body.currently.precipProbability + "% chance of raining")
    }
})
}

module.exports = forecast;