## 导入和导出

导出多个成员

```javascript
exports.a = 123
exports.b = 'hello'
exports.c = function () {
    console.log('wafef')
}
exports.d = {
    foo: 'bar'
}
```

导出单个成员，且覆盖

```javascript
module.exports = 'hello3'
```

```javascript
module.exports = {
    add: function(){
        return 502
    }
    str: 'hello'
}
```

导入： 由于底层设计，可以防止数据被重复导入

```javascript
require('./a')
let fn = require('./b')
console.log(fn)
```

```javascript
console.log('a.js 被加载了')
let fn = require('./b')
console.log(fn)
```

```javascript
console.log('b.js 被加载了')
module.exports = function () {
    console.log('hello b')
}
```

## url统一资源定位器 

```javascript
const url = require("url")
let obj = url.parse('/pinglun?name=卢本伟&message=再见', true)
```

此对象会返回如下对象，均可进行调用

```javascript
{
    protocal: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?name=卢本伟&message=再见',
    query: 'name=卢本伟&message=再见',
    pathname: '/pinglun',
    path: '/pinglun?name=卢本伟&message=再见',
    href: '/pinglun?name=卢本伟&message=再见'
}
```



## Express

express是一个第三方Web开发框架，其高度封装了http模块，使用时更加专注于业务，而不是底层逻辑

```javascript
const express = require('express')
let app = express() //服务器对象
app.get('/', (a,s)=>{ //处理get请求
    s.send('hello world')
})
app.listen(80, ()=>{ //监听端口
    console.log('App is running at port 80.')
})
```

```javascript
const express = require('express')
let app = express() 
app.use('/', express.static('./public/')) //设置静态资源路径 - 127.0.0.1/public/abc.txt
app.use(express.static('./public/')) //127.0.0.1/abc.txt
app //优化写法
	.get('/login', function(){})
	.get('/dsadsa', function(){})
	.post('/d/sadsa',function(){})
app.get('/', (a,s)=>{
    s.redirect('/') //重定向
})
app.listen(80, ()=>{ 
    console.log('App is running at port 80.')
})
```

```javascript
// 由于express把中间件分离
app.use(require('body-parser').json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: true })); //json通常用true，字符串通常用false 
app.post('/post',(a,s)=>{
    s.send(a.body) //回传post的数据
})
```

## Event模块

```javascript
const EventEmitter = require("events")
const myEvent = new EventEmitter()

myEvent.on('事件1', ()=>{
    console.log("事件1执行了")
})
myEvent.on('事件1', ()=>{
    console.log("事件1 - 2执行了")
})
myEvent.once('事件1', ()=>{
    console.log('事件1首次执行')
})

myEvent.emit('事件1') //调用
myEvent.off('事件1') //关闭
myEvent.off('事件1', ()=>{
    console.log('事件1更换函数')
})
```

```javascript
const EventEmitter = require("events")
const ev = new EventEmitter()
ev.on('a',(a,b,c)=>{
    console.log(a+b+c)
})
ev.emit('a',1,2,3) //传值
```

## process模块

```javascript
const process = require("process")

//1. cpu内存
console.log(process.memoryUsage())
console.log(process.cpuUsage())

//2. 运行环境： 运行目录、node环境、cpu架构、用户环境、系统平台
console.log(process.cwd())
console.log(process.version)
//console.log(process.versions)
console.log(process.arch)
console.log(process.env.NODE_ENV)
//console.log(process.env.PATH)
console.log(process.env.USERPROFILE)
console.log(process.platform)

//3. 运行状态： 启动参数、PID、运行时间
console.log(process.argv)
console.log(process.argv0)

//4. 事件
process.on('exit', (code)=>{
    console.log('exit' + code)
})
process.on('beforeExit',(code)=>{
    console.log('beforeExit' + code)
})
```

##　fs模块

```javascript
const fs = require("fs")
const path = require("path")

//open
fs.open(path.resolve('data.txt'),'r',(err,fd)=>{
    console.log(fd)
})
//close
fs.open(path.resolve('data.txt'),'r',(err,fd)=>{
    console.log(fd)
    fs.close(fd,err=>{
        console.log('关闭成功')
    })
})
```

fs模块常见API

