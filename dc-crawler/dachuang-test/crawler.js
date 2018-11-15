const http = require('https');
const cheerio = require('cheerio');
var promise = require('bluebird');
const url = 'https://news.baidu.com/';
const fs = require('fs');

crawler = () => {

    getPageList = () => {
        http.get(url, (res) => {
            let html = "";
            res.on('data', (data) => {
                html += data;
            })

            res.on('end', () => {
                let $ = cheerio.load(html)
                let hotNews = $('.hotnews').find('a')
                let hotNewsList = []

                for(let i = 0; i < hotNews.length; i++) {
                    let temp = {
                        time: String,
                        title: String,
                        href: String
                    }

                    temp.title = hotNews[i].children[0].data
                    temp.href = hotNews[i].attribs.href

                    hotNewsList.push(temp)
                }

                for(let i = 0; i < hotNewsList.length; i++) {
                    if(i > 1) {
                        return
                    } else {
                        // let http = require('http')
                        http.get(hotNewsList[i].href, (res) => {
                            let html = ''
                            res.on('data', (data) => {
                                html += data
                            })
                            res.on('end', () => {
                                let $ = cheerio.load(html)
                                let content = $('.main-aticle')
                                console.log(content.text())
                            })
                        })
                    }
                }
            })
        })
    }
    getPageList()
}
crawler();
module.exports = crawler;