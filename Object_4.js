var o = {x:31};

var o1 = Object.create(o);
o1.y = 7;

o1;
// {y: 7}

// 可扩展性 用以表示是否可以给对象添加新属性 注意只针对能否添加新属性 不针对修改属性值和删除属性
// ES5中 所有内置对象和自定义对象都是可扩展的
Object.isExtensible(o)  //判断对象是否是可扩展的
// true
Object.isExtensible(o1)
// true

Object.preventExtensions(o1)  //将对象转换为不可扩展的 不可逆的过程

Object.isExtensible(o1)
// false

o1.z = 122  // 向对象o1添加属性失败

o1
// {y: 7}
o1.z
// undefined

o.a = 1  // 修改不可扩展对象的原型的属性 不可扩展对象的继承属性也会随着修改
o1.a
// 1

o1.y = 77  // 可以修改不可扩展对象的属性
o1.y
// 77

delete o1.y  // 可以删除不可扩展对象的属性
// true
o1;
// {}