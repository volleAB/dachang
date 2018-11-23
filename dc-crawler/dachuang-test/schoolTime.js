const http = require('https')
const cheerio = require("cheerio");
const fs = require('fs');

let url = 'https://www.scuec.edu.cn/s/27/t/1928/p/11/c/2359/list.htm'

getSchoolTime = () => {
    http.get(url, (res) => {
        let html = ''
        res.on('data', (data) => {
            html += data
        })
        res.on('end', () => {
            let $ = cheerio.load(html)
            let timeList = $('#newslist').find('tr').eq(0)
            let a = 'https://www.scuec.edu.cn' + timeList.find('a').attr('href')
            let title = timeList.text()

            let reg = / /g
            let reg2 = /\n/g

            title = title.replace(reg, '')
            title = title.replace(reg2, '')

            let newestTime = {
                title: title,
                images: Array
            }
            http.get(a, (res) => {
                let html = ''
                res.on('data', (data) => {
                    html += data
                })
                res.on('end', () => {
                    let $ = cheerio.load(html)
                    let img = $('.content').find('img')
                    let imgArray = []
                    img.each(function (number, element) {
                        let _this = this
                        if(number < 2) {
                            imgArray.push('https://www.scuec.edu.cn' + _this.attribs.src)
                            newestTime.images = imgArray
                        }
                    })
                    fs.writeFile('./time.json', JSON.stringify(newestTime), function(err) {
                        if (err) console.log('写文件操作失败');
                    });
                })
            })
        })
    })
}

getSchoolTime()

module.exports = getSchoolTime