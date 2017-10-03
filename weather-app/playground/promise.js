var asyncAdd = (a, b) => {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {
      if( typeof a === 'number' && typeof b === 'number'){
        resolve(a + b);
      }else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  });
};

// returns a promise
// asyncAdd(5, 7).then((res)=> { // if 5 and '7' passed we get first error message but forced shoudl be 45, undefined to result so we used .catch instead
//   console.log('Result: ', res);
//   return asyncAdd(res, 33); // promise chaining
// }, (errorMessage) => {
//   console.log(errorMessage);
// }).then( (res)=> {
//   console.log('Should be 45', res);
// }, (errorMessage) => {
//   console.log(errorMessage)
// });

asyncAdd(5, 7).then((res)=> { // if 5 and '7' passed we get first error message but forced shoudl be 45, undefined to result so we used .catch instead
  console.log('Result: ', res);
  return asyncAdd(res, 33); // promise chaining
}).then((res) => {
  console.log('Should be 45', res);
}).catch((errorMessage) => {
  console.log(errorMessage)
});

var somePromise = new Promise((resolve, reject) =>  {
  // antythig involved w/ async action
  // when promis fullfilled its gone out and done the thing we wanted it to do
  setTimeout(() => {
    resolve('Hey, it worked.'); // requires only one object or obj with many keys and values (properties) works as well for multiple args
    reject('Unable to fullfill promise.'); // only one of resolve/ rejct function will result or be called
  },2500); // after 2500 msec we resolve
});

// promise: 2 func determine whether or not went as planned
// callback:  1 func that fired and arguments told us whether things went well
//

somePromise.then( (message) => {
  console.log('success', message);
},
(errorMessage) => {
  console.log('Error: ', errorMessage);
}); //


// NOTE: request library doesnt support promises but we can wrap it to return as promise
// so we can use .then(), first being success case, second being error case

// promise chaining
