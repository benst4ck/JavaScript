var x = {
  a:{b:1}
};

x;
// Object {a: Object}
var y = x.a;
y;
// Object {b: 1}

delete x.a;                 // 删除x对象的a属性 实际只是断开属性和宿主对象的联系 而且delete只能删除自有属性 要删除继承属性只能从定义该属性的原型对象上去删除它
// true                     // 删除成功 当删除不存在的属性或是删除继承属性时也都返回true
x;
// Object {}
y;                // 已经删除的属性的引用仍然存在 在某些实现中可能因为这种不严谨的代码导致内存泄漏 所以在销毁对象时 应该遍历属性中的属性 依次删除
// Object {b: 1}

// delete不能删除可配置性为false的属性
delete Object.prototype;        // 该内置对象的属性是不可配置的 类似的还有通过变量声明和函数声明创建的全局对象的属性 这些是delete不能删除的
// false

var x = 1;      // 变量声明
delete this.x;
// false

function f() {};    // 函数声明
delete this.f;
// false

// 删除全局对象的可配置属性
this.x = 10;        // 创建一个可配置的全局属性(没有用var)
delete x;           // 严格模式下 必须显示指明对象及其属性 delete this.x;
// true

var o = {x:1};
'x' in o;  // 如果x是对象o的自有属性或继承属性则返回true
// true
'y' in o;
// false
'toString' in o;
// true
o.hasOwnProperty('x')  // 如果x是对象o的自有属性则返回true
// true
o.hasOwnProperty('y')           
// false
o.hasOwnProperty('toString');
// false
Object.prototype.hasOwnProperty('toString')
// true

o.propertyIsEnumerable('x')     // x为o的自有属性且属性x的可枚举性为true时 它才返回true
// true

Object.prototype.propertyIsEnumerable('toString')   // toString是自有属性 但是不可枚举
// false

var o1 = Object.create({x:1,y:2});

o1.z = 4;
o1;
// Object {z: 4}

Object.keys(o1);  // 返回一个数组 该数组包含了o1对象中可枚举的自有属性的名字
// ["z"]
Object.getOwnPropertyNames(o1)  // 返回对象的所有自有属性的属性名组成的数组 包括不可枚举的属性
// ["z"]

var str = '';
for(p in o1) {  //for-in循环遍历o1对象中的所有可枚举属性 包括自有属性和继承属性
    str += o1[p] + ' ';
}
// "4 1 2 "

// 可以向Object.prototype添加新的方法或者属性 但是在ES5标准之前 这些新添加的方法和属性是不能定义为不可枚举的 因此继承后会被for-in循环枚举出来
// 通过下面方法避免上述情况
// 遍历对象属性时跳过继承的属性
for(p in o) {
    if (!o.hasOwnProperty(p)) continue;  // continue不退出循环 而是跳过本次的循环逻辑去执行下一次循环
}

// 遍历对象属性时跳过方法
for(p in o) {
    if (typeof o[p] === 'function') continue;
}


// for-in 遍历可枚举的自有属性和继承属性
// 'prop' in obj 自有属性或继承属性 返回true

// obj.hasOwnProperty('prop')  自有属性 返回true
// Object.getOwnPropertyNames(obj) 返回所有自有属性的属性名组成的数组

// obj.propertyIsEnumerable('prop') 可枚举的自有属性 返回true
// Object.keys(obj) 返回可枚举的自有属性的属性名组成的数组
