const yargs = require('yargs');
const axios = require('axios');

const keys = require('./keys/keys');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

// encoding user input
const argv = yargs
  .options({
    a: {
      demand: true,
      alias:'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv; // string:true parse as string

  var encodedAddress = encodeURIComponent(argv.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

  axios.get(geocodeUrl).then( (response) => {
    if(response.data === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.'); // immediatly stops exec
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${keys.WEATHER_API_KEY}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl)
  })
  .then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`Its currently ${temperature} It feels like ${apparentTemperature}`);
  })
  .catch((error) => {
    // check error code and error response to see what message to make to user makes sense
    if(e.code === 'ENOTFOUND'){
      console.log('Unable to connect to API servers.');
    }else {
      console.log(error);
    }
  });

// promises over traditional b/c instead of nesting we just chain calls.
// so with promises we can keep everything at same level of indentation
