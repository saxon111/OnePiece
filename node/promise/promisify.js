const fs = require('fs')

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3)
    },1000)
})

const p2 = new Promise((resolve, reject) => {
    reject(1)
})
Promise.race([p1, p2]).then((d) => console.log(d)).catch(d => console.log('err',d))




let PromiseWithAbort = function(promise){
    let _abort = null;
    let Pabort = new Promise((res,rej)=>{
      _abort = rej
    });
 
    let race = Promise.race([promise,Pabort]);
    race.abort = _abort; 
    return race;
  }
 
let p1= new Promise(res=>{
   setTimeout(()=>{
      res('p1 success');
   },2000)
})
 
let testP = PromiseWithAbort(p1);
 
testP.then(res=>{
  console.log('success:',res);
},error=>{
  console.log('error:',error);
})
 
setTimeout(() => {
    testP.abort('123');
},3000) 




let _abort = null;
let Pabort = new Promise((res,rej)=>{
  _abort = rej
});

let p = new Promise ((resolve, reject) => {

})

p.abort = _abort
