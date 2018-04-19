// 语句块 
// 将多条语句联合在一起 形成一条复合语句 使得多条语句作为一条语句使用
// 语句块的结尾不需要分号 块中的原始语句必须以分号结束
{
	var pi = Math.PI;
	var cx = Math.cos(pi);
	console.log(cx);
}
// -1

for(var i=0,a=[]; i<=4; a[i++]=1) /* empty */;  // JS循环体中至少要包含一条语句 这里使用了空语句(;) 使用空语句时 最好添加注释
a
// [1, 1, 1, 1, 1]

// 变量声明语句会被提前 但是初始化的操作(赋值)还是在原来var语句所在的位置执行 多次重复声明同一个变量是合法的

// if条件语句的条件后必须跟随一条语句 如果有多条语句 则使用语句块封装成一条复合语句
if (!username) username = "Ben"  // 如果username是null undefined false 0 "" NaN 那么就给它赋一个新值

// 通常else总是和就近的if语句匹配 适当的使用花括号可以打破这种默认的方式
if (expression1) {
	// statement1
	if (expression2) {
		// statement2
	}
}
else {  // 这里的else与外层的if语句匹配 当expression1返回false时 执行这里的语句
	// statement3
}

if (expression1) {
	// statement1
}
else if (expression2) {
	// statement2
}
else if (expression3) {
	// statement3
}
else {
	// statement4
}

// 相当于
if (expression1) {
	// statement1
}
else {
	if (expression2) {
		// statement2
	}
	else {
		if (expression3) {
			// statement3
		}
		else {
			// statement4
		}
}


// 找到匹配的case时 执行这个case对应的代码块 否则执行 'default' 标签中的代码块 这时候如果没有default标签 那么将跳过所有代码块
// case关键字后通常跟随的是数字和字符串直接量
// 通过break或return(函数中使用switch时)来终止switch语句 否则从匹配的case处的代码块开始 后面的case对应的代码块都会被执行 一直到整个代码块的结尾
function convert(x) {
	switch(typeof x) {  // 当表达式(typeof x)的计算结果会出现多种值时 如果这时候要针对不同的值执行不同的操作的话 那么if语句就显然不如switch语句
		case 'number':  // 当 typeof x 的值等于(===) 'number' 时 该函数将参数转换为十六进制数 并返回
			return x.toString(16);

		case 'string':
			return "'" + x + "'";

		default:
			return JSON.stringify(x);
	}
}

typeof('a')
// "string"
typeof(23)
// "number"
typeof([])
// "object"
typeof({})
// "object"
typeof null
// "object"
typeof undefined
// "undefined"

convert(127)
// "7f"
convert('foo')
// "'foo'"
var o = {x:1,y:2}
convert(o)
// "{"x":1,"y":2}"
convert([1,2,3])
// "[1,2,3]"

// 当expression的返回值为true时 就执行循环体中的逻辑statement
while (expression) {
	// statement
}

for(initialize; test; increment) {
	// statement
}

// while循环的等价写法
initialize;
while(test) {
	// statement
	increment
}

// 死循环
while (true) {}
// 死循环
for(;;) {}

// for/in循环 遍历对象的可枚举属性
// JS的内置方法以及很多内置对象的属性都是不可枚举的 代码中定义的所有属性和方法默认都是可枚举的
// 一个对象可以继承其他对象的属性 那些继承得来的自定义属性是可以通过for/in循环枚举出来
// variable必须是一个左值(能放在赋值表达式左侧的值) 它可以是任意表达式 每次循环都会计算这个表达式
for(variable in object)
	// statement

for(i in arr) 
	console.log(arr[i]);  // i为数组的下标 arr[i]为数组元素


for(p in obj) {
	console.log(obj[p])  // p为对象的属性名 obj[p]为属性值
}


var o = {x:1,y:2,z:3}
var a = [], i=0
// 将对象o的所有属性名复制到数组a中
// 在每次循环之前 都会先计算表达式a[i++]的值 并将对象o的属性名(一个字符串)赋值给a[i++]
for(a[i++] in o);
a
// ["x", "y", "z"]


// break语句 立即退出最内层的循环或switch语句
// 遍历数组查找某个特定的值 找到则使用break语句退出循环
for(var i=0; i<arr.length; i++) {
	if (arr[i] == target) break;
}

// continue语句 并不是退出循环 而是跳过本次循环 转而执行下一次循环
for(var i=0; i<arr.length; i++) {
	if (arr[i] == target) continue;
}

// return语句只能在函数体内出现 它指定函数被调用后的返回值 同时return语句会终止函数的执行 返回到调用函数的程序
// 如果函数体内没有return语句 函数调用仅依次执行函数体内的每一条语句直到函数结束 然后返回到调用函数的程序 最终函数调用的返回值为undefined



// 抛出异常 指用信号通知发生了错误或异常状况
// 当抛出异常时 JS解释器会立即停止当前正在执行的逻辑 并跳转到就近的异常处理程序 如果没有找到异常处理程序 异常将向上传播到调用该函数的代码

function factorial(x) {  // 求阶乘
	if (x<0) throw new Error("x不能小于零");  // x小于0时抛出异常
	for(var f=1; x>1; f*=x, x--) /* empty */ ;
	return f;
}

// try/catch/finally语句块的花括号是不能省略的
try {
	/*
		通常这里的代码会从头执行到尾而不会产生任何问题
		但有时会抛出异常 通过throw语句直接抛出或者是通过调用一个方法间接抛出
	*/
}
catch(e) {
	/* 
		当且仅当try语句块抛出异常后才会执行这里的代码
		通过局部变量e来获得与异常相关的值(Error对象或者抛出的其他值的引用)
		这里的代码负责处理异常 也可忽略异常 还可以通过throw语句重新抛出异常
	 */
}
finally {
	/*
		不论try语句块是否抛出了异常 这里的代码块总是会执行
		通常用来完成清理工作
	*/
}


try {
	var n = Number(prompt("import a number", ""));  // 提示输入一个数组 第二个参数为默认值 Number("") 的返回值为 0
	var f = factorial(n);
	alert(`${n}!=${f}`);
}
catch(e) {
	alert(e);
}
finally {
	console.log("this is finally block")  // 只要try中有一部分代码被执行了 finally语句块就会被执行
}