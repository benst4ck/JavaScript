/*
	函数被调用时 函数中this的指向总结

	  顶层原则: 函数中的this总指向调用函数的对象

	  情况1 纯粹的函数调用
	    这是最常见的情况 全局调用或在另一个函数内调用 this指向全局对象(非严格模式下)或undefined(严格模式下) 但是这种情况下通常不使用this关键字

	  情况2 函数作为对象的方法被调用
			this 指向该对象

		情况3 函数作为构造函数调用
	  	this 指向新创建的实例

	  情况4 函数通过apply或call方法调用
	    this 指向 apply或call方法的第一个参数(表示调用函数的对象)
*/

// 如果函数挂载在一个对象上 作为对象的一个属性 那该函数称为对象的一个方法 当通过该对象来调用该函数时 该对象就是此次调用的上下文(context) 也就是该函数的this的指向
// 函数就是对象 所以可以给函数设置属性 甚至调用函数的方法

function printprops(o) {
  for(var p in o)
    console.log(p + ': ' + o[p] + '\n');  // 当return语句后没有一个相关的表达式 或函数不包含return语句时 返回undefined给调用者
}

// 递归计算非负整数x的阶层
function factorial(x) {  // 函数声明 声明了一个变量factorial 并把函数对象赋值给该变量
    if (x <= 1) return 1;  //return语句导致函数停止执行 并返回它的表达式的值给调用者
    return x * factorial(x-1);  // 递归 调用自己
}

var factorial = function(x) {  //函数定义表达式 适合用来定义只会用到一次的函数
    if (x <= 1) return 1;
    return x * factorial(x-1);      
};

var squared = (function(x) { return x*x; }(7));  // 函数声明后立即调用
squared;
// 49

// 使用函数定义表达式时 只有变量声明提前了 变量的初始化仍然在原来的位置 使用函数声明语句的话 函数名称和函数体均提前


// 以函数形式调用(就是在全局声明一个函数func后 在全局上下文环境下调用它 func())的函数通常不使用this关键字 不过可以通过this来判断当前是否是严格模式
var strict = (function() { return !this; }());  //非严格模式下 调用上下文(this的值)是全局对象

strict;  //如果strict的值为false 说明当前脚本运行在非严格模式下
// false

var strict = (function() { 'use strict'; return !this; }());  //严格模式下 调用上下文则是undefined
strict;
// true


var o = {x:99};
var x = 999;  // 定义在全局对象中

function f1(n) {
  var self = this;
  console.log(this === o);  // true
  this.x = this.x+n;

  f2();  // f1函数内调用f2 函数调用
  // 关键字this没有作用域的限制 嵌套的函数f2不会从调用它的函数(f1)中继承this
  // 嵌套函数作为方法调用时 其this的值指向调用它的对象
  // 嵌套函数作为函数调用时 其this的值指向全局对象(非严格模式下)或undefined(严格模式下)
  function f2() {
    console.log(this);  // Window{...}

    // self是外层函数f1的this的指向
    console.log(self === o);  // true
    console.log(this.x);  // 999
    console.log(self.x);  // 108
  }
}

o.m = f1;  // 给对象o定义方法m

// 函数f1作为方法被调用 执行的载体是对象o 函数中所有的操作都基于该对象o 对象o成为调用上下文 函数体可以使用this来引用该对象
o.m(9);  // 调用方法m 并传入参数9 相当于f1(9) 也可以写作 o['m'](9);
o;
// {x: 108, m: ƒ}


// 当调用函数的时候 如果传入的实参比函数声明时指定的形参个数要少 那么剩下的形参都将设置为undefined
// 给省略的参数赋一个合理的默认值
function getPropertyNames(obj, /* optional */ arr) {  // 可选参数应该放在参数列表的最后
  // 可以使用 arr = arr || []; 取代下面的if语句 但是前提是arr必须预先声明 arr为形参 相当于var arr;
  if (arr === undefined) arr = [];  //如果调用时省略了参数arr 则将参数arr设置为空数组
  for (var prop in obj)
    arr.push(prop);
  return arr;
}

var o1 = {
  u: 'up',
  d: 'down',
  l: 'left',
  r: 'right'
}

var x = getPropertyNames(o1);
x;
// ["u", "d", "l", "r"]

var o2 = {
  m: 'middle',
  b: 'before',
  a: 'after'
}

getPropertyNames(o2, x);  //将o2的属性追加到数组x中
// ["u", "d", "l", "r", "m", "b", "a"]


// 函数的形参列于函数声明中 在函数定义的函数体内使用 当函数调用时 形参是一类将被填充的空白或是占位符
// 实参是用来填充形参的 当函数被调用时 实参列在函数名后面的括号里 执行函数调用时 实参被传递给形参
// 如果定义函数f时 只定义了一个形参x 当调用f时如果传入了两个实参 第一个实参可以通过x或者arguments[0]获得 而第二个实参只能通过arguments[1]获得
// arguments是指向实参对象的引用 实参对象是一个类数组对象 它可以让函数操作任意数量的实参
function max() {
  var max = Number.NEGATIVE_INFINITY;  // 初始化max的值为-Infinity
  for (var i=0; i<arguments.length; i++)
    if (arguments[i] > max) max = arguments[i];
  return max;
}

max(1,10,100,2,3,10000,4,1000);  // 与内置max函数的功能一样
// 10000

function f(x) {
  console.log(x);  // 输出实参初始值
  arguments[0] = null;  // arguments指向的实参对象并不是一个数组 x和arguments[0]指向同一个值 修改其中一个的值会影响到另一个
  console.log(x);  // null
}

// 实参对象还定义了callee(指代当前正在执行的函数)和caller(指代调用当前正在执行的函数的函数) 两者都使用在非严格模式下
var factorial = function(x) {
  if (x<=1) return 1;
  return x * arguments.callee(x-1);  // 在匿名函数中通过callee来递归调用自身
};

// arguments并不是一个关键字 但在调用每个函数时都会自动声明它
// 由于闭包具有自己所绑定的arguments 因此闭包内无法直接访问外部函数的参数数组
// 但是可以像类似 var self = this; 在外部函数中绑定外部函数的arguments到一个变量 var outerArguments = arguments;
// 这样嵌套函数就可以通过变量outerArguments访问外部函数的arguments