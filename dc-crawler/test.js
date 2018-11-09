// let url = 'https://news.baidu.com/'
let url = 'https://www.scuec.edu.cn/s/329/t/1619/19/66/info137574.htm'
// let url = 'http://gzc.scuec.edu.cn/AssertMgt/ContentDetail.html?id=5b319b569184130b343b7800'
const http = require('https')
const cheerio = require('cheerio')
const fs = require('fs')

http.get(url, (res) => {
    var html = '';
    res.on('data', (data) => {
        html += data;
    })
    res.on('end', () => {
        let $ = cheerio.load(html)
        let hotNews = $('.single-content')
        let allArr = hotNews.html()
        allArr = unescape(allArr.replace(/&#x/g,'%u').replace(/;/g,''))
        allArr = allArr.replace(/\n/g,'')
        allArr = allArr.replace(/picture\/article/g,'https://www.scuec.edu.cn/picture/article')
        allArr = allArr.replace(/\/https/g,'https')
        fs.writeFile('./html.json', JSON.stringify(allArr), function(err) {
            if (err) console.log('写文件操作失败');
        });
    })
})