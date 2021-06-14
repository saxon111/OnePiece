### koa和express原理

使用:
app.use(function(ctx) { // ctx上下文，帮我们提高req，res的功能
    ctx.body = 'hello'
})


ctx是koa中封装的上下文，有两对属性（req, res） ===>>> 原生http的， (request, response) ==>>> koa封装的

ctx实现
用Object.create(context) =>>>>>>>>> 应用间隔离
上下文就是代理对象

中间件实现
koa中间件原理是将多个中间件整合成一个promise，当最外层的promise执行完毕后就结束

function compose(ctx) {
    let index = -1; //默认没有调用
   const dispatch = (i) => {
       if (i <= index) {
          return Promise.reject('call multi times')
       }
       index = i
       if (i === this.middleware.length) {
           return Promise.resolve()
       }
       let middleware = this.middleware[i]
       return Promise.resolve(middleware(ctx, () => dispatch(i + 1))) //当用户调用next时，取出下一个去执行
    }
    return dispatch(0)
}