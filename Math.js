Math.pow(3, 4)  // 3的4次方 
// 81

Math.pow(4, 1/3)  // 4的3次方根
// 1.5874010519681994

Math.sqrt(4)  // 4的平方根(根号4)
// 2

Math.round(2.5)  // 四舍五入取整
// 3
Math.round(11.8)
// 12
Math.round(4.2)
// 4

Math.ceil(6.3)  // 向上取整
// 7

Math.floor(3.9)  // 向下取整
// 3

Math.abs(-2.1)  // 绝对值
// 2.1

Math.max(3,5,1,4,2)  // 最大值
// 5

Math.min(3,5,1,4,2)  // 最小值
// 1

Math.random()  // 生成一个大于等于0 小于1的伪随机浮点数
// 0.5742061653966146


function getRandomInt_1(max) {
  return Math.floor(Math.random() * Math.ceil(max));
}
// 返回值为整数
getRandomInt_1(5.3) // 返回值 0 1 2 3 4 or 5
getRandomInt_1(5)  // 返回值 0 1 2 3 or 4


function getRandomInt_2(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
// 返回值为整数
getRandomInt_2(4.2, 8.9)  // 返回值 5 6 7 or 8
getRandomInt_2(4, 8)  // 返回值 4 5 6 or 7


function getRandomInt_3(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}
// 返回值为整数
getRandomInt_3(4.2, 8.9)  // 返回值 5 6 7 or 8
getRandomInt_3(4, 8)  // 返回值 4 5 6 7 or 8


function getRandomArbitrary(minInt, maxInt) {
  return Math.random() * (maxInt - minInt) + minInt;
}
// 返回值为浮点数 取值区间为 [ minInt, maxInt )
