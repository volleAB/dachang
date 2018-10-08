const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
var crawler = require('./crawler');
var fs = require('fs');
var file = './brief.json';
const app = new Koa();

app.use(cors({
    origin: function (ctx) {
        if (ctx.url) {
            return "*";
        }
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

setInterval(crawler, 3000000);
// setInterval(crawler, 30000);

router.get('/brief', async(ctx, next) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(file, 'utf8', function(err, data) {
            var page = JSON.parse(data.toString());
            var i = 0;
            i++;
            ctx.body = { mes: page, cout: i };
            resolve(next())
        });
    });
}, function(ctx, next) {
    ctx.body.message = ctx.body.message;
});


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8060);
console.log('app started at port http://localhost:8060/brief/');