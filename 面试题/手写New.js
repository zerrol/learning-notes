
/**
 * 手写new关键字
 * @param {*} fn 构造函数
 * @param  {...any} args 参数
 */
function newF (fn, ...args) {
  // 1. 创建一个object
  // 2. 将obj的原型指向构造函数的原型对象
  let obj = Object.create(fn.prototype)

  // 3. 将this指向这个object，并执行构造函数
  let o = fn.apply(obj, args)

  // 4. 如果构造函数返回的是object，则返回构造函数返回的object;否则返回我们创建的
  if(o instanceof Object) 
    return o
  return obj
}

function Person (name, age)  {
  this.num = 100
  this.name = name
  this.age = age
}

let p1 = newF(Person, 2, 18)
console.log(p1.num, p1.name, p1.age)