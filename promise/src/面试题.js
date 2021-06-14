// node api转换promise api

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push(function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
      fn.apply(this, ...args);
    });
  };
}

const promiseF = (...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log(args);
      resolve(...args);
    }, 3000);
  });
};

const delayPromise = (promiseFn, time) => {
  const delay = (wait) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("sorry, time out");
      }, wait);
    });
  };
  return (...args) => {
   return Promise.race[promiseFn(...args), delay(time)];
  };
};

const p = delayPromise(promiseF, 1000)
console.log(p)
p('hhh').then((d) => console.log(d))

// ------------------------------------------------------------------------------------------------------
// 实现Promise.all

function isPromise(x) {
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    if (typeof x.then === "function") {
      return true;
    }
    return false;
  }
}

Promise.all = function (values) {
  return new Promise((resolve, reject) => {
    const arr = [];
    let times = 0;
    function collectResult(value, key) {
      arr[key] = value;
      if (++times === values.length) {
        return resolve(arr);
      }
    }
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      if (isPromise(value)) {
        value.then((y) => {
          collectResult(y, i);
        }, reject);
      } else {
        collectResult(value, i);
      }
    }
  });
};

// test

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "foo");
});

Promise.all([promise1, promise2, promise3]).then(
  (values) => {
    console.log(values);
  },
  (err) => {
    console.log(err);
  }
);

//---------------------------------------------------------------------------------------------------

// Promise.race实现

function isPromise(x) {
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    if (typeof x.then === "function") {
      return true;
    }
    return false;
  }
}

Promise.race = function (values) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < values.length; i++) {
      value = values[i];
      if (isPromise(value)) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    }
  });
};

// test
const promise1 = new Promise((resolve, reject) => {
  setTimeout(reject, 500, "one");
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"
