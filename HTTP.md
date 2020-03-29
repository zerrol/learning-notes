
### HTTP 超文本传输协议

`http协议`是在应用层使用的，**无状态**的网络通信协议。

#### HTTP 1.0、1.1、2.0、3.0

#### 状态管理 (Cookie / token)

http是无状态协议，所以当服务端接收到请求时，是无法直接知道发起请求方的状态信息的。所以为了解决实际使用http协议时的状态管理的问题。主要会使用Cookie或者在请求头中携带Token的形式。
##### Cookie

`Cookie` 是保存在请求头部，在每次http请求发起请求时，携带着的数据。一般Cookie可以由服务器进行设置，也可以由客户端进行设置。关于Cookie的使用，由以下几点需要注意的地方：

1. 出与于对安全的考虑，现在是不推荐由客户端对Cookie进行维护的，应该由**服务器维护**。由服务端在响应请求时，通过请求头中的Set-Cookie字段，将cookie信息放入到请求头中，这样浏览器再第二次发起请求时，就会将cookie带过去。
2. Cookie 大小限制，chrome浏览器中是50kb
3. Cookie 不可跨域
4. cookie 是存在有效期的。cookie存放在浏览器时，会有一个**Expire/Max-age**属性。Max-Age，是以秒为单位的，Max-Age为正数时，cookie会在Max-Age秒之后，被删除，**当Max-Age为负数时，表示的是临时储存，不会生出cookie文件，只会存在浏览器内存中，且只会在打开的浏览器窗口或者子窗口有效**，一旦浏览器关闭，cookie就会消失，当Max-Age为0时，又会发生什么呢，删除cookie，因为cookie机制本身没有设置删除cookie，失效的cookie会被浏览器自动从内存中删除，所以，它实现的就是让cookie失效。
5. secue属性，当这个属性为true时，则cookie只会在https和ssl等安全协议下传输。
6. HttpOnly 面试常考，当这个属性为true时，**不能通过脚本来获取和修改cookie的值**，能有效防止xss攻击 

> 参考： https://juejin.im/post/59d1f59bf265da06700b0934

#### 常用头部

#### 缓存

##### 强缓存 （Expires、Cache-Control）

##### 协商缓存 (Last-Modified/If-Modified-Since)、(Etag/If-None-Match)

##### Push Cache

HTTP 2.0 中新增的内容。**它只会在Session中存在，一旦Session结束就会被释放。并且缓存时间也很短暂。

##### 如果什么缓存策略都没设置，那么浏览器会怎么处理？

对于这种情况，浏览器会采用一个启发式的算法，通常会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间。

> 参考：
> https://www.jianshu.com/p/54cc04190252
> https://mp.weixin.qq.com/s/Io-kEWygYuvqb5wqgygcuw

#### 状态码 (2xx / 3xx / 4xx / 5xx)

### HTTPS 安全的传输协议

#### HTTP + 对称 + 非对称加密 + 认证 + 完成性保护 = HTTPS

