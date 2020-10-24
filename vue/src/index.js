// Vue2.0 中就是一个构造函数
import { initMixin } from "./init"
function Vue(options) {
  console.log(options);
  this._init(options) // 当用户new Vue时 就调用init方法进行vue的初始方法
}

// 可以拆分逻辑到不同文件中 更有利于维护
initMixin(Vue)

export default Vue;
