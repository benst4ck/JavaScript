// 该工厂方法返回一个新的对象
function range(from, to) {
  var r = Object.create(range.methods);  // r继承自range()函数的methods属性
  r.from = from;  // 给将被返回的对象r添加自有属性
  r.to = to;
  return r;  // 返回新创建的对象
}

// 给range()函数定义一个methods属性
// methods为原型对象 作为函数的一个属性存储起来 它定义了所有调用range()函数创建的对象所共享的方法

range.methods = {
  includes: function (x) {
              return this.from <= x && x <= this.to;
            },
  toString: function () {
              return "(" + this.from + "..." + this.to + ")";  // 以字符串形式返回对象所表示范围
            }
}

Object.keys(range);  // 查看函数range()的可枚举自有属性
// ["methods"]

var a = range(1, 5);
a;
// {from: 1, to: 5}

// 调用继承方法
a.includes(3.6);  // 参数在设定的from-to范围内时 返回true
// true
a.includes(5);
// true
a.includes(1);
// true
a.includes(6);
// false

a.toString()
// "(1...5)"

range.methods.isPrototypeOf(a);   // 检测对象原型
// true


// 通过关键字new调用构造函数会自动创建一个新对象 所以构造函数本身只需要初始化这个新对象的状态即可
// 调用构造函数的一个重要特征是 构造函数的prototype属性被用做新对象的原型 这意味着通过同一个构造函数创建的所有对象都继承自一个相同的对象 因此它们都是同一个类的成员

// 构造函数替代工厂函数 这里并没有创建并返回一个对象 仅仅是初始化
// 某种意义上来讲 定义构造函数就是定义类 并且类名字的首字母需要大写
function Range(from, to) {
  this.from = from;       // this指向通过该构造函数创建的对象
  this.to = to;
}

// 重写预定义(默认)的Range.prototype对象 对Range()构造函数的调用会自动使用Range.prototype作为新Range对象的原型
Range.prototype = {
  includes: function (x) {
              return this.from <= x && x <= this.to;
            },
  toString: function () {
              return "(" + this.from + "..." + this.to + ")";  // 以字符串形式返回对象所表示范围
            }
}

var x = new Range(1,3);  // 在调用构造函数之前就已经创建了新对象x 构造函数中的this指向新对象x 构造函数起初始化新建对象的作用
x;
// Range {from: 1, to: 3}

x.includes(2);
// true

x.toString();
// "(1...3)"

// 当且仅当两个对象继承自同一个原型对象时 它们才是属于同一个类的实例
// 初始化对象状态的构造函数并不能作为判断实例是否是同一个类的实例的标识符 
// 两个不同的构造函数的prototype属性可能指向同一个原型对象 这时这两个构造函数创建的实例是属于同一个类的
// 当使用instanceof运算来检测对象是否属于某个类时会用到构造函数
x instanceof Range;       // 如果x继承自Range.prototype 则返回true 间接继承也会返回true
// true

// instanceof运算符和isPrototypeOf()方法都无法通过对象来获得类名 只能检测对象是否属于指定的类名


// 任何函数都可以用做构造函数 但调用构造函数是需要用到一个prototype属性的
// 除了Function.bind()方法返回的函数外 每个函数都自动拥有一个prototype属性

var F = function() {};
var p = F.prototype;  // 函数F相关联的原型对象
p;
// {constructor: ƒ}

F === p.constructor;  // 对任意函数有 func === func.prototype.constructor
// true

// 可以看到构造函数的原型中存在预先定义好的constructor属性
// 通过调用构造函数创建的对象会继承构造函数的prototype 这意味着新建对象通常继承的constructor都指代它们的构造函数 因此这个constructor属性为新建对象提供了类

var o = new F();
o.constructor === F;
// true

// 之前的例子中新定义的原型对象(Range.prototype)不存在constructor属性 因此Range类的实例也不含有constructor属性
// 解决办法 显式设置构造函数反向引用
Range.prototype = {
    constructor: Range;
    // ...
}

// 或是扩展预定义的Range.prototype对象 而不是重写
Range.prototype.includes = function (x) {return this.from <= x && x <= this.to;};



// JS中基于原型的继承机制是动态的 对象从其原型继承属性 如果创建对象之后原型的属性发生改变 也会影响到继承这个原型的所有实例对象 这意味着可以通过给原型对象添加新方法来扩充类
var n = 3;
// 动态添加方法
Number.prototype.times = function(f, context) {  // 不传入调用函数f的上下文参数context时 调用函数f的上下文值为undefined
  var j = Number(this);  // this指向调用该方法的对象 这里是n
  for(var i=0; i<j; i++) f.call(context, i);  // 这里使得函数f中的this指向context
  return j*j;
};

//并没有重新创建对象n
n.times(function(n) { console.log(this.x++); console.log(n+ 'hello');}, {x:99} );  
// 99
// 0hello
// 100
// 1hello
// 101
// 2hello
// 9