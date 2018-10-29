const http = require('https');
const cheerio = require('cheerio');
var promise = require('bluebird');
const url = ['','https://www.scuec.edu.cn/s/329/t/1619/p/2/list.htm'];
const fs = require('fs');
// var page = [];
// var pageNum = 0;
var pageBrief = [];

crawler = () => {
    
    getPageList = (url, numj) => {
        var page = [];
        var page0 = {
            list: []
        }
        var page1 = {
            list: []
        }
        var page2 = {
            list: []
        }
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
                    if (!numj) {
                        page0.list.push(titleList);
                        page.push(page0);
                    }
                    else if (numj == 1) {
                        page1.list.push(titleList);
                        page.push(page1);
                    }
                    else if (numj == 2) {
                        page2.list.push(titleList);
                        page.push(page2);
                    }
                    else {
                        console.log('over');
                    }

                    //获取文章摘要
                    //todo

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
                    
                    getMes(titleList.titleHref)
                        .then((res) => {
                            var brief = {
                                titleHref: titleList.titleHref,
                                titleTime: titleList.titleTime,
                                titleBrief: res
                            }
                            // titleList["titleBrief"] = res;
                            // pageBrief.push(brief);
                            // var buf = new Buffer(pageBrief); //存放二进制数据的缓存区
                            // fs.writeFile('./brief.json', JSON.stringify(pageBrief), function(err) {
                            //     if (err) console.log('写文件操作失败');
                            // });
                        })

                    var buf = new Buffer(page); //存放二进制数据的缓存区
                    fs.writeFile('./message.json', JSON.stringify(page), function(err) {
                        if (err) console.log('写文件操作失败');
                    });
                })
            })
        })
    }

    //获取后三页的信息

    /**
     * getNextPageList = (num) => {
        for(var i = num-1, j = 1; i > 63; i--, j++) {
            var url = 'https://www.scuec.edu.cn/s/329/t/1619/p/2/i/'+i+'/list.htm';
            getPageList(url, j);
        }
    }
     */
    

    getPageList(url[1]);
    // getNextPageList(66);
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
                var Brief = mes.replace(/(^\s*)|(\s*$)/g, "").slice(0,100)
                // titleList["titleBrief"] = Brief;
                // console.log(Brief);
                reslove(Brief);
            })

        })
        
    })
}
crawler();
module.exports = crawler;