// 1.Promise是一个类，类中的构造函数需要传入一个excutor 默认就会执行
// 2.executor中有两个参数 分别是resolve，reject
// 3.默认创建一个proimise 状态就是pending  fulfilled  rejected  promise有三个状态
// 4.调用成功和失败时 需要传递一个成功的原因和失败的原因
// 5.如果已经成功了就不能失败了
// 6.每一个promise实例都有一个then方法
// 7.如果抛出异常按照失败来处理

// promise的链式调用问题
// 1.如果then方法中（成功或者失败） 返回的不是一个promise，会将这个值传递给外层下一次then的成功结果
// 2.如果执行then方法中的方法出错了 抛出异常 我走到下一个then的失败
// 3.如果返回的是一个promise 会用这个promise的结果作为下一次then的成功或者失败

// 1.出错会失败  2.返回的promise会出错

// then方法为什么可以链式调用 每次调用then都返回一个新的promise
// catch 就是then的别名 没有成功只有失败 （找最近的优先处理，处理不了找下一层）

enum STATUS {
  pending = "PENDING",
  fulfilled = "FULFILLED",
  rejected = "REJECTED",
}

// 核心逻辑，解析x类型，决定promise2走成功还是失败

function resolvePromise(promise2: any, x: any, resolve: any, reject: any) {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise!"));
  }
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 只有x是对象或者函数才可能是promise
    let thenCalledOrThrow = false;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y: any) => {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return resolvePromise(promise2, y, resolve, reject);
          },
          (r: any) => {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (thenCalledOrThrow) return;
      thenCalledOrThrow = true;
      return reject(e);
    }
  } else {
    // 如果不是，肯定是普通值
    resolve(x);
  }
}

class Promise {
  static deferred: any;
  status: STATUS;
  value: any;
  reason: any;
  onResolvedCallback: Function[];
  onRejectedCallback: Function[];

  constructor(executor: any) {
    this.status = STATUS.pending;
    this.value = undefined; // 成功原因
    this.reason = undefined; // 失败原因
    this.onResolvedCallback = [];
    this.onRejectedCallback = [];
    const resolve = (value?: any) => {
      if (value instanceof Promise) {
        // 是promise 就继续递归解析
        return value.then(resolve, reject);
      }
      if (this.status === STATUS.pending) {
        this.status = STATUS.fulfilled;
        this.value = value;
        this.onResolvedCallback.forEach((fn) => fn());
      }
    };
    const reject = (reason?: any) => {
      if (this.status === STATUS.pending) {
        this.status = STATUS.rejected;
        this.reason = reason;
        this.onRejectedCallback.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled?: any, onRejected?: any) {
    onFulfilled =
      typeof onFulfilled === "function"
        ? onFulfilled
        : function (v: any) {
            return v;
          };
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : function (r: any) {
            throw r;
          };
    const promise2 = new Promise((resolve: any, reject: any) => {
      if (this.status === STATUS.fulfilled) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value); // x可能是一个promise
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === STATUS.rejected) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === STATUS.pending) {
        this.onResolvedCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
  catch(errFn: any) {
    return this.then(null, errFn);
  }

  finally(fn: any) {
    return this.then(
      (value: any) => {
       return Promise.resolve(fn()).then(() => value);
        return value;
      },
      (reason: any) => {
       return Promise.resolve(fn()).then(() => {
          throw reason;
        });
        throw reason;
      }
    );
  }
  static resolve(value: any) {
    return new Promise((resolve: any, reject: any) => {
      resolve(value);
    });
  }
  static reject(value: any) {
    return new Promise((resolve: any, reject: any) => {
      reject(value);
    });
  }
}

Promise.deferred = function () {
  let dfd: any = {};
  dfd.promise = new Promise(function (resolve: any, reject: any) {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

export default Promise;
