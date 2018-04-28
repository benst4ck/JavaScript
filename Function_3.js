function check(args) {
  var actual = args.length;  // arguments.length指的是传入函数的参数的实际个数
  console.log('actual: '+actual);
  var expected = args.callee.length;  // args相当于函数f的arguments 所以args.callee指的就是f函数 函数的length属性表示函数定义的形参的个数
  console.log('expected: '+expected);
  if (actual !== expected)
    throw Error('Expected ' + expected + 'args; got ' + actual);
}
function f(x,y,z) {
  check(arguments);
  return x+y+z;
}

f(2,3,4)
// actual: 3
// expected: 3
// 9

f(2,3,4,5)
// actual: 4
// expected: 3
// Uncaught Error: Expected 3args; got 4


// 函数也是对象 函数对象也可以包含方法 其中的两个方法 call() 和 apply() 可以用来间接地调用函数
// call()和apply()都允许显式指定调用所需的this值 也就是说 任何函数都可以作为任何对象的方法来调用 即便这个函数并不是那个对象的方法 灵活的指定函数调用的上下文
// 通过call()或apply()方法使得能以调用方法的形式来间接调用函数
// call()或apply()的第一个实参是要调用函数的对象 它是调用上下文 在被调用的函数体内通过this来获得对它的引用

// 以对象obj的方法的形式调用函数f() 并传入两个参数
f.call(obj,1,2);
f.apply(obj,[1,2]);  // 参数数组可以是类数组对象 也可以是真实数组

// 将对象o中名为m的方法进行一些修改和扩展 这种动态修改已有方法的做法有时称做 monkey-patching
function trace(o, m){
  var original = o[m];  // 保存原始方法
  o[m] = function() {  // 修改原始方法 包裹原始方法的一个泛函数
    console.log(new Date(), 'Entering', m);
    var result = original.apply(this, arguments);  // 调用原始方法 这里的this指向对象o 因为调用的时候是调用o对象的m属性
    console.log('this.x: '+this.x);
    console.log('arguments.length: '+arguments.length);
    console.log(new Date(), 'Exiting', m);
    return result;
  };
}

function add(arr) {
  console.log(arr);
  var sum=0;
  for (var i=0; i<arr.length; i++) {
    sum += arr[i];
  }
  if(this.x) {
    var result = this.x * sum;
    return result;
  }
  if(this.x===0) { return 0 }
  return sum;
}

add([1,2,3]);
// [1, 2, 3]
// 6

var obj = {x:3};

add.call(obj,[1,2,3]);  // 以对象obj为上下文 调用add函数 这时候函数add中的this指向对象obj 但调用前后对象obj中都没有add方法
// [1, 2, 3]
// 18

obj.method = add;  // 将函数add添加为对象obj的属性 属性名为method

trace(obj,'method');  // 动态修改对象obj中的method属性

obj.method([3,3,5]); 

// Sat Apr 28 2018 13:54:37 GMT+0800 (CST) "Entering" "method"
// [3, 3, 5]
// this.x: 3
// arguments.length: 1
// Sat Apr 28 2018 13:54:37 GMT+0800 (CST) "Exiting" "method"
// 33

// 如果将定义的新方法中的apply()改成call() 则最后的调用形式改为obj.method(3,3,5) 可以得到相同的结果


// bind()方法返回一个函数对象
function f(y) { return this.x * y; }  // 待绑定函数
var o = {x:3};
var g = f.bind(o);  // 将函数f绑定到对象o 该方法返回一个新函数 可以通过调用g(x)来调用o.f(x)

g(4);  // 以函数调用的方式调用新函数会把原始函数f()当作o的方法调用 传入到新函数的任何实参都将传入到原始函数
// 12

var sum = function(x,y) { return x + y; };
var succ = sum.bind(null, 1);  // 将this绑定到null 并且将sum的第一个参数绑定到1 新的函数succ期望只传入一个实参
succ(3);
// 4

function f(y,z) { return this.x + y + z };

var g = f.bind({x:9}, 4);     //绑定this到对象{x:9} 绑定y值到4
g(3);     //z绑定到3
// 16

var f = new Function('x','y','return x*y;');  //最后一个实参文本就是函数体 其余实参字符串为形参名字 如果定义的函数不包含任何参数 只需给构造函数传入函数体
f(3,5);
// 15

// 每次调用Function()构造函数都会解析函数体 并创建新的函数对象
// 调用Function()创建的函数不使用词法作用域
var scope = 'global';
function constructFunction() {
    var scope = 'local';
    return new Function('return scope');    //无法捕获局部作用域
}
constructFunction()();
// "global"

//函数式编程
var sum = function(x,y) { return x+y; };
var square = function(x) { return x*x; };

var data = [1,1,5,9,9];

var mean = data.reduce(sum)/data.length;  // 平均值 5

var deviations = data.map(function(x) { return x-mean; });  // [-4,-4,0,4,4]

var variance = deviations.map(square).reduce(sum)/(data.length-1);  // 方差 除以自由度(data.length-1) 而不是(data.length) 这样估计值是总体方差的无偏估计

var stddev = Math.sqrt(variance);     //标准差


// 高阶函数 接收一个或多个函数作为参数 并返回一个新函数
function not(func) {
  return function() {
    // 每个函数都有自己的arguments 调用这个返回的函数时传入的参数 将保存到下面的arguments中 然后调用func函数时 传入到func函数中
    var re = func.apply(this, arguments);  // this指向全局对象
    return !re;                   //对结果求反
  };
}

var even = function(x) {  // 判断x是否为偶数
  return x % 2 === 0;
};

var odd = not(even);

[1,3,5].every(odd);
// true

[1,2,3].every(odd);
// false

function compose(f,g) {
  return function() {
    // 需要给f()传入一个参数 所以使用call()
    // 需要给g()传入多个参数 使用使用apply()
    // 传递给这个返回的函数的两个参数首先传递到g函数(sum)中 调用g函数后 返回的一个值再传递到f函数(square)中 调用f函数
    return f.call(this, g.apply(this, arguments));  // this指向全局对象
  };
}

var square = function(x) { return x*x; };
var sum = function(x,y) { return x+y; };
var squareOfSum = compose(square,sum);

squareOfSum(2,3);  //square(sum(2,3))
// 25
squareOfSum(6,4);
// 100