const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
var http = require('http');
var crawler = require('./crawler');
var fs = require('fs');
var file = './message.json';
const app = new Koa();
app.use(cors());
setInterval(crawler, 3000000);//5Сʱ
router.get('/page', async(ctx, next) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(file, 'utf8', function(err, data) {
            var page = JSON.parse(data.toString());
            ctx.body = { message: page };
            resolve(next())
        });
    });
}, function(ctx, next) {
    ctx.body.message = ctx.body.message;
});

app.use(router.routes());
app.listen(8070);
console.log('app started at port 8070...');