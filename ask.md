
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



