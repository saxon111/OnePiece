import { observe } from "./observe/index"

export function initState(vm) {
    //将所有属性都定义在vm属性上，并且后续更改需要触发视图更新
    const opts = vm.$options

    if (opts.data) { //数据初始化
        initData(vm)
    }
    // if (opts.method) {

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
        get() {
            return vm[source][key]
        },
        set(newVal) {
            vm[source][key] = newVal
        }
    })
}
function initData(vm) {
    // 数据劫持  Object.defineProperty
    console.log(vm)
    let data = vm.$options.data
    // 对data类型进行判断 如果是函数 获取函数返回值作为对象
    data = vm._data = typeof data === 'function' ? data.call(vm) : data


     // 通过vm._data 获取劫持后的数据，用户就可以拿到_data了
    // 将_data中的数据全部放到vm上

    for (let key in data) {
        proxy(vm, '_data', key) //vm.name => vm._data.name
    }
    //观测这个数据
    observe(data)
}