// instanceOf

const { threadId } = require("worker_threads");

const myInstanceOf = (target, o) => {
  if (typeof target !== "object" || target === null) return false;
  let prorotype = o.prototype;
  let proto = Object.getPrototypeOf(target);
  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === prorotype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
};

// 实现 a == 1 && a == 2
let a = {
  value: 0,
  valueOf() {
    return ++this.value;
  },
};

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const res = [];
  const compose = (left, right, n, cur) => {
    if (left === n && right === n) {
      res.push(cur);
      return;
    }
    if (left < n) {
      compose(left + 1, right, n, cur + "(");
    }
    if (right < left) {
      compose(left, right + 1, n, cur + ")");
    }
  };
  compose(0, 0, n, "");
  return res;
};

// 发布订阅模式

class EventEmitter {
  constructor() {
    this._events = {};
  }

  // 订阅
  on(type, callback) {
    if (this._events[type]) {
      this._events[type].push(callback);
    } else {
      this._events[type] = [callback];
    }
  }

  // 发布
  emit(type, ...args) {
    if (this._events[type]) {
      this._events[type].forEach((fn) => fn(...args));
    }
  }
  once(type, callback) {
    const once = (...args) => {
      callback(...args);
      this.off(type, once);
    };
    once.l = callback;
    this.on(type, once);
  }
  off(type, callback) {
    this._events[type] = this._events[type].filter(
      (fn) => fn !== callback && fn.l !== callback
    );
  }
}
