typeof [1,2];  // 无法识别数组
// "object"
Array.isArray([]);  // 数组是具有特殊行为的对象 判定一个对象是否是数组
// true
Array.isArray({});
// false

var x = [1,2,3];
Array.isArray(x);
// true

var a = [1,2,3];
a.map(function(x) {return x*x});  // map方法将调用该方法数组的每个元素传递给指定的函数
// [1, 4, 9]


var a = [1,2,3,4,5,6];
a.filter(function(x) {return x<4});  // 函数返回true时 对应的元素将被添加到要返回的子数组中
// [1, 2, 3]
a.filter(function(x,i) {return i%2==0});  // 第一个参数x表示元素 第二个参数i表示元素的索引 返回数组中索引为偶数的元素
// [1, 3, 5]

var arr = [1,2,3,4,5,6];
delete arr[1];
delete arr[4];
arr;
// [1, empty, 3, 4, empty, 6]
var dense = arr.filter(function() {return true});  // filter()会跳过稀疏数组中缺少的元素 返回的数组总是稠密的
dense;
// [1, 3, 4, 6]

var arr = [1,2,'',3,undefined,4,null,undefined,5];
delete arr[1];
arr;
// [1, empty, "", 3, undefined, 4, null, undefined, 5]

arr = arr.filter(function(x) { return x !== undefined && x !== null; });  // 压缩空缺并删除undefined和null元素
arr;
// [1, "", 3, 4, 5]


var a = [1,2,3,4,5];
a.reduce(function(x,y) { return x+y; }, 0);  // reduce()需要两个参数 第一个为化简函数 第二个参数可选 是一个传递给函数的初始值
// 15
a.reduce(function(x,y) { return x*y; }, 1);
// 120
a.reduce(function(x,y) { return (x>y)?x:y; });      //如果没有给定第二个参数 将使用数组的第一个元素作为其初始值
// 5
//reduceRight()的工作原理和reduce()一样 不同的是它按照数组索引从高到低处理数组


var a = [0,1,2,1,2,1,1,2,1];
a.indexOf(2);  // 从数组头部向尾部查找给定元素(2)的索引 返回查找到的第一个元素的索引 查找不到时返回-1
// 2
a.indexOf(2,4);  // 第二个参数为可选参数 指定从哪个索引的地方开始查找 没有给定第二个参数时 默认从数组的头部开始查找
// 4
a.lastIndexOf(2);  // 该方法与indexOf()的查找方向相反
// 7
a.lastIndexOf(2,-3);  // 从数组a的倒数第三个元素开始向数组a的头部查找元素2
// 4

// 找出数组a中 所有x元素的引索
function findAll(a, x) {
    var results = [],
        len = a.length,
        pos = 0;
    while(pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) break;  // 查找不到时 跳出循环 如果没有这里的条件判断 函数将陷入死循环中
        results.push(pos);
        pos = pos + 1;
    }
    return results;
}
findAll(a, 2);
// [2, 4, 7]


var a = {};
var i = 0;
while(i < 5) {
    a[i] = i*i;
    i++;
}

a.length = i;

a;  // 类数组对象 拥有一个length属性(非负整数)和对应非负整数属性 适用于只读数组的算法或是不改变数组长度的算法
// {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, length: 5}

var total = 0;
for(var j=0; j<a.length; j++)
    total += a[j];
total;
// 30

// 在对象a上调用数组的join方法 相当于 a.join('+')
Array.prototype.join.call(a, '+');  // 类数组对象没有继承自Array.prototype 不能直接调用数组方法 但可以间接地使用Function.call方法调用
// "0+1+4+9+16"
Array.prototype.slice.call(a, 1);
// [1, 4, 9, 16]

var s = 'test';
s.charAt(1);
// "e"
s[2];  // 字符串行为类似于只读数组
// "s"
typeof s;
// "string"
Array.isArray(s);
// false
Array.prototype.join.call(s, '-');  // 字符串是不可变的 将其作为数组看待时 它是只读的
// "t-e-s-t"
s;
// "test"