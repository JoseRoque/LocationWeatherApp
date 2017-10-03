const request = require('request');

// callback function passed
var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {

    // machine errors - not able to send request, connect to network
    // request error - wrong args, gogole server not able to satisfy request, invalid address
    // NOTE: API have different info to determine errors
    if(error){
      callback('unable to connect to google servers'); // sys err
    }else if( body.status === 'ZERO_RESULTS'){ // specific to google api
      callback('unable to find that address'); // input err
    }else if( body.status == 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
      //console.log(JSON.stringify(body, undefined, 2)); // 2 spaces per indentation
    }
  });
};
// what makes an http request?
// body: core data returned
// response: include headers and request objects set by google, including data pertaining to request and response
// status codes let us know if any errors

module.exports = {
  geocodeAddress: geocodeAddress
};

//
