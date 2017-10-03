const yargs = require('yargs');
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

// console.log(argv);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage) {
    console.log(errorMessage);
  }else {
    // console.log(JSON.stringify(results, undefined, 2));
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if(errorMessage){
        console.log(errorMessage);
      }else {
        // console.log(JSON.stringify(weatherResults, undefined, 2));
        console.log(`Its currently ${weatherResults.temperature}. it feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  } // end else
});

// when testing node feature just use node console by typing node





//
