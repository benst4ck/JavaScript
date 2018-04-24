// 创建数组
var a = new Array();  // 等价于 var a = []; 继承自Array.prototype(原型对象)

// 数组的元素可以是任意的类型 
var b = new Array(4,5,{x:6},7,'test:8',function(){return 9;}); 
b;
// [4, 5, {…}, 7, "test:8", ƒ]
b[5]();
// 9

var c = new Array(6);  // 指定数组长度 创建一个稀疏数组
c;
// [empty × 6]
c.push('one','two');  // 在数组末尾增加一个或者多个元素 返回操作后的数组长度
// 8
c;
// [empty × 6, "one", "two"]

// 所有索引都是属性名 但只有非负整数属性名才是索引
c['x'] = 99;  // 给数组c添加x属性 等价于 c.x = 99; 但是由于x不是索引 所以添加x属性后 数组的length属性并不会改变
c;
// [empty × 6, "one", "two", x: 99]
c.length;
// 8

c.pop();  // 删除数组最后一个元素 减小数组长度 返回删除的值
// "two"
c;
// [empty × 6, "one", x: 99]

var d = [1,,,4,,];              // 数组直接量的语法允许有可选的结尾逗号
d;
// [1, empty × 2, 4, empty]     // 稀疏数组

var base = 1024;
var a = [base+1,base+2]   // 数组直接量定义数组时 数组中的值不一定非要是常量 可以是任意的表达式
a;
// [1025, 1026]

var a = ["zero", "one", "two", "three"];

delete a[1];  // 删除元素 但不影响数组长度
// true
a;
// ["zero", empty, "two", "three"]

1 in a;  // 数组索引1并未在数组中定义
// false
a.length;
// 4
a.length = 3;  // 当给length赋一个较小的值时将截断数组
a;
// ["zero", empty, "two"]

Object.defineProperty(a,'length',{writable: false})  // 设置数组a的length属性为只读 这时候修改不了length的值 数组a调用push方法时也会失败

var b = [undefined,undefined];  //并非稀疏数组

1 in b;
//true


var arr = [1,2,3,4];

Object.defineProperty(arr,'2',{enumerable: false});  // 将数组arr中索引为2的元素设置为不可枚举

Object.getOwnPropertyNames(arr);
// ["0", "1", "2", "3", "length"]
var keys = Object.keys(arr);
keys;
// ["0", "1", "3"]
var value = [];                 //通过遍历数组keys 获取o对象的每个属性值来添加到该数组内
for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    value[i] = arr[key];
}

value;
// [1, 2, 4]

// 上面的数组遍历需要优化 数组的长度应该只查询一次 而不是每次循环都要查询
for (var i=0, len=keys.length; i<len; i++) {}


for(i in arr) {
    if (!arr.hasOwnProperty(i)) continue;  // 跳过for-in循环遍历到的继承属性
    //循环体
}

for(i in arr) {
    if (String(Math.floor(Math.abs(Number(i)))) !== i) continue;  // 跳过不是非负整数的i
}

var data = [1,2,3,4,5];
var sumOfSquares = 0;
data.forEach(function(x) {          // x表示数组元素
    sumOfSquares += x*x;
});
sumOfSquares;
// 55

var data = [1,2,3,4,5];
data.forEach(function(v,i,a) {      // v表示数组元素(从数组第一个元素开始) i表示元素的索引(从0开始) 第三个参数a表示数组本身
    a[i] = v + 1;
});
data;
// [2, 3, 4, 5, 6]