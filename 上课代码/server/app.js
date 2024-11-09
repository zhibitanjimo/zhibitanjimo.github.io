var http=require('http');
http.createServer(function(request,response) {
    response.writeHead(200,{'Content-Type':'text/plain'})
    // 发送响应数据“Hello world"
    response.end('Hello world qaq\n');}).listen(8888);
    // 终端打印如下信息
    console.log('Server running at https://apis.netstart.cn/maoyan/search/movies?keyword=喜洋洋&ci=1');
    const express = require('express');
    const  cors =require('cors');
    const  app =express();
    //使用cors中间件app.use(cors()),
    //其他路由和中间件app.get('/',(req,res)=>res.send('Hello world!');});
    const PORT = 3000;
    app.listen(PORT,()=>{
        console.log( 'Server is running on port ${PORT}' );});