// 之前讨论的属性都是数据属性 它只有一个简单的值
// 用getter(读)或setter(写)方法替代属性值后 这样的属性称为存取器属性

// 定义一个对象来表示2D笛卡尔点坐标 包括了笛卡尔坐标系表示和极坐标系表示
var point = {
    x:1.0,  // 普通的可读写的数据属性
    y:1.0,

    // 存取器属性定义为一个或两个和属性同名的函数 该函数没有使用function关键字定义 而是使用get/set
    // r是可读写的存取器属性
    get r() {  // getter 查询存储器属性的属性值
        return Math.sqrt(this.x*this.x + this.y*this.y);
    },
    set r(newvalue) {  // setter 设置存储器属性的属性值 读取只写属性总是返回undefined
        var oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
        var ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },

    //theta是只读存取器属性 它只有getter方法
    get theta() {
        return Math.atan2(this.y, this.x);  // 极坐标所表示的实际上是过原点和点(x,y)的直线上的所有点 
                                                    
    }
};


var p1 = Object.create(point);
p1.x;  // 获取继承属性
// 1
p1.y;
// 1
p1.r;  //存取器属性是可继承的
// 1.4142135623730951 相当于Math.sqrt(2)
p1.theta;
// 0.7853981633974483 单位为弧度 相当于45度 1度约等于0.017453弧度

p1.x = 4;  // 设置自有属性
// 4
p1.y = 0;
// 0
p1.r;
// 4
p1.theta;
// 0

p1.r = 8;  //在将8赋值给存取器属性r时 调用r的setter方法 并将8当作参数传递给setter的形参newvalue
// 8
p1.x;
// 8
p1.y;
// 0

// 数据属性的4个特性 分别是 值 可写性 可枚举性 可配置性
// 存取器属性的4个特性 分别是 读取(get) 写入(set) 可枚举性 可配置性

// 可写性 表明是否可以设置该属性的值
// 可枚举性 表明是否可通过for-in循环返回该属性
// 可配置性 表明是否可以删除或修改该属性的特性

Object.getOwnPropertyDescriptor(point, 'x');    //获取point对象的自有属性的属性描述符
// Object {value: 1, writable: true, enumerable: true, configurable: true}

Object.getOwnPropertyDescriptor(point, 'r');
// Object {enumerable: true, configurable: true, get: function, set: function}

Object.getOwnPropertyDescriptor(point, 'theta');
// Object {set: undefined, enumerable: true, configurable: true, get: function}

var o = {};

//对于新创建的属性 默认的特性值是false或undefined
Object.defineProperty(o, 'x', {value:4,writable:true,configurable:true});  //向对象o中 添加属性x 第三个参数为属性x的属性描述符
o;
// {x: 4}

Object.getOwnPropertyDescriptor(o, 'x'); 
// {value: 4, writable: true, enumerable: false, configurable: true}
o.x = 6;
o.x;
// 6

Object.keys(o);  // x属性存在 但是可枚举性为false
// []

Object.getOwnPropertyNames(o);
// ["x"]

Object.defineProperty(o, 'x', {writable:false});  // 修改x属性的可写性为false 注意 修改不了继承属性
o.x = 5;
o.x;      // 修改属性值失败
// 6

Object.defineProperty(o, 'x', {value:10});
o.x;      // 修改属性值成功 因为属性的可配置性为true 可写性为false时可以通过该方法修改属性值
// 10

Object.defineProperty(o, 'x', {get:function() {return 0;}});    // 将x从数据属性修改为存取器属性
o.x;
// 0

Object.getOwnPropertyDescriptor(o,'x');
// Object {set: undefined, enumerable: false, configurable: true, get: function}

//向Object.prototype添加一个不可枚举的extend()方法 改方法使得一个对象可以从另一个对象复制自己没有的属性 同时会复制属性的特性
Object.defineProperty(Object.prototype,
  'extend',
  {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function(o) {
      var names = Object.getOwnPropertyNames(o);  // o是要被添加的属性所在的对象 names为一个列表 包含对象的所有自有属性 包括不可枚举属性
      for(var i = 0; i < names.length; i++) {  // 遍历o所有的自有属性
        if (names[i] in this) continue;  // 检查将要被扩展的对象中是否存在同名属性 如果存在 则跳到下一次循环 保留原有属性 this指向调用extend方法的对象
        var desc = Object.getOwnPropertyDescriptor(o, names[i]);  // 不存在同名属性时 获取o对象中自有属性的描述符 为复制属性做准备
        Object.defineProperty(this, names[i], desc);  // 将属性写入调用extend方法的对象
      }
    }
  }
);

var om = Object.defineProperties({},{
  a: {value:2,writable:true,enumerable:false,configurable:true},
  b: {value:5,writable:false,enumerable:false,configurable:true},
  c: {value:6,writable:false,enumerable:true,configurable:true},
  d: {value:9,writable:true,enumerable:true,configurable:true},
  e: {get:function() {return 0;},enumerable:false,configurable:true}

});

var ol = {c:18};  // ol的原型为Object.prototype 所以ol现在有extend方法
ol.extend(om);  // 通过om的属性来扩展ol
ol;  // om中的c属性被忽略 保留ol中的原有属性 这里列出的都是自有属性 但不会列出存取器属性(e)
// Object {c: 18, d: 9, a: 2, b: 5}       
Object.keys(ol);
// ["c", "d"]
Object.getOwnPropertyNames(ol);
// ["c", "a", "b", "d", "e"]
ol.e;
// 0

Object.getOwnPropertyDescriptor(om,'e');
// Object {set: undefined, enumerable: false, configurable: true, get: function}
Object.getOwnPropertyDescriptor(om,'b');
// Object {value: 5, writable: false, enumerable: false, configurable: true}

// 对于通过Object.defineProperty新创建的属性 默认的特性值是false或undefined
// 对于通过对象直接量创建的属性 默认的特性值为true
Object.getOwnPropertyDescriptor(ol,'c');
// {value: 18, writable: true, enumerable: true, configurable: true}

// for-in 遍历可枚举的自有属性和继承属性 Object.keys(obj)返回的内容 for-in都能遍历到
// 'prop' in obj 自有属性或继承属性 返回true

// obj.hasOwnProperty('prop')  自有属性 返回true
// Object.getOwnPropertyNames(obj) 返回所有自有属性的属性名组成的数组

// obj.propertyIsEnumerable('prop') 可枚举的自有属性 返回true
// Object.keys(obj) 返回可枚举的自有属性的属性名组成的数组