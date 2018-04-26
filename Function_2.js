//给函数定义属性
uniqueInteger.counter = 0;  // 初始化函数对象的计数器属性 由于函数声明被提前了 所以这里可以在函数声明前给其成员赋值
function uniqueInteger() {
  return uniqueInteger.counter++;  // 先返回计数器的值 再自增1
}

uniqueInteger();
// 0
uniqueInteger();
// 1
uniqueInteger();
// 2
uniqueInteger.counter
// 3

// 使用函数自身属性(将自身当作数组来对待)来缓存上一次的计算结果
function factorial(n) {
  if (isFinite(n) && n>0 && n==Math.round(n)) {  // 有限的正整数
    if (!(n in factorial))  // 如果没有缓存结果
      factorial[n] = n*factorial(n-1);  // 通过递归计算结果并缓存
    return factorial[n];  // 返回缓存结果
  }
  else return NaN;  // 传入的参数有误
}
factorial[1] = 1;  // 初始化缓存以保存这种基本情况

factorial(5)
// 120
factorial[4]  // 缓存
// 24
factorial[6]
// undefined

// 青蛙上台阶问题 青蛙一次最多上3级台阶 n表示台阶数 求上n级台阶有多少种方法
function frog(n) {
  frog[1] = 1;
  frog[2] = 2;
  frog[3] = 4;
  if (isFinite(n) && n>0 && n==Math.round(n)) {
    if (!(n in frog))
      frog[n] = frog(n-1) + frog(n-2) + frog(n-3);
    return frog[n];
  }
  else return NaN;
}
frog(10);
// 274
Object.keys(frog)
// ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]


//闭包
var scope = 'global';
function checkscope() {
  var scope = 'local';
  function f() { return scope; }
  return f;  // 返回一个函数对象
}
checkscope()();  // 闭包实现了捕捉局部变量和参数的特性 并将这些局部变量和参数一直保存下来
// "local"

// 修改uniqueInteger函数
// 当外部函数返回后 除了内部函数以外 其他任何代码都无法访问counter变量
var uniqueInteger = (function() {
                      var counter = 0;  // 函数的私有状态 通过uniqueInteger.counter无法访问到
                      return function() { return counter++ };
                    }());

uniqueInteger;  // 函数定义后立即被调用 返回嵌套函数给变量uniqueInteger
// ƒ () { return counter++ }
uniqueInteger()
// 0
uniqueInteger()
// 1
uniqueInteger()
// 2


// 在同一个外部函数内定义的多个嵌套函数共享外部函数下定义的作用域链
function counter() {
  var n = 0;
  return {  // 返回一个对象
    count: function() { return n++; },  // 同一个计数器中 这两个方法共享变量n的状态
    reset: function() { n = 0; }
  };
}

var c = counter(), d = counter();  // 两个计数器互不影响
c.count();
// 0
c.count();
// 1
d.count();
// 0
d.count();
// 1
c.reset();
c.count();
// 0
d.count();
// 2

function counter(n) {  // 该函数并未声明局部变量 而是使用参数n来保存私有状态 属性存取器方法可以访问n 调用函数可以指定私有变量的初始值
  return {
    get count() { return n++ },  // 返回n值 然后n自增1
    set count(m) {
      if (m >= n) n = m;
      else throw Error('count can only be set to a larger value');
    }
  };
}

var c = counter(10);
c.count;
// 10
c.count;
// 11
c.count = 15;  // 不能写成 c.count(15) 因为它是存取器属性 而不是函数
c.count;
// 15
c.count;
// 16
c.count = 12;
// Uncaught Error: count can only be set to a larger value

function constfunc(v) {
  return function() { return v; };
}
var funcs = [];  // 创建一个数组来存储常数函数

for (var i = 0; i < 10; i++)
  funcs[i] = constfunc(i);

funcs;  // 其中的每个函数都保存了各自的私有状态v
// [ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ]
funcs[5]();
// 5
funcs[3]();
// 3
funcs[6]();
// 6

function constfunc() {  // 数组funcs内的10个函数共享外部函数中定义的所有变量 当return语句执行时 i的值为10 创建的这10个函数都共享这个i值
  var funcs = [];
  for (var i = 0; i < 10; i++)
    funcs[i] = function() { return i; };
  return funcs;
}

constfunc()[5]();
// 10
constfunc()[7]();
// 10