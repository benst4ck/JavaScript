var str = "hello" + " world";  // 通过加号连接字符串
str;
// "hello world"

str.length  // 字符串长度
// 11

str[0]  // 字符串可以当作是只读数组
// "h"

str.charAt(1);  // 查看字符串第二个字符 索引从0开始
// "e"
str.charAt(str.length-1);  // 查看最后一个字符
// "d"

str.substring(2, 5)  // 获取子串
// "llo"

str.slice(2, 5)  // 切片
// "llo"
str.slice(-3)  // 最后3个字符
// "rld"

str.indexOf('l')  // 字符l首次出现的位置
// 2

str.indexOf('o', 7)  // 在索引为7的位置开始 字符o首次出现的位置
// 7

str.lastIndexOf('l')  // 字符l最后一次出现的位置
// 9

str.split(' ')  // 从字符串的空格处将字符串分割成子串 字符串转化为数组
// ["hello", "world"]

str.replace('l', 'L')  // 替换
// "heLlo world"

str.toLocaleUpperCase()  // 大写化
// "HELLO WORLD"

str.includes('n')  // 判断一个字符串是否包含在另一个字符串中
// false
str.includes('ws')
// false
str.includes('or')
// true

' hello		'.trim()  // 从字符串的两端删除所有空白字符
// "hello"

// ES5中 字符串直接量可以拆分成数行 每行必须以反斜线(\)结束 反斜线和行结束符都不算做字符串直接量的内容

// 用三行代码定义了显示为两行的代码 其中 \n 表示换行
var s = "one\
two\nthree\
four";

s;
/*
"onetwo
threefour"
*/

var s = 'what\'s wrong?'  // \' 为转义字符
s;
// "what's wrong?"