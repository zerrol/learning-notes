/**
 * 函数调用时面试题
 */
function Foo() {
  this.getName = function () {
    console.log(3);
    return {
      getName: getName //这个就是第六问中涉及的构造函数的返回值问题
    }
  }; //这个就是第六问中涉及到的，JS构造函数公有方法和原型链方法的优先级
  getName = function () {
    console.log(1);
  };
  return this
}

Foo.getName = function () {
  console.log(2);
};

Foo.prototype.getName = function () {
  console.log(6);
};

var getName = function () {
  console.log(4);
};

function getName() {
  console.log(5);
} 

Foo.getName(); 
getName();      
console.log(Foo()) 
Foo().getName();  
getName(); 
new Foo.getName();  
new Foo().getName(); 
//多了一问
new Foo().getName().getName();  
new new Foo().getName(); 






// 答案
// 解析：https://mp.weixin.qq.com/s/0zBsqkqzBBZqUl3nPdXlXw
// Foo.getName(); //2
// getName(); //4
// console.log(Foo())
// Foo().getName(); //1
// getName(); //1
// new Foo.getName(); //2
// new Foo().getName(); //3
// //多了一问
// new Foo().getName().getName(); //3 1
// new new Foo().getName(); //3
