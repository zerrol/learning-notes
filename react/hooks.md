
### 官方ESLint 

> https://reactjs.bootcss.com/docs/hooks-rules.html

**react-hooks/rules-of-hooks** 不要在循环，条件或嵌套函数中调用 Hook. **强制**

**react-hooks/exhaustive-deps** 依赖收集检查，要求hooks中依赖的变量需要全部放入`[]`中。 
> https://reactjs.bootcss.com/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies


### stale closure
> https://codesandbox.io/s/angry-lumiere-jdk8i?file=/src/App.js

陈旧闭包并不是react特有的问题。

```js
function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    const id = setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
    return function() {
      clearInterval(id);
    }
  }, []);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1) }>
        Increase
      </button>
    </div>
  );
}
```

简化：
```js
function Home(num) {
  let count = 0;
  function setCount(num) {
    count = num;
    Home()
  }

  if (!window.isMount) {
    setInterval(() => {
      console.log("first mount", count);
    }, 1000);
  }

  console.log("render", count);
  window.isMount = true;
  return {
    setCount
  };
}

// mount
Home()

let updateNode = Home()
updateNode.setCount(1)
```

解决方案：非常多，例如加入依赖收集、使用useRef、使用useReducer等

```js
import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 建立 interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

```

知道这个原因了，其实我们也能倒推很多种情况，例如一些

### 匿名函数的props导致重复渲染

### 最无脑的解决方案：useLocalStore

```js
import "./styles.css";

import { useState, useEffect } from "react";
import { Button } from "antd";
import { useLocalStore, observer } from "mobx-react";
// import { useInterval } from "./useInterval";

export default observer(function App() {
  // let [count, setCount] = useState(0);
  const store = useLocalStore(() => ({
    count: 0,
    setCount: (num) => {
      store.count = num;
    }
  }));

  useEffect(() => {
    let id = setInterval(() => {
      store.setCount(store.count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [store]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div>count: {store.count}</div>
      {/* <Button onClick={() => handleClickAsync(store.count + 1)}>setCount</Button> */}
    </div>
  );
});

```

### 思考

1. 为什么使用数组返回结构后的state和setState？

2. hooks内部使用的其实是链表管理依赖，为什么不传入一个string值当做hooks的名？例如：

```js
// ⚠️ This is NOT the React Hooks API
function Form() {
  // We pass some kind of state key to useState()
  const [name, setName] = useState('name');
  const [surname, setSurname] = useState('surname');
  const [width, setWidth] = useState('width');
  // ...
```

主要原因还是为了让自定义的hooks更加稳定。
> With this proposal, any time you add a new state variable inside a custom Hook, you risk breaking any components that use it (directly or transitively) because they might already use the same name for their own state variables.
（from: https://overreacted.io/why-do-hooks-rely-on-call-order/)

3. other...

### 推荐阅读
> react hooks 链表设计： https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e

> stale closure 问题： https://overreacted.io/making-setinterval-declarative-with-react-hooks/