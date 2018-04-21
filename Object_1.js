// 除了字符串 数字 布尔值 null和undefined之外 其余值都是对象
// JS对象可以看作是属性(名/值)的无序集合 属性名可以是包含空字符串在内的任意字符串 属性值可以是任意的JS值
// 对象不仅仅是字符串到值的映射 除了保持自有属性外 JS对象还可以从对应的原型对象继承属性 但自有属性比继承属性具有更高的优先级

// 通过对象直接量创建普通对象 
// 普通对象都具有原型 它们的原型均为Object.prototype 它们都从该原型对象继承属性
// Object.prototype是没有原型(原型为null)的对象 它不继承任何属性 其他的原型对象都是普通对象
var point1 = {
    x:0,
    y:1            
};

var point2 = {
    x:point1.x + 5,
    y:point1.y * 2,
    'point-name': "peak"  // 当属性名里包含了空格 连字符时 属性名必须用字符串表示
};

point2['point-name']  // 访问属性
// "peak"

// 通过关键字new和构造函数调用创建对象 所创建对象的原型就是构造函数的prototype属性的值
new Object();  // 原型为Object.prototype
new Array();  // 原型为Array.prototype

// 所有内置构造函数以及大部分自定义的构造函数 都以Object.prototype为原型
var o = new Date();  // 创建的Date对象的属性同时继承自Date.prototype和Object.prototype(原型链)
Date.prototype.isPrototypeOf(o)
// true
Object.prototype.isPrototypeOf(o)
// true

Object.prototype.isPrototypeOf(Array)
// true
Object.prototype.isPrototypeOf(RegExp)
// true

// 还可以通过Object.create()创建对象 通过参数为对象指定原型 这样使得任意一个对象的属性都可以被另一个对象继承
var obj = {x:1,y:2};
var o1 = Object.create(obj);  // o1继承了obj对象的属性x和y
o1
// {}
o1.y
// 2
obj.isPrototypeOf(o1)  // 检测obj是否处于o1的继承链上 返回true时 表示obj是o1的原型
// true
Object.prototype.isPrototypeOf(o1)
// true

var o2 = Object.create(null);  // o2为没有原型的对象 不继承任何属性和方法
Object.prototype.isPrototypeOf(o2)
// false

var o3 = Object.create(Object.prototype);       // o3为一个普通空对象


var o = {x: 'fixed value'};
o;
// Object {x: "fixed value"}
var o1 = o;     //o1和o指向同一个对象 o1并非指向o的副本 所以通过o1改变x值时 o查看到x值也发生了改变
o1;
// Object {x: "fixed value"}
o1.x = 'new value';
o;
// Object {x: "new value"}

// 两种方法访问对象的属性
obj.property
obj['property']
// 通过方括号来访问属性时 方括号内的表达式必须返回的是字符串
// 通过方括号来访问属性也使得一切看起来像在操作数组 只是索引变为了字符串 而不是数字 这样的数组就是关联数组(散列)
// 所有对象都是关联数组

var addrObj = {
    address1:'China',
    address2:'France',
    address4:'German',
    address5:'Japan',
    address6:'Korea',
    address7:'India'
}
var addr = ''
for(var i=0;i<=4;i++) {
    addr += addrObj['address' + i] + '\n';  //通过方括号访问属性更具灵活性 方括号内的表达式动态的返回字符串 而通过点访问属性的标识符是写死在程序中的 无法更改
}

addr;
/*
"undefined  // addrObj['address0']不存在 因此会返回undefined
China
France
undefined
German
"
*/

typeof('address'+1)  // 字符串与数字相加结果为字符串
// "string"

var addr = '';
// for-in循环遍历对象中的所有可枚举属性 包括自有属性和继承属性
for(a in addrObj) {                // 用变量a遍历addrObj的属性名
    addr += addrObj[a] + ' ';
}

addr;
// "China France German Japan Korea India "

a;
// "address7"

delete a  // for-in循环中的变量a虽然没有显示的通过var声明到全局对象中 但是通过delete不能将它删除
// false

var o = {};
var o1 = Object.create(o);
o.x = 1;  // 对o设置自有属性
o1.y = 2;

var o2 = Object.create(o1);  // o o1以及Object.prototype都处于o2的继承链上
o2.z = 3;

// 查找o2对象的属性x时 如果o2中不存在 那将沿着o2的原型链继续查找 直到找到x属性 或是找到一个原型是null的对象为止

o2.x+o2.y;  // x和y分别继承自o和o1
// 3
o2.z.toString();  // toString()继承自Object.prototype
// "3"

o2.x = 4;  // o2中添加新属性x 并不会修改原型对象o中的属性x
o2.y = 5;                       
o2;
// Object {z: 3, x: 4, y: 5}

o2.x * o2.y;  // 查询一个属性时 首先是在自有属性中查找 如果查找不到才会沿着原型链去查找 自有属性比继承属性具有更高的优先级
// 20

o.x  // 原型对象的属性并没有修改
// 1
o1.y
// 2

// 只有在查询时才会体会到继承的存在 而设置属性和继承无关 设置属性时不会修改到原型链 通过该特性可以有选择地覆盖继承的属性