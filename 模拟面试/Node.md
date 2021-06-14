### 模块机制

### require原理

### 事件循环（node）
timers: 此阶段实行setTimeout和setInterval设置的回调；

pending callbacks：执行推迟到下个循环迭代的I/O回调；

idle，prepare： 仅在内部使用

poll：取出新完成的I/O事件，执行与 I/O 相关的回调（除了关闭回调，计时器调度的回调和 setImmediate 之外，几乎所有这些回调） 适当时，node 将在此处阻塞。

轮询阶段主要两个功能：1. 计算应该阻塞并I/O轮询时间。 2. 处理轮询队列中的事件

check: 在这里调用setImmediate 回调

close callbacks：一些关闭回调

### setImmediate 和 setTimeout区别
setImmediate 设计在当前轮询（poll）阶段完成后去执行脚本
setTimeout 计划在以毫秒为单位的最小阈值过去之后运行脚本。


### cluster模块
- cluster是node.js中用于实现和管理多进程的模块。

### steam模块
- Readable Stream： Flowing Mode

