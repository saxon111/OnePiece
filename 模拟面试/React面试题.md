## React是什么
- 声明式（Declarative），不是命令式（Imperative）
- 组件化（代码复用）
- JSX实现声明式，虚拟DOM实现跨平台。


## JSX是什么
- JS的扩展语法，描述UI结构
- React.createElement的语法糖
- 对比模板语法

## JSX工作原理
- 通过babel编译（老的：具体就是，通过babel，有个插件@babel/plugin-transform-react-jsx编译成React.createElement,第一个元素是标签，然后是属性props，后面是children，所以说React16的时候，需要引入React）但是17以后，变成_jsx,不需要引入react
- AST，以树状形式表示源代码语法结构

## babel工作流
1. 先把源代码通过词法分析变成token
2. 再经过语法分析变成AST（有标签属性标志符初始值等）


## Virtual dom
普通的js对象描述DOM结构

优点
处理了浏览器兼容性问题，避免用户操作真实DOM，那么又麻烦又容易出错
内容经过了XSS处理，可以防范XSS攻击
容易实现跨平台开发Android、iOS、VR应用
更新的时候可以实现差异化更新，减少更新DOM的操作
缺点
虚拟DOM需要消耗额外的内存
首次渲染其实并不一定会更快

## 函数组件和类组件区别
源码如何区分：

值捕获特性

## 生命周期