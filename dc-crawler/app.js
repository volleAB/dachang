const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
var newsCrawler = require('./crawler');
var coverCrawler = require('./weijoin');
var timeCrawler = require('./schoolTime')
var fs = require('fs');
var file = ['./brief.json', './cover.json', 'time.json'];
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

setInterval(newsCrawler, 3000000)
setInterval(coverCrawler, 3000000)
setInterval(timeCrawler, 3000000)
// setInterval(crawler, 30000);

const router = new Router;

const briefRouter = new Router;

briefRouter.get('/brief', async(ctx, next) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(file[0], 'utf8', function(err, data) {
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

const coverRouter = new Router;

coverRouter.get('/cover', async(ctx, next) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(file[1], 'utf8', function(err, data) {
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

const timeRouter = new Router;

timeRouter.get('/time', async(ctx, next) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(file[2], 'utf8', function(err, data) {
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


router.use(briefRouter.routes(), briefRouter.allowedMethods());
router.use(coverRouter.routes(), coverRouter.allowedMethods());
router.use(timeRouter.routes(), timeRouter.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(8060, () => {
    console.log('app started at port http://localhost:8060/');
})