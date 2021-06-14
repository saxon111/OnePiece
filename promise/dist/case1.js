const Promise = require("./bundle");

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ok");
  }, 1000);
  
});

promise
  .then(
    (data) => {
      console.log("success", data);
      return new Promise((resolve,reject) => {
          setTimeout(() => {
              console.log('OOOOOOkkkkkkk')
          },1000)
          resolve(100)
      });
    },
    (err) => {
      console.log("failed", err);
      return 1;
    }
  )
  .then(
    (data) => {
      console.log("success22", data);
    },
    (data) => {
      console.log("failed2", data);
    }
  );

// promise.then(
//   (data) => {
//     console.log("success2", data);
//   },
//   (err) => {
//     console.log("failed2", err);
//   }
// );
