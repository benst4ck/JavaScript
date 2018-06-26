// XMLHttpRequest对象可以实现页面在不刷新的状态下与服务器端进行数据交互 (异步请求)

var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&page=1&per_page=10";
    // 这里的url需要用https协议 用http会报错

xhr.open(method, url, true);  
// 通过xhr.responseURL可以获取这里传入的url
// 第三个参数默认值就是true 表示初始化为异步请求
// 当第三个参数为false时 意味着是一个同步请求 此时xhr.timeout必须置为0 否则会抛错

xhr.responseType = "json";  // 指定响应内容的类型
xhr.timeout = 3000;  // 设置xhr请求的超时时间 默认值为0

// xhr.onreadystatechange属性为事件处理程序 当xhr.readyState属性值发生变化时 该回调函数被触发
xhr.onreadystatechange = function () {
  console.log(xhr.readyState);
  if(xhr.readyState === xhr.DONE) {
    if(xhr.status === 200){  // 请求成功 xhr.status返回响应的状态码 可通过xhr.statusText获取状态码的字符描述
      console.log(xhr.response);  // xhr.response属性保存了服务器端返回的响应内容
    }else{
      console.log(xhr.response);
    }
  }

};
xhr.onloadstart = function () {
  console.log("fetching data")
}
xhr.onloadend = function () {
  console.log("got data")
}

// 通过onload注册成功获取数据时的回调 来处理异步获取到的数据
// xhr请求成功 就会触发xhr.onreadystatechange和xhr.onload两个事件 但xhr.onreadystatechange是每次xhr.readyState变化时都会触发
// 当状态码为201时 请求虽然也是成功的 但仅仅通过xhr.status == 200判断并不会执行成功回调逻辑

xhr.onload = function () {
  //如果请求成功
  if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
    console.log(`items: ${xhr.response.items.length}`);
    console.log(`sixth node: ${xhr.response.items[5].node_id}`);
  }
}

xhr.ontimeout = function(event){    // xhr.timeout不等于0时 由请求开始(即onloadstart开始)算起 当到达xhr.timeout所设置时间请求还未结束(即onloadend) 则触发此事件
  console.log('请求超时！');
}
xhr.setRequestHeader('Content-Type','application/json');  // 设置HTTP请求头 第一个参数大小写不敏感 该方法必须在open()方法之后 send()方法之前调用
                                                          // 可多次调用该方法 最终的值不会采用覆盖override的方式 而是采用追加append的方式

xhr.send();  // 发送请求 调用该方法会触发xhr.onloadstart事件

// 当请求成功完成时触发onload事件 此时xhr.readystate=4
// 请求结束时(包括请求成功和请求失败) 会触发xhr.loadend事件

// onloadstart
  // fetching data

// onreadystatechange
  // 2
  // 3
  // 4
  // {total_count: 5646572, incomplete_results: false, items: Array(10)}

// onload
  // items: 10
  // sixth node: MDEwOlJlcG9zaXRvcnkyOTAyODc3NQ==

// onloadend  
  // got data

// xhr.readyState: 表示一个请求会经历的几种状态

    // 0(UNSENT): 表示xhr实例已经创建 但尚未执行open()方法 请求未初始化                
    // 1(OPENED): 表示请求已经建立 但是还没有发送 尚未调用send()方法
    // 2(HEADERS_RECEIVED): 表示xhr.send()已经执行 服务端已经获取到请求头          
    // 3(LOADING): 表示正在接受xhr.responseText 通俗讲就是正在获取服务端返回的数据
    // 4(DONE): 表示整个请求流程已经完成 