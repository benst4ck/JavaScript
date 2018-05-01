//不完全函数 把一次完整的函数调用拆分成多次函数调用 每次传入的实参都是完整实参的一部分
//每个拆分开的函数就叫做不完全函数(partial function) 每次函数调用叫做不完全调用(partial application) 每次调用都返回一个函数 直到得到最终运行结果为止

function array(a, n) { return Array.prototype.slice.call(a, n||0); }  //通过该函数将arguments对象转换为真正的数组

function partialLeft(f) {
  var args = arguments;  // 保存调用外部函数时传入的参数
  return function() {
    var a = array(args, 1);
    console.log(a);
    a = a.concat(array(arguments));
    console.log(a);
    return f.apply(this, a);  // this指向全局对象
  };
}

function partialRight(f) {
  var args = arguments;
  return function() {
    var a = array(arguments);
    console.log(a);
    a = a.concat(array(args, 1));
    console.log(a);
    return f.apply(this, a);
  };
}

function partial(f) {
  var args = arguments;
  return function() {
    var a = array(args, 1);
    console.log(a);
    var i=0, j=0;
    // 用arguments(内部)填充args(外部)中的undefined值
    for (;i<a.length; i++)
      if (a[i]===undefined) a[i] = arguments[j++];  // if条件为真时 先执行a[i] = arguments[j] 再执行j++
    console.log(a);
    a = a.concat(array(arguments, j));  // 填充后arguments中剩余的元素追加到数组a中
    console.log(a);
    return f.apply(this, a);
  };
}

var f =function(x,y,z) { return x * (y-z); };

partialLeft(f,2)(3,4);
// [2]
// [2, 3, 4]
// -2

partialRight(f,2)(3,4);
// [3, 4]
// [3, 4, 2]
// 6
partial(f,undefined,2)(3,4);
// [undefined, 2]
// [3, 2]
// [3, 2, 4]
// -6


function memorize(f) {
  var cache = {};
  return function() {
    var key = arguments.length + '-' + Array.prototype.join.call(arguments, ',');  // 将实参转换为字符串 并将其用做缓存的键
    console.log(key);
    console.log(cache);
    if (key in cache) return cache[key];  // 如果缓存中存在这个值 则直接返回
    else return cache[key] = f.apply(this, arguments);  // 否则调用既定的函数对传入对实参进行计算 然后将计算结果缓存并返回
  };
}

// 辗转相除求两个正整数的最大公约数
function gcd(a,b) {
  var t;
  if (a<b) t=b, b=a, a=t;  // 确保a>=b
  while(b!=0) t=b, b=a%b, a=t;  // 求最大公约数的欧几里德算法
  return a;
}

var gcdmemo = memorize(gcd);

gcdmemo(85, 187);
// 2-85,187
// {}
// 17

gcdmemo(18, 75);
// 2-18,75
// {2-85,187: 17}
// 3

gcdmemo(36, 72);
// 2-36,72
// {2-85,187: 17, 2-18,75: 3}
// 36

// 递归函数往往就需要记忆缓存功能
var factorial = memorize(function(n) {
                             return (n<=1) ? 1 : n * factorial(n-1);
                         });

factorial(5);

factorial(4);
// 1-4
// {1-1: 1, 1-2: 2, 1-3: 6, 1-4: 24, 1-5: 120}
// 24

// 剩余参数 允许将一个不定数量的参数表示为一个数组

// 如果函数的最后一个命名参数以...为前缀 则它将成为一个数组 它保存调用函数时传入的多余参数 这里的多余参数指的是 没有对应形参的实参
function(a, b, ...restArgs) {  // theArgs将收集该函数的第三个参数(因为第一个参数被映射到a，而第二个参数映射到b)和所有后续参数
  // ...
}

// 剩余参数不同于arguments对象
// 剩余参数只包含那些没有对应形参的实参 而arguments对象包含了传给函数的所有实参
// arguments对象不是一个真正的数组 而剩余参数是真正的Array实例

function multiply(multiplier, ...theArgs) {
  return theArgs.map(function (element) {
    return multiplier * element;
  });
}

var arr = multiply(2, 1, 2, 3);
arr;
// [2, 4, 6]

// 为了在arguments对象上使用Array方法 它必须首先被转换为一个真正的数组
function sortArguments() {
  var args = Array.prototype.slice.call(arguments);
  var sortedArgs = args.sort();
  return sortedArgs;
}
sortArguments(5, 3, 7, 1); // [1, 3, 5, 7]

// JavaScript中的函数运行在它们被定义的作用域里 而不是它们被执行的作用域里

function f(arr, result) {
  function g() {
    for(var i=0; i<arr.length; i++){  // 由于函数g定义在局部作用域中 所以这里的arr和result都将从外层函数f的局部作用域中查找获取 如果没有就报错 并不会去全局作用域查找
                                      // 对于普通函数(并非嵌套的函数) 先在函数的局部作用域查找获取变量 如果没有 就到全局作用域查找获取变量 全局作用域也没有对应变量则报错
      result.unshift(arr[i]);
    }
  }
  g();
  return result;
}

f([5,6,7,9,0],[])
// [0, 9, 7, 6, 5]

function g() {
  for(var i=0; i<arr.length; i++){  // g函数定义在全局作用域 即使是在f()函数内被调用 对于变量arr和result都将从全局作用域去获取
    result.unshift(arr[i]);
  }
  return result;
}

function f(arr, result) {
  var r = g();
  return r;
}
f([5,6,7,9,0],[])
// Uncaught ReferenceError: arr is not defined

// 所以闭包的真实意义其实就在于 在全局作用域中去访问某个局部作用域内的变量