const request = require('request');
const keys = require('../keys/keys');

// we can wrap in promise lib that dont support promises, or we can use axios which supports promises
var geocodeAddress = (address) => {
  return new Promise( (resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {

      // machine errors - not able to send request, connect to network
      // request error - wrong args, gogole server not able to satisfy request, invalid address
      // NOTE: API have different info to determine errors
      if(error){
        reject('unable to connect to google servers'); // sys err
      }else if( body.status === 'ZERO_RESULTS'){ // specific to google api
        reject('unable to find that address'); // input err
      }else if( body.status == 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
        //console.log(JSON.stringify(body, undefined, 2)); // 2 spaces per indentation
      } // end else if
    }); //end request
  }); // end promise
};

geocodeAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
},(errorMessage) => {
  console.log(errorMessage);
});
