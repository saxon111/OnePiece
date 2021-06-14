/**
 * hooks不能放在if或循环中
 */
import { render } from "react-dom";
import App from "./App";

const hookStates = []; //
let hookIndex = 0;

export const useState = (initialState) => {
  // 把老的值取出来，如果没有则使用默认值

  hookStates[hookIndex] = hookStates[hookIndex] || initialState;
  let curIndex = hookIndex;

  function setState(newState) {
    hookStates[curIndex] = newState;
    hookIndex = 0; // 在调度更新的时候，要把 索引重置为0
    render(<App />, document.getElementById("root"));
  }

  return [hookStates[hookIndex++], setState];
};

// let memoizedState = [] // hooks 的值存放在这个数组里
// let cursor = 0 // 当前 memoizedState 的索引

// export function useState(initialValue) {
//     console.log('>>>>>c',cursor)
//     memoizedState[cursor] = memoizedState[cursor] || initialValue
//     const currentCursor = cursor
//     function setState(newState) {
//         console.log('>>>cur',currentCursor, memoizedState)
//         memoizedState[currentCursor] = newState
//         cursor = 0
//         render(<App />, document.getElementById('root'))
//     }
//     return [memoizedState[cursor++], setState] // 返回当前 state，并把 cursor 加 1
// }
