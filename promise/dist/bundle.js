'use strict';

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
var STATUS;
(function (STATUS) {
    STATUS["pending"] = "PENDING";
    STATUS["fulfilled"] = "FULFILLED";
    STATUS["rejected"] = "REJECTED";
})(STATUS || (STATUS = {}));
// 核心逻辑，解析x类型，决定promise2走成功还是失败
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError("Chaining cycle detected for promise!"));
    }
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
        // 只有x是对象或者函数才可能是promise
        var thenCalledOrThrow_1 = false;
        try {
            var then = x.then;
            if (typeof then === "function") {
                then.call(x, function (y) {
                    if (thenCalledOrThrow_1)
                        return;
                    thenCalledOrThrow_1 = true;
                    return resolvePromise(promise2, y, resolve, reject);
                }, function (r) {
                    if (thenCalledOrThrow_1)
                        return;
                    thenCalledOrThrow_1 = true;
                    return reject(r);
                });
            }
            else {
                resolve(x);
            }
        }
        catch (e) {
            if (thenCalledOrThrow_1)
                return;
            thenCalledOrThrow_1 = true;
            return reject(e);
        }
    }
    else {
        // 如果不是，肯定是普通值
        resolve(x);
    }
}
var Promise$1 = /** @class */ (function () {
    function Promise(executor) {
        var _this = this;
        this.status = STATUS.pending;
        this.value = undefined; // 成功原因
        this.reason = undefined; // 失败原因
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];
        var resolve = function (value) {
            if (value instanceof Promise) {
                // 是promise 就继续递归解析
                return value.then(resolve, reject);
            }
            if (_this.status === STATUS.pending) {
                _this.status = STATUS.fulfilled;
                _this.value = value;
                _this.onResolvedCallback.forEach(function (fn) { return fn(); });
            }
        };
        var reject = function (reason) {
            if (_this.status === STATUS.pending) {
                _this.status = STATUS.rejected;
                _this.reason = reason;
                _this.onRejectedCallback.forEach(function (fn) { return fn(); });
            }
        };
        try {
            executor(resolve, reject);
        }
        catch (e) {
            reject(e);
        }
    }
    Promise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        onFulfilled =
            typeof onFulfilled === "function"
                ? onFulfilled
                : function (v) {
                    return v;
                };
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : function (r) {
                    throw r;
                };
        var promise2 = new Promise(function (resolve, reject) {
            if (_this.status === STATUS.fulfilled) {
                setTimeout(function () {
                    try {
                        var x = onFulfilled(_this.value); // x可能是一个promise
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (_this.status === STATUS.rejected) {
                setTimeout(function () {
                    try {
                        var x = onRejected(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (_this.status === STATUS.pending) {
                _this.onResolvedCallback.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onFulfilled(_this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                _this.onRejectedCallback.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onRejected(_this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    };
    Promise.prototype.catch = function (errFn) {
        return this.then(null, errFn);
    };
    Promise.prototype.finally = function (fn) {
        return this.then(function (value) {
            Promise.resolve(fn()).then(function () { return value; });
            return value;
        }, function (reason) {
            Promise.resolve(fn());
            throw reason;
        });
    };
    Promise.resolve = function (value) {
        return new Promise(function (resolve, reject) {
            resolve(value);
        });
    };
    Promise.reject = function (value) {
        return new Promise(function (resolve, reject) {
            reject(value);
        });
    };
    return Promise;
}());
Promise$1.deferred = function () {
    var dfd = {};
    dfd.promise = new Promise$1(function (resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};

module.exports = Promise$1;
