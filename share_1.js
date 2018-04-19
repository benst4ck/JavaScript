// NaN 表示非数字值 它和任何值都不相等 包括自身 
// 当 x!=x 返回true时 说明变量x为 NaN

isNaN('x')  // 当参数为NaN或者是非数字值(这里参数为字符串)时 返回true
// true

1/0
// Infinity

isFinite("x")  // 当参数为NaN Infinity(正无穷) -Infinity(负无穷)时才返回false 这里的参数为字符串 相当于NaN
// false

// 日期和时间
var then = new Date()  // 标记一个时刻 不需要传递参数给构造函数时 空圆括号是可以省略的

then
// Tue Apr 03 2018 12:09:00 GMT+0800 (HKT)

then.getFullYear()  // 年
// 2018
then.getMonth()  // 月份 从0开始计数 这里的3表示4月份
// 3
then.getDate()  // 日期
// 3
then.getDay()  // 星期二 (星期日用0表示)
// 2
then.getHours()  // 时
// 12
then.getMinutes()  // 分
// 9


new Date - then  // 获取当前时刻与标记时刻的时间间隔 单位为毫秒
// 43949

new Date(2018,0,1,20,40,30)  // 生成一个指定的日期和时间 注意月份是从0计数的
// Mon Jan 01 2018 20:40:30 GMT+0000 (UTC)

// 当JS解释器启动时 或者任何Web浏览器加载新页面时 一个新的全局对象都将会被创建 该全局对象将带有一些初始属性 例如 NaN undefined parseInt() Array() Math
// 不在任何函数内的JS代码可以通过this来引用全局变量
var global = this

// 在客户端JS中 Window对象充当了全局对象 这个全局对象有一个window属性引用它自身 它可以代替this来引用全局对象
// 如果代码声明了一个全局变量 这个全局变量就是全局对象的一个属性

// 两个对象是否相等 并不是通过值是否相等来判断
[1,2,3] == [1,2,3]
// false
[1,2,3] === [1,2,3]
// false

var o1 = {x:1}, o2 = {x:1}
o1 == o2
// false
o1 === o2
// false

// 通常对象称为引用类型 对象的值都是引用 当且仅当两个两个对象引用同一个基对象时 它们才相等

var a = []  // 变量a指向内存中的数据
var b = a   // 将变量b指向变量a所指向的数据
// 这时通过变量a或者变量b都可以查看和修改内存中的这条数据
b[0] = 10
a[0]
// 10
a === b
// true

// 判断两个对象的值是否相等
JSON.stringify(obj1) == JSON.stringify(obj2)

// 类型转换

// 当不通过 new 运算符调用 Boolean() Number() String() Object() RegExp() 这些内置函数时 它们会作为类型转换函数

Number(false)
// 0
Number("4")
// 4
Boolean([])
// true
String(null)
// "null"
Object(3)
// Number {3}
Object("3")
// String {"3"}

// 除了null和undefined之外的任何值都具有 toString() 方法 该方法的执行结果通常和 String() 方法的返回结果一样

var a = 3
a.toString()
// "3"

var b = [1,2,3,["four",5,[6]]]
b.toString()
// "1,2,3,four,5,6"
String(b)
// "1,2,3,four,5,6"

// 显示类型转换

18+''  // 等价于 String(18)
// "18"

+"4"  // 等价于 Number(4)
// 4

"4" - 0  // 等价于 Number(4)
// 4

!!0  // 等价于 Boolean(0)
// false

var n = 17

n.toString(2)  // 二进制
// "10001"
n.toString(8)  // 八进制
// "21"
n.toString(16)  // 十六进制
// "11"

var n = 123.45

n.toFixed(0)  // 保留小数点后0位 四舍五入 转换为字符串
// "123"

n.toFixed(1)
// "123.5"

n.toFixed(4)
// "123.4500"

// Number() 只能将基于十进制数进行转换 并且不能出现非法的数字字符
// 全局函数 parseInt() 将所给参数解析为整数 和 parseFloat() 解析为浮点数

parseInt("  2.75 meters")  // 忽略前导空格 尽可能多的解析数值字符 并忽略后面的非数值字符 没有四舍五入
// 2
parseFloat(" 2.25 meters")
// 2.25


parseInt("-11.98")
// -11

parseInt("0xff")  // 解析16进制数
// 255

parseInt(".81")  // 整数不能以 '.' 开始
// NaN
parseFloat(".81")
// 0.81

parseFloat("$22.18")  // 第一个非空字符串是非法的数字直接量
// NaN

parseInt("11", 2)  // 1*2 + 1 = 3
// 3

parseInt("0246", 8)  // 2*8*8 + 4*8 +6 = 166
// 166

parseInt("ff", 16)  // 15*16 + 15 = 255
// 255
parseInt("0xff", 16)
// 255