const http = require('https')
const cheerio = require('cheerio')
const fs = require('fs')
const url = 'https://www.scuec.edu.cn/s/329/t/1619/p/9/list.htm'

let coverListAll = []

getCover = () => {
    http.get(url, (res) => {
        let html = ''

        res.on('data', (data) => {
            html += data
        })
        res.on('end', () => {
            let $ = cheerio.load(html)
            let coverList = $('.left-content').find('table').eq(0).find('tr')

            coverList.each(function (element, index) {
                let _this = $(this)

                let nImg = _this.find('a').find('img').attr('src')
                let nText = _this.text()

                let cover = {
                    img: 'https://www.scuec.edu.cn' + nImg,
                    title: nText
                }

                coverListAll.push(cover)

                fs.writeFile('./cover.json', JSON.stringify(coverListAll), function(err) {
                    if (err) console.log('写文件操作失败');
                });
            })
        })
    })
}

getCover()

module.exports = getCover