| access  | 判断文件或目录是否具有操作权限 |
| :-----: | :----------------------------: |
|  stat   |       获取目录及文件信息       |
|  mkdir  |            创建目录            |
|  rmdir  |            删除目录            |
| readdir |          读取目录内容          |
| unlink  |          删除指定文件          |

## 文件读写缓冲 - buffer

```javascript
const fs = require("fs")

//read - 将数据从磁盘中写入到buffer中
let buf = Buffer.alloc(10)
fs.open('data.txt', 'r', (err, rfd)=>{
    console.log(rfd)
    fs.read(rfd, buf, 0, 3, 0, (err, readBytes, data)=> {
        console.log(readBytes)
        console.log(data)
        console.log(data.toString())
    })
})
```

|    fd    |       定位当前被打开的文件       |
| :------: | :------------------------------: |
|   buf    |        用于表示当前缓冲区        |
|  offset  |    当前从buf哪个位置开始写入     |
|  length  |       表示当前次写入的长度       |
| position | 表示当前从文件的哪个位置开始读取 |

```javascript
//write - 将缓冲区里的文件写入到磁盘文件中
buf = Buffer.from('1234567890')
fs.open('b.txt','w',(err,wfd)=>{
    fs.write(wfd,buf,0,3,0, (err,written,buffer)=>{ //同上
        console.log(written)
        console.log(buffer)
        console.log(buffer.toString())
    })
})
```

##　process - fs 读写IO流

```javascript
const fs = require('fs')
const process = require('process')

fs.createReadStream('test.txt')
	.pipe(process.stdout) //对接

//底层 - 背压机制（官方已封装）
process.stdin.setEncoding('utf-8')
process.stdin.on('readable',()=>{
    let chunk = process.stdin.read()
    if(chunk !== null) {
        process.stdout.write('data' + chunk)
    }
})
```

nodejs中流的分类

| Readable  |  可读流，能够实现数据的读取  |
| :-------: | :--------------------------: |
| Writeable | 可写流，能够实现数据的写操作 |
|  Duplex   |       双工流，可读可写       |
| Tranform  |    转换流，可读可写可转换    |

```javascript
const fs = require("fs")

let rs = fs.createReadStream('./test.txt')
let ws = fs.createWriteStream('./test1.txt')

rs.pipe(ws) //对接
```

```javascript
const fs = require('fs')
const rs = fs.createReadStream('00-note.txt')
rs.pipe(process.stdout)
```

```javascript
//底层
const fs = require('fs')
//创建一个产生数据的可读流
let rs = fs.createReadStream('00-note.txt')
//调整编码
rs.setEncodeing('utf-8')
//创建一个消费数据的可写流
let ws = fs.createWriteStream('01-note.txt')
//监听事件调用方法完成具体的消费
rs.on('data',(chunk)=>{
    //执行数据写入
    ws.write(chunk)
})
```

## 双工流       Duplex&&Transform

```javascript
const {Transform} = require('stream')

class MyTransform extends Transform {
    constructor(options) {
        super()
    }
    _transform (chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase())
        callback(null)
    }
}

let a = new MyTransform()

a.write('a')
a.write('b')
a.end('c')

a.pipe(process.stdout)
```

## log4j（？）

```javascript
let content = fs.readFileSync('test.txt', 'utf-8')
eval(content)
vm.runInThisContext(content)
console.log(age)
```

## 异步执行

```javascript
setTimeout(()=>{
    console.log('s1')
    Promise.resolve().then(()=>{
        console.log('p1')
    })
    Promise.resolve().then(()=>{
        console.log('p2')
    })
})
```

结果： s1, p1, p2, 其他代码

完整事件执行顺序： 

* 从上至下执行所有的同步代码
* 执行过程中将遇到的宏任务与微任务添加至相应的队列
* 同步代码执行完毕后，执行满足条件的为任务回调
* 微任务队列执行完毕后执行所有满足需要的宏任务回调
* 循环事件环操作
* 注意： 每执行一个宏任务之后就会立即检查微任务

优先级： `nodejs`中`process.nextTick`先于`promise.then`

## 进度条

