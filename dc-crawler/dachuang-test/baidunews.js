const http = require('https');
const cheerio = require('cheerio');
var promise = require('bluebird');
const url = 'https://www.guazi.com/hz/buy/';
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
                console.log(html)
                let hotNews = $('.dd-all.clearfix.js-brand.js-option-hid-info').find('a')
                let hotNewsList = []

                for(let i = 0; i < hotNews.length; i++) {
                    // let temp = {
                    //     time: String,
                    //     title: String,
                    //     href: String
                    // }

                    // temp.title = hotNews[i].children[0].data
                    // temp.href = hotNews[i].attribs.href

                    // hotNewsList.push(temp)
                    console.log(hotNews.text())
                }

                // for(let i = 0; i < hotNewsList.length; i++) {
                //     if(i > 1) {
                //         return
                //     } else {

                //         http.get(hotNewsList[i].href, (res) => {
                //             let html = ''
                //             res.on('data', (data) => {
                //                 html += data
                //             })
                //             res.on('end', () => {
                //                 let $ = cheerio.load(html)
                //                 let content = $('.main-aticle')
                //                 console.log(content.text())
                //             })
                //         })
                //     }
                // }
            })
        })
    }
    getPageList()
}
crawler();
module.exports = crawler;