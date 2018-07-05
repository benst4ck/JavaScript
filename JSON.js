// JSON语法是JS语法的子集 所以通过JS语法就能处理JSON数据
// JSON 文本的 MIME 类型是 "application/json"

"firstName" : "John"  // JSON
// 等价于
firstName = "John"  // JS

// 花括号定义对象 方括号定义数组
var employees = [
	{ "firstName":"Bill" , "lastName":"Gates" },
	{ "firstName":"George" , "lastName":"Bush" },
	{ "firstName":"Thomas" , "lastName": "Carter" }
];

employees[0].lastName;
// "Gates"
employees[0].lastName = "Jobs";

employees[0]
// {firstName: "Bill", lastName: "Jobs"}

// 创建包含JSON语法的JS字符串
var txt = '{ "employees" : [' +
'{ "firstName":"Bill" , "lastName":"Gates" },' +
'{ "firstName":"George" , "lastName":"Bush" },' +
'{ "firstName":"Thomas" , "lastName":"Carter" } ]}';

// eval()函数可以解析JSON文本 将其转换为JS对象 但是必须把JSON文本放到括号中 这样才能避免语法错误
var obj = eval ("(" + txt + ")");  // 也可以使用 JSON.parse(txt) 将一个JSON字符串转换为JS值
obj;
// {employees: Array(3)}

// JSON.stringify()将JS值(对象或数组)转换成JSON字符串
JSON.stringify("foo");   
// ""foo""
JSON.stringify(24); 
// "24"
JSON.stringify(true);   
// "true"
JSON.stringify([1, "false", false]);
// "[1,"false",false]"
JSON.stringify({ x: 5, y: 8 }); 
// "{"x":5,"y":8}"

var student = new Object()
student.name = "Ben"; 
student.age = "25"; 
student.location = "China"; 
var json = JSON.stringify(student)  

student;
// {name: "Ben", age: "25", location: "China"}
alert(student);
// [object Object]

json;
// "{"name":"Ben","age":"25","location":"China"}"
alert(json);
// {"name":"Ben","age":"25","location":"China"}

var students = new Array() ; 
students[0] = "Jack"; 
students[1] = "Larry"; 
students[2] = "John"; 
var json = JSON.stringify(students,switchUpper);  // 通过设置第二个参数为一个函数来达到替换值的效果
function switchUpper(key, value) { 
    return value.toString().toUpperCase(); 
} 
alert(students)
// Jack,Larry,John
json
// ""JACK,LARRY,JOHN""
alert(json)
// "JACK,LARRY,JOHN"

var stuObj = new Object(); 
stuObj.id = "20122014001"; 
stuObj.name = "Tom"; 
stuObj.age = 25; 

var stuArr = new Array();  // 通过数组定义对象中属性的显示顺序
stuArr[0] = "name"; 
stuArr[1] = "age"; 
stuArr[2] = "addr";  // 这个stuObj对象里不存在
stuArr[3] = "id";

var json = JSON.stringify(stuObj,stuArr);  // 通过设置第二个参数为一个数组来筛选和排序属性的显示

stuObj;
// {id: "20122014001", name: "Tom", age: 25}
stuArr;
// ["name", "age", "addr", "id"]

json;
// "{"name":"Tom","age":25,"id":"20122014001"}"
alert(json);
// {"name":"Tom","age":25,"id":"20122014001"}

var json = JSON.stringify(stuObj,stuArr,10);  // 第三个参数用来指定缩进用的空白字符串 用于美化输出 数字表示显示时使用的空格数量 上限为10

json;
/*
	"{
	          "name": "Tom",
	          "age": 25,
	          "id": "20122014001"
	}"
*/

var json = JSON.stringify(stuObj,stuArr,'\t');

json;
/*
	"{
		"name": "Tom",
		"age": 25,
		"id": "20122014001"
	}"
*/

var json = JSON.stringify(stuObj,stuArr,'OK ');

json
/*
	"{
	OK "name": "Tom",
	OK "age": 25,
	OK "id": "20122014001"
	}"
*/

// 如果一个被序列化的对象拥有toJSON方法 那么该toJSON方法就会覆盖该对象默认的序列化行为 不是obj被序列化 而是调用obj的toJSON方法后的返回值会被序列化
var obj = {
  foo: 'foo',
  toJSON: function () {
    return 'bar';
  }
};


JSON.stringify(obj); 
// ""bar""
JSON.stringify({x: obj});
// "{"x":"bar"}"