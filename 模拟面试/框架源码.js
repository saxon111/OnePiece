// virtual dom实现
// 有个$typeof 表示react元素

const REACT_ELEMENT_TYPE = 'REACT_ELEMENT_TYPE'


const RESOLVED_PROPS = {
    key: true
}
export const createElement = (type, config, children) => {
    const props = {}
    let key = null
    if (config !== null) {
        config.key = null
    }
    for (let propName in config) {
        if (RESOLVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName]
        }
    }
    props.children = children
    // const childrenLength = arguments.length - 2
    const element = {
        $$typeof,
        type,
        key,
        props
    }
    return element
};

// props.children 可能是number，string，react元素，或者数组
