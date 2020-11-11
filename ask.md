
### webpack: 

#### webapck 常用的插件 mini-css-extra-plugin 和 optimized-css-asset-plugin 的区别

mini-css-extra-plugin 用于拆分css
optimized-css-asset-plugin 用于压缩

#### webpack 怎么往项目中注入全局变量

webpack.DefinePlugin

#### externals 的作用，可以帮助我们解决什么问题

#### webpack 中怎么配置代理进行跨域

#### webpack babel-polyfill 有什么用

#### 深入：webpackDevServer 热更新的原理是什么，怎么通知web进行更新的？

websocket

#### 深入 webpackDevServer proxy 的是怎么实现的？


#### 深入 webpack babel-polyfill 和 runtime 有什么区别？

polyfill 是全局修改使用的es6特性
runtime 可以会改成局部，防止污染

### react

#### state.arr.push() 然后 setState({arr}) 页面会渲染吗？这样写会导致什么问题？
页面会渲染，但是componentShouldUpdate会失效 

#### SCU的默认返回值是什么, pureComponent 和 component 有什么区别
pureComponent 实现了一个浅比较的componentShouldUpdate

#### React 组件不可传递的属性？
key ref

#### key 有什么作用？（可一直深入到vdom和diff）

#### useEffect/useState 能不能写到if中

不能

深入：为什么不能写到if中

#### hooks 使用的时候有什么注意事项？使用的时候可以怎么帮助团队正确使用hook

### react原理

#### 了解fiber吗，fiber的作用，为什么react需要引入fiber?

#### 在react中使用jsx实现一个`Component`然后通过`ReactDom.render()`渲染出这个元素，这个中间都发生了什么？
关键字： 

jsx编译后通过createElement生成ReactElement，交给render

render时 先通过 `Scheduler（调度器)` 分析渲染任务的优先级便将其加入到更新队列，然后`Reconciler（协调器）`会进行渲染前的处理包括虚拟dom的分析等最后交给Renderer处理， `Renderer（渲染器）`根据`Reconciler`处理后的标记进行dom操作，将元素渲染到页面上。

#### fiber在上面说的哪一步中使用的？

#### 函数式组件通过hook是怎么记住状态的？这个状态保存在哪里？

useState的状态是已单向链表的形式保存在这个函数组件对应的fiber中的`memorizedState`中的。

#### 为什么将hook使用if包裹起来会出现问题？

#### 动态路由 import()

webpack 中如何打包的？css 会自动拆分吗？

import() 兼容性问题如何解决的？


### 微前端

#### 子应用的入口如何实现？有哪些解决方案？

#### 路由劫持

#### js沙箱

#### css沙箱，shadow dom有什么问题

深入：未来有什么更好的解决方案？runtime css transformer(RFC) 

#### 通信



