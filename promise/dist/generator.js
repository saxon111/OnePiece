const { reject } = require("./bundle");

function* read() {}

const it = read();
console.log(it.next());

const p = new Promise((resolve, reject) => {
  resolve(1);
});

p.then((data) => {
  return Promise.resolve(data)
    .then((data) => {
      return data + 1;
    })
    .then((data) => {
      console.log(">>>>>>>>>", data);
      return data;
    });
}).then((data) => {
  console.log("<><><><><><>", data);
});

//
function co(it) {
  return new Promise((resolve, reject) => {
    function next(val) {
      let { value, done } = it.next(val);
      if (done) {
        resolve(value);
      } else {
        Promise.resolve(value).then((data) => {
          next(data);
        });
      }
    }
    next()
  });
}