```javascript
const log = require('single-line-log').stdout

const blockChar = '='
const emptyChar = '+'

const renderProgress = (finished,total)=>{
    //进度条长度
    const blockLen = 50
    //计算进度，并根据进度计算实心块显示个数
    const completed = Math.floor(finished/total*100/(100/blockLen))
    let result = ''
    //显示块
    for(let i=0;i<completed;i++)result+=blockChar
    for(let i=0;=<blockLen-completed;i++)result+=emptyChar
    //进度文字
    result+=`${Math.floor(finished/total*100)}% ${finished}|${total}`
    return result
}
```

```javascript
//模拟下载进度
let total = 100
let finished = 0
setInterval(()=>{
    finished++
    if(finished<=total){
        //使用single-line-log，将内容显示在同一行
        log(renderProgress(finished,total))
    }
},20)
```

## 网络通信

### 常见控制字段

* SYN = 1 表示请求建立链接
* FIN = 1表示请求断开连接
* ACK = 1 表示数据信息确认

### 创建tcp连接

创建服务端实例

```javascript
const net = require("net")
const server = net.createServer()
server.listen(8000, '127.0.0.1')

server.on('listening', ()=>{ //监听成功事件
    console.log('Server wasd opend')
})
server.on('connection',(socket)=>{ //连接成功事件
    socket.on('data',(chunk)=>{ // 接收消息
        const msg = chunk.toString()
        socket.write(Buffer.from('Got it! '+msg)) //回写数据
    })
})
server.on('error',(err)=>{
    if(err.code=='EADDRINUSE'){
        console.log("地址正在使用")
    }else{
        console.log("出错了"+err)
    }
})
server.on('close',()=>{
    console.log("服务端断开")
})
```

创建客户端

```javascript
const net = require('net')
const client = net.createConnection({
    port: 1234,
    host: '127.0.0.1'
})
client.on('connect',()=>{
    client.write('拉钩教育')
})
client.on('data',(chunk)=>{
    console.log(chunk.toString())
})
client.on('error',(err)=>{
    console.log(err)
})
client.on('close',()=>{
    console.log("客户端断开")
})
```

### TCP数据粘包

发送端会累积数据统一发送（并不会超时），接收端会缓冲数据之后再消费。这时会由TCP拥塞机制决定发送时机。

通常解决办法有延时发送和封包拆包，其中，常用数据的封包拆包。

```shell
发送： abab aba bab
接收： ababababab
```

### 数据的拆包与拆包

数据传输过程： 进行数据编码，获得二进制数据包》按规则拆解数据，获取指定长度的数据。

其中，数据由消息头和消息体构成，消息头中通常包含序列号，数据长度等信息。按照预先规定好的协议解读即可。

这涉及到Buffer数据读写，使用`writeInt16BE`函数去写入，使用`readInt16BE`去读出。

### http

基础服务器

```javascript
const http = require("http")
http.createServer((a,s)=>{
    //s.statusCode = 200
    s.statusCode = 302
    s.setHeader('Content-type', 'text/html;charset=utf-8')
    s.setHeader('Location', '/')
    s.end()
}).listen(80)
```

请求相关信息

```javascript
const http = require("http")
const url = require("url")

http.createServer((a,s)=>{
    //请求路径
    let {pathname, query} = url.parse(a.url, true)
    console.log(pathname, '--------', query)
    //请求方式
    console.log(a.method)
    //http版本
    console.log(a.httpVersion)
    //请求头
    console.log(a.headers)
    console.log(a.headers['content-type'])
    //请求体(post)
    let arr = new Array()
    a.on('data',(data)=>{
        arr.push(data)
    })
    a.on('end',()=>{
        console.log(Buffer.concat(arr),toString())
    })
}).listen(8080)
```

### http请求发送

```javascript
const http = require('http')

//http.get({
//    host: 'localhost',
//    port: 1234,
//    path: '/a?b=1'
//},(res)=>{
//    //
//})

let options = {
    host: 'localhost',
    port: 1234,
    path: '/?a=1',
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    }
}

let req = http.request(options, (res)=>{
    let arr = []
    res.on('data',(data)=>{
        arr.push(data)
    })
    res.on('end',()=>{
        console.log(Buffer.concat(arr).toString())
    })
})

req.end('{"key", "value"}')
```

