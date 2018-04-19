// JS全局变量是全局对象的属性 当使用 var 声明一个变量时 创建的这个全局对象的属性是不可配置的 也就是说无法通过delete运算符删除

var cantDelete = 'hello'
delete cantDelete
// false

canDelete = 'hi'  // 非严格模式下 给一个未声明的变量赋值 JS会自动创建一个全局变量 这种情况下创建的变量是可配置的 也就是可以通过delete运算符删除的
delete canDelete
// true

var x = 2
x++  // 先返回x原本的值 x再自增1
// 2
x
// 3

++x  // 先将x自增1 再返回x的值
// 4
x
// 4

var i = 1, j = ++i
i
// 2
j
// 2

var i = 1, j = i++
i
// 2
j
// 1 

Number(undefined)
// NaN
Number(null)
// 0
Boolean(undefined)
// false
Boolean(null)
// false

undefined == null  // 相等运算符(==) 比较时会进行类型转换
// true

12 == "12"
// true

false == "0"
// true


// 严格相等运算符(===) 比较时不进行类型转换 如果两个值的数据类型不同 则它们不相等

null === undefined
// false

var data = [9,8,7]

"0" in data  // 通过 in 运算符 判断数组data中是否存在索引为0的元素
// true
1 in data  // in运算符的左操作数应该是一个字符串或者它可转换为字符串
// true
3 in data  // 索引为3的元素不存在
// false

var point = {x:1,y:3}

'x' in point  // 判断对象point中是否有x属性
// true
'z' in point
// false
'toString' in point  // 继承而来的toString方法
// true

var d = new Date

d instanceof Date  // 判断对象d是否是Date类的实例 左操作数应当是一个对象(实例) 右操作数应当是一个构造函数(类)
// true
d instanceof Object  // 所有对象都是Object类的实例
// true
d instanceof Number
// false

var a = [1,2,3]  // 通过数组直接量创建一个数组
a instanceof Array
// true
a instanceof Object
// true
a instanceof RegExp
// false

// 逻辑与(&&)
function f() {
	return "function f"
}

4>8 && f()  // 当第一个条件返回false时 函数f不被调用 表达式直接返回false
// false
4<8 && f()  // 当第一个条件返回true时 函数f将被调用 返回值为函数f的返回值 函数f的执行依赖于第一个表达式的结果
// "function f"

// 相当于
if (4<8) f()

// 逻辑或(||)
// 这里有3个操作数
// 首先计算第一个操作数(max_width)的布尔值 如果结果为true 则返回max_width的值 后面的第二个和第三个操作数被忽略 不作计算 如果结果为false 则计算第二个操作数 以此类推
// 也就是说 如果 max_width 已经定义了 那就直接将它的值返回 并赋给变量max
// 否则 在box对象中查找max_width 如果有则返回该值 否则就使用一个写死的常量(600)
// 通常用在函数体内 用来给参数提供默认值
var max = max_width || box.max_width || 600;


// 逻辑非(!)
!!"0"  // 得到一个值的等价布尔值
// true

Boolean('0')
// true

!!0
// false

// 赋值

var i=j=k=10 // 将3个变量都初始化为10 赋值操作符的结合性为从右到左
// 赋值语句 k=10 的返回值为所赋的值(10) 该值又赋给变量j j=10 的返回值为10 该值又返回并赋给i

var x=3, y=6;

x+=y  // 相当于 x = x + y 并返回新的x值
// 9
x*=y  // 相当于 x = x * y 并返回新的x值
// 54

var x = -6
// 条件运算符(?:) 当条件 x>0 计算结果为true时 计算并返回x的结果 否则计算并返回-x的结果
x > 0 ? x : -x
// 6

// delete运算符可以删除对象的属性或数组的元素 但通过var声明的变量不能删除
var o = {x:1,y:2}

delete o.x
// true
o
// {y: 2}
"x" in o
// false

var a = [1,2,3]
delete a[1]  // 并没有修改数组长度

1 in a
// false
a
// [1, empty, 3]