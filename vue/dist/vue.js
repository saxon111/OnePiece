(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var oldArrayProtoMethods = Array.prototype; // 不能直接改写数组原有方法 不可靠，因为只有被vue控制的数组才需要改写

  var arrayMethods = Object.create(Array.prototype);
  var methods = [// concat slice ... 都不能改变原数组
  "push", "pop", "shift", "unshift", "splice", "reverse", "sort"];
  methods.forEach(function (method) {
    // AOP 切片编程
    arrayMethods[method] = function () {
      var _oldArrayProtoMethods;

      // todo...
      console.log("数组变化"); // 有可能用户新增的数据时对象格式 也需要进行拦截

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = (_oldArrayProtoMethods = oldArrayProtoMethods[method]).call.apply(_oldArrayProtoMethods, [this].concat(args));

      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case "push":
        case "unshift":
          inserted = args;
          break;

        case "splice":
          // splice(0,1,xxxx)
          inserted = args.slice(2);
      }

      if (inserted) ob.observeArray(inserted);
      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      //需要对这个value属性重新定义
      // value可能是对象 可能是数组，分类来处理；
      // value.__ob__ = this;
      Object.defineProperty(value, "__ob__", {
        value: this,
        enumerable: false,
        // 不能被枚举表示 不能被循环
        configurable: false // 不能删除此属性

      });

      if (Array.isArray(value)) {
        //数组不用defineProperty
        // value.__proto__ = arrayMethods
        // push shift reverse sort  我要重写这些方法增加更新逻辑
        Object.setPrototypeOf(value, arrayMethods); // 循环将属性赋予上去

        this.observeArray(value); // 原有数组中的对象  Object.freeze()
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        for (var i = 0; i < value.length; i++) {
          observe(value[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        // 将对象中的所有key，重新用defineProperty定义成响应式的
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    // vue2中数据嵌套不要过深 过深浪费性能
    observe(value); // 对结果递归拦截

    Object.defineProperty(data, key, {
      get: function get() {
        console.log("get");
        return value;
      },
      set: function set(newValue) {
        console.log("set");
        if (newValue === value) return;
        observe(newValue); // 如果用户设置的是一个对象 ， 就继续将用户设置的对象变成响应式的

        value = newValue;
      }
    });
  }

  function observe(data) {
    // 只对对象类型进行观测，非对象类型无法观测
    if (_typeof(data) !== "object" || data === null) {
      return;
    }

    if (data.__ob__) {
      // 放置循环引用了
      return;
    } // 通过类来实现对数据的观测 类可以方便扩展， 会产生实例


    console.log(data, "-------------");
    return new Observer(data);
  }

  function initState(vm) {
    //将所有属性都定义在vm属性上，并且后续更改需要触发视图更新
    var opts = vm.$options;

    if (opts.data) {
      //数据初始化
      initData(vm);
    } // if (opts.method) {
    // }
    // if (opts.props) {
    // }
    // if (opts.computed) {
    // }
    // if (opts.watch) {
    // }

  }

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newVal) {
        vm[source][key] = newVal;
      }
    });
  }

  function initData(vm) {
    // 数据劫持  Object.defineProperty
    console.log(vm);
    var data = vm.$options.data; // 对data类型进行判断 如果是函数 获取函数返回值作为对象

    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // 通过vm._data 获取劫持后的数据，用户就可以拿到_data了
    // 将_data中的数据全部放到vm上

    for (var key in data) {
      proxy(vm, '_data', key); //vm.name => vm._data.name
    } //观测这个数据


    observe(data);
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // aa-aa

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //aa:aa

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 可以匹配到标签名  [1]

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); //[0] 标签的结束名字
  //    style="xxx"   style='xxx'  style=xxx

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var startTagClose = /^\s*(\/?)>/;
  function parseHTML(html) {
    function createASTElement(tag, attrs) {
      //vue3里面支持多个根元素(外层加了一个空元素)，vue2中只有一个根节点
      return {
        tag: tag,
        type: 1,
        children: [],
        attrs: attrs,
        parent: null
      };
    }

    var root = null;
    var currentParent;
    var stack = []; // 根据开始标签 结束标签 文本内容 生成ast语法树

    function start(tagName, attrs) {
      var element = createASTElement(tagName, attrs);

      if (!root) {
        root = element;
      }

      currentParent = element;
      stack.push(element);
      console.log("start--------->", tagName);
    }

    function end(tagName) {
      var element = stack.pop();
      currentParent = stack[stack.length - 1];

      if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
      }

      console.log("end--------->", tagName);
    }

    function chars(text) {
      text = text.replace(/\s/g, '');

      if (text) {
        currentParent.children.push({
          type: 3,
          text: text
        });
      }

      console.log("text--------->", text);
    }

    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); //获取元素
        // 查找属性

        var _end;

        var attr; // 不是开头标签结尾就一直解析

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length);
          console.log(attr);
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5] || true
          });
          console.log(match, attr[1], attr[3]);
        }

        if (_end) {
          advance(_end[0].length);
          return match;
        }
      }
    }

    while (html) {
      var textEnd = html.indexOf("<");

      if (textEnd === 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs); //开始标签
          // console.log("开始", startTagMatch.tagName);

          continue;
        } //结束标签


        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        } // continue
        // console.log(startTagMatch);

      }

      var text = void 0;

      if (textEnd > 0) {
        // debugger
        //开始解析文本
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text); // console.log("wenben", html);
      }
    }

    return root;
  } // ast语法树

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

  function genProps(attrs) {
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i]; // name,value

      if (attr.name === 'style') {
        (function () {
          var obj = {};
          attr.value.split(';').forEach(function (item) {
            var _item$split = item.split(':'),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj; // {style:{color:red}}
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ","); // {a:'aaa',a:1,b:2,}
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function genChildren(el) {
    var children = el.children;

    if (children) {
      return children.map(function (child) {
        return gen(child);
      }).join(',');
    }
  }

  function gen(node) {
    // 区分是元素 还是文本
    if (node.type == 1) {
      return generate(node);
    } else {
      //文本 逻辑不能用 _c来处理
      // 有{{}} 普通文本  混合文本 {{aa}} aaa {{bbb}} ccc
      var text = node.text;

      if (defaultTagRE.test(text)) {
        // _v(_s(name) + 'aa' + _s(age) + '哈哈'）
        var tokens = [];
        var match;
        var index = 0;
        var lastIndex = defaultTagRE.lastIndex = 0;

        while (match = defaultTagRE.exec(text)) {
          // aa {{ age }} haha 
          index = match.index;

          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }

          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }

        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }

        return "_v(".concat(tokens.join('+'), ")"); // 是带有{{}}
      } else {
        return "_v(".concat(JSON.stringify(text), ")");
      }
    }
  }

  function generate(el) {
    // console.log(el); // 转换成render代码
    var children = genChildren(el);
    var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? genProps(el.attrs) : 'undefined', " ").concat(children ? ',' + children : '', ")"); // => js代码 html=> js代码  字符串拼接

    return code;
  }
  /* 
  <div id="app" a=1 b=2>
      <span style"=color:red">{{name}} <a>hello</a></span>
  </div> 
   _c(
      'div',{id:'app',a:1,b:2}
      ,_c(
          'span',
          {style:{color:'red'}}
          ,_s(_v(name)),
          _c(a,undefined,_v('hello'))
          )
  )
  */

  function compileToFunctions(template) {
    var ast = parseHTML(template);
    console.log(ast);
    var code = generate(ast); //生成代码

    console.log(code);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;
      console.log(options); // 初始化状态

      initState(vm);

      if (vm.$options.el) {
        // 数据可以挂载到页面上
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      el = document.querySelector(el);
      var vm = this;
      var options = vm.$options; // 如果有render 就直接使用render
      // 没有render 看有没有template属性
      // 没有template，就接着找外部模板

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML; // 火狐不兼容 document.createElement('div').appendChild('app').innerHTML
        } // 如何将模板编译成render 函数


        var render = compileToFunctions(template);
        options.render = render;
      }
    };
  }

  // Vue2.0 中就是一个构造函数

  function Vue(options) {
    console.log(options);

    this._init(options); // 当用户new Vue时 就调用init方法进行vue的初始方法

  } // 可以拆分逻辑到不同文件中 更有利于维护


  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
