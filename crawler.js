const http = require('https');
const cheerio = require('cheerio');
var promise = require('bluebird');
const url = ['','https://www.scuec.edu.cn/s/329/t/1619/p/2/list.htm'];
const fs = require('fs');
var page = [];
var PageNum = 0;

crawler = () => {
    getPageList = (url) => {
        // var page = [];
        // var pages = [];
        http.get(url, (res) => {
            var html = '';
            res.on('data', (data) => {
                html += data;
            })

            res.on('end', () => {
                var $ = cheerio.load(html);
                var PageList = $('.columnStyle');
                var PageNums = $('#LIST_PAGINATION_COUNT');
                // console.log(PageNums);
                PageNum = parseInt(PageNums.text());

                PageList.each(function (index, element) {
                    var title = $(this);
                    var titleText = title.find('font').text();
                    var titleHref = title.find('a').attr("href");
                    var titleTime = title.find('.postTime').text();

                    var reg = /^\//;
                    titleList = {
                        titleText: titleText,
                        titleHref: reg.test(titleHref) ? 'https://www.scuec.edu.cn' + titleHref : titleHref,
                        titleTime: titleTime
                    }
                    // console.log(titleList);
                    page.push(titleList);

                    //获取文章摘要
                    //todo
                    

                    //获取后三页的信息
                    /**
                     * http.get(titleList.titleHref, (res) => {
                        var html = '';
                        res.on('data', (data) => {
                            html += data;
                        })
            
                        res.on('end', () => {
                            // console.log(titleList)
                            var $ = cheerio.load(html);
                            var mes = $('.single-content').text();
                            var Brief = mes.slice(10,100);
                            titleList["titleBrief"] = Brief;
                            // count.push(titleList["titleBrief"]);
                            page.push(titleList);

                            var buf = new Buffer(page); //存放二进制数据的缓存区
                            fs.writeFile('./message.json', JSON.stringify(page), function(err) {
                                if (err) console.log('写文件操作失败');
                            });
                        })
                    })
                     */
                    

                    /*
                    getMes(titleList.titleHref)
                        .then((res) => {
                            
                            titleList["titleBrief"] = res;
                            page.push(titleList);
                            console.log('one');
                            var buf = new Buffer(pages);
                            var buf = new Buffer(page); //存放二进制数据的缓存区
                            fs.writeFile('./message.json', JSON.stringify(page), function(err) {
                                if (err) console.log('写文件操作失败');
                            });
                        })
                        */
                    var buf = new Buffer(page); //存放二进制数据的缓存区
                    fs.writeFile('./message.json', JSON.stringify(page), function(err) {
                        if (err) console.log('写文件操作失败');
                    });
                })
            })
        })
    }
    getNextPageList = (num) => {
        // console.log(num);
        // https://www.scuec.edu.cn/s/329/t/1619/p/2/i/65/list.htm
        for(var i = num-1; i > 62; i--) {
            var url = 'https://www.scuec.edu.cn/s/329/t/1619/p/2/i/'+i+'/list.htm';
            // console.log(url);
            getPageList(url);
            // console.log(i);
        }
    }
    getPageList(url[1]);
    getNextPageList(66);
}

//获取文章摘要
getMes = (url) => {
    return new promise((reslove, reject) => {
        http.get(url, (res) => {
            var html = '';
            res.on('data', (data) => {
                html += data;
            })

            res.on('end', () => {
                // console.log(titleList)
                var $ = cheerio.load(html);
                var mes = $('.single-content').text();
                var Brief = mes.slice(10,100);
                // titleList["titleBrief"] = Brief;
                // console.log(Brief);
                reslove(Brief);
            })

        })
        
    })
}
crawler();
module.exports = crawler;