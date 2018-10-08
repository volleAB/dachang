let url = 'https://www.weibo.com/SCUEC?profile_ftype=1&is_all=1#_0'
const http = require('https')
const cheerio = require('cheerio');

http.get(url, (res) => {
    var html = '';
    res.on('data', (data) => {
        html += data;
    })
    res.on('end', () => {
        console.log('html:' + html)
    })
})