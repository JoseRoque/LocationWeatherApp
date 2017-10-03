var getUser = (id, callback) => {
  var user = {
    id:id,
    name: 'Vikram'
  };
  setTimeout(() => {
    callback(user); // simulated delay
  }, 3000);
};

getUser(31, (userObj) => {
  console.log(userObj);
});
