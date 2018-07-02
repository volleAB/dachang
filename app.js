const Koa = require('koa');
const router = require('koa-router')();
// CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）
const cors = require('koa2-cors');
var http = require('http');
var crawler = require('./crawler');
var fs = require('fs');
var file = ['./message.json','./brief.json'];
const app = new Koa();

// app.use(cors());
app.use(cors({
    origin: function (ctx) {
        if (ctx.url) {
            return "*"; // 允许来自所有域名请求
        }
        // return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

setInterval(crawler, 3000000);//5h

router.get('/page', async(ctx, next) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(file[0], 'utf8', function(err, data) {
            var page = JSON.parse(data.toString());
            ctx.body = { mes: page };
            resolve(next())
        });
    });
}, function(ctx, next) {
    ctx.body.message = ctx.body.message;
});

router.get('/brief', async(ctx, next) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(file[1], 'utf8', function(err, data) {
            // var page = JSON.parse(data.toString());
            // var page = JSON.stringify(data);
            var page = JSON.parse(data.toString());     //使获取到的数据更好处理
            // ctx.body = page;
            ctx.body = { mes: page };
            resolve(next())
        });
    });
}, function(ctx, next) {
    ctx.body.message = ctx.body.message;
});


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8070);
console.log('app started at port 8070...');