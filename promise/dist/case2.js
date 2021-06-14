const Promise = require("./bundle");

const p = new Promise((resolve,reject) => {
    reject('err')
})

p.then().then(() => {}, () => {
    return 1
}).catch((err) => {
    console.log('ddd',err)
}).then((d) => {
console.log('>>>>>',d)
})



Promise.reject(123).finally((data) => { // 这里传入的函数 无论如何都会执行
    console.log('finally');
    // finally 可以返回一个promise 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok');
        }, 5000);
    })
}).then(data => {
    console.log('s:' + data);
}, err => {
    console.log('e:' + err);
})