//函数柯里化

//柯里化也是一个高阶函数
//判断元素的类型

// function isType(str, typing) { //内置参数的功能
//     return Object.prototype.toString.call(str) === `[Object ${typing}]`
// }

// function isType(typing) {
//   //内置参数的功能
//   return function (val) {
//     return Object.prototype.toString.call(val) === `[object ${typing}]`;
//   };
// }


// let util = {};
// ;['String', 'Number', 'Boolean'].forEach((method) => {
//     util[`is`+method] = isType(method)
// })

//柯里化函数每次的入参都是一个函数

function sum (a,b,c,d,e) {
    return a +b +c +d +e
}
const curring = (fn, arr = []) => { // arr就是我们要收集每次调用时传入的参数
    let len = fn.length
    return function (...args) {
        let newArgs = [...arr, ...args]
        if (newArgs.length === len) {
            return fn(...newArgs)
        }else {
            return curring(fn, newArgs)
        }
    }

}

let newSum = curring(sum)
//偏函数

function isType(typing, str) { //内置参数的功能
    return Object.prototype.toString.call(str) === `[Object ${typing}]`
}

let newIsType = curring(isType)

let isString  = newIsType('String')

let isNumber = newIsType('Number')

console.log

