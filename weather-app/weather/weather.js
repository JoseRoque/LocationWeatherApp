const request = require('request');
const keys = require('../keys/keys');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${keys.WEATHER_API_KEY}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('unable to fetch the weather');
    }
  });
};

module.exports = {
  getWeather: getWeather
};


// promises make it easy to manage async request
// callbacks vs promises
