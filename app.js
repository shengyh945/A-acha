const http = require('http')

const fs = require('fs')

const path = require('path')

// 引入
const mime = require('mime')

let rootPath = path.join(__dirname, 'www');

// console.log(rootPath)

let server = http.createServer(function(request, response) {
    // console.log(request.url)
    let targetPath = path.join(rootPath, request.url)

    // response.end('hello world')
    if (fs.existsSync(targetPath)) {
        // response.setHeader('content-type', 'text/html;charset=utf-8')
        // response.end('陈宫')
        // fs.stat()
        fs.stat(targetPath, (err, stats) => {
            // 是文件 直接读取 并返回
            if (stats.isFile()) {
                response.setHeader('content-type', mime.getType(targetPath))
                    // console.log(mime.getType(targetPath))
                fs.readFile(targetPath, (err, data) => {
                    // 数据才读取完毕
                    response.end(data);
                })
            }
            if (stats.isDirectory()) {
                // 如果是文件夹
                fs.readdir(targetPath, (err, files) => {
                        let str = ''
                        console.log(request.url)
                        for (let i = 0; i < files.length; i++) {
                            str += `<li><a href='${request.url}${request.url=="/"?"":"/"}${files[i]}'>${files[i]}</a></li>`
                        }
                        response.end(
                            `<!DOCTYPE html>
                        <html lang="en">
                        
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <meta http-equiv="X-UA-Compatible" content="ie=edge">
                            <title>Document</title>
                        </head>
                        
                        <body>
                            <p>Index of ${request.url}</p>
                            <ul>
                               ${str}
                            </ul>
                        </body>
                        
                        </html>`)
                    })
                    // for(let i=0;i<)
                    // response.end('isDirectory')
            }
            // 是文件夹 渲染出列表
        });
    } else {
        // 没有此文件
        response.statusCode = 404;
        response.setHeader('content-type', 'text/html;charset=utf-8')
        response.end(`<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
        <html><head>
        <title>404 Not Found</title>
        </head><body>
        <h1>Not Found</h1>
        <p>你请求的${request.url} 不在服务器上哦,检查一下呗</p>
        </body></html>`)
    }
})

server.listen(8848, '127.0.0.1', () => {
    console.log('success')
})