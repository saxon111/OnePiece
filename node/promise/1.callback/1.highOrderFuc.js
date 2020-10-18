//高阶函数：两个特点满足一点 1. 我们给一个函数传入函数 2. 一个函数返回一个函数

//装饰器模式 （对原本的功能进行包装）

function core(a,b,c) {
  // todo...
  console.log("core");
}

//每个类都有一个原型
Function.prototype.before = function (beforeFn) {
  console.log(this);

  return (...args) => {
    beforeFn();
    this(...args);
  };
};

let newFn = core.before(() => {
    console.log('core before')
})

newFn(1,2,3)
core.before(() => {
  console.log("core before");
});
