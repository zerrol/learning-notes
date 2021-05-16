// es6 

class Fruit2{ }
 
class Apple2 extends Fruit2{
  a = '123'
  b = {a: 1}
  hello() {}
}

// 以下是babel生成的
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  // 通过Object.create可以使subClass.prototype的__proto__等于SuperClass.prototype
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

/**
 * 上面_createSuper创建super，简单梳理，不处理proxy
 * @param {*} SubClass 
 */
function simpleCreateSuper(SubClass) {
  return function() {
    // 拿到 subClass.__proto__，其实就是父类
    var SuperClass = _getPrototypeOf(SubClass);

    // TODO: problem 创建父元素的实例，没有使用new关键字，result应该是空
    var result = SuperClass.apply(this, arguments);

    // 有result就返回result，没有直接返回this
    return _possibleConstructorReturn(this, result);
  } 

}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var Fruit2 = function Fruit2() {
  _classCallCheck(this, Fruit2);
};

var Apple2 = /*#__PURE__*/ (function(_Fruit) {
  // 先将prototype 和 __proto__ 继承过来
  _inherits(Apple2, _Fruit);

  // 新增super
  var _super = _createSuper(Apple2);

  // 子类无属性的情况的实现
  // function Apple2() {
  //   _classCallCheck(this, Apple2);

  //   return _super.apply(this, arguments);
  // }

  // 子类有属性，无constructor的实现
  function Apple2() {
    var _this;

    // 验证是不是没有被作为构造函数调用，如果是就报错
    _classCallCheck(this, Apple2);

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    // 没有构造
    // 传递给super
    _this = _super.call.apply(_super, [this].concat(args));

    // this.a = '123'
    _defineProperty(_assertThisInitialized(_this), "a", "123");

    // this.b = {a: 1}
    _defineProperty(_assertThisInitialized(_this), "b", {
      a: 1
    });

    return _this;
  }

  // hello是方法，定义到prototype上
  _createClass(Apple2, [
    {
      key: "hello",
      value: function hello() {}
    }
  ]);

  return Apple2;
})(Fruit2);