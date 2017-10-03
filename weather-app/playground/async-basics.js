console.log('Starting app');

setTimeout (() => {
  console.log('Inside of callback');
}, 2000); // contains async callback, we wouldnt acatually delay prod apps,
// at least I dont think there be a need it can simulate a async request tho

setTimeout(() => {
  console.log('2nd set timeout')
}, 0); // setTimeout is node api

console.log('Finishing up');
//                                            v-Event loop
// call stack -> node apis -> callback queue <-> call stack

// if call stack is empty callback in callback queue is removed and put onto call stack to be exec
// else callback in call stack remains in callback queue
// meanwhile node process runcs in node apis, till they return callback which is put into callback queue
// and eventually go on to call stack

// node main function

// callback func: func pass as arg to other func that gets called after some event
// perhaps to do something w/ data if call to db, or http req
