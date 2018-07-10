const http = require("https");
const cheerio = require("cheerio");
const fs = require('fs');
const url = ["https://www.scuec.edu.cn/s/1/t/560/p/2/i/170/list.htm", "https://www.scuec.edu.cn/s/329/t/1619/p/2/i/66/list.htm"];

let pageListArr = [];
let noticeListArr = [];

crawler2 = () => {
    /*getPageList = (url) => {              //对新闻网进行爬虫
        http.get(url, (res) => {
            let html = '';
            res.on('data', (data) => {
                html += data;
            })

            res.on('end', () => {
                let $ = cheerio.load(html);
                
                let pageListTitle = $(".columnStyle");
                // let pageNum = $("#LIST_PAGINATION_COUNT");

                pageListTitle.each(function (index, element) {
                    let title = $(this);
                    // let titleText = title.find('font').text();
                    let titleHref = title.find('a').attr("href");
                    // let titleTime = title.find('.postTime').text();

                    let reg = /^\//;

                    let pageList = {
                        title: '',
                        author: '',
                        time: '',
                        href: reg.test(titleHref) ? 'https://www.scuec.edu.cn' + titleHref : titleHref,
                        details: '',
                        tag: ''
                    }

                    
                    http.get(pageList.href, (res) => {
                        let html = '';
                        res.on('data', (data) => {
                            html += data;
                        })

                        res.on('end', () => {
                            let $ = cheerio.load(html);
                            let title = $('.single-header').find('h2').text();
                            let obj = $('.article_author').text();
                            let mes = $('.p_text_indent_2').text();

                            let date = new Date();
                            let reg = /(\d{4}-\d{2}-\d{2})/m;
                            let time = obj.match(reg) ? obj.match(reg)[1] : date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + ((date.getDate()) > 9 ? (date.getDate()) : '0' + (date.getDate()));
                            

                            let reg2 = /^作者：(.*)/m;
                            let author = "";
                            if(obj.match(reg2) == null) {
                                author = "未知";
                            }else {
                                author = obj.match(reg)[0];
                            }

                            let reg3 = /p+[/]+\d{2}/;
                            // console.log(typeof url);
                            let classify = url.match(reg3)[0];
                            
                            let tag = "";
                            console.log(classify, author)
                            if(classify == "p/2") {
                                tag = "民大要闻";
                            }else if(classify == "p/7") {
                                tag = "科研教学";
                            }else if(classify == "p/10") {
                                tag = "民大人物";
                            }else if(classify == "p/6") {
                                tag = "媒体民大";
                            }else if(classify == "p/3") {
                                tag = "校园新闻";
                            }else if(classify == "p/4") {
                                tag = "大学讲坛";
                            }else if(classify == "p/11") {
                                tag = "校园视点";
                            }else {
                                tag = "其他";
                            }
                             

                            pageList.title = title;
                            pageList.time = time;
                            pageList.details = mes;
                            pageList.author = author;
                            pageList.tag = tag;

                            pageListArr.push(pageList);

                            pageListArr.sort((a, b) => {    //排序
                                if (a.time > b.time) {
                                    return -1;
                                } else if (a.time < b.time) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            })

                            // console.log(pageList);
                            var buf = new Buffer(pageListArr); //存放二进制数据的缓存区
                            fs.writeFile('./brief.json', JSON.stringify(pageListArr), function(err) {
                                if (err) console.log('写文件操作失败');
                            });
                        })
                    })
                    // console.log(pageList.href);
                });
                // console.log(pageListArr);
            })
        })
    }
    getPageList("https://www.scuec.edu.cn/s/329/t/1619/p/2/i/66/list.htm");
    getPageList("https://www.scuec.edu.cn/s/329/t/1619/p/2/i/65/list.htm");
    getPageList("https://www.scuec.edu.cn/s/329/t/1619/p/2/i/64/list.htm");
*/
    getNoticeList = () => {                 //通知公告
        http.get(url[0], (res) => {
            let html = "";
            res.on('data', (data) => {
                html += data;
            })
            
            //TODO
            res.on('end', () => {
                let $ = cheerio.load(html);
                let noticeListTitle = $(".wz_list").find("a");
                // console.log(noticeListTitle.length);
                
                
                noticeListTitle.each(function (index, element) {
                    let _this = $(this);
                    let reg = /^\//;
                    noticeListHref = _this.attr("href");
                    
                    let noticeList = {
                        title: '',
                        author: '',
                        time: '',
                        href: reg.test(noticeListHref) ? 'https://www.scuec.edu.cn' + noticeListHref : noticeListHref,
                        details: '',
                        tag: ''
                    }

                    
                    
                    let reg2 = /^(https)/;
                    let http = require('http');

                    if (reg2.test(noticeList.href)) {
                        http = require('https');
                    }
                    if (/ContentDetail\.html/.test(noticeList.href)) {

                        http.get('http://gzc.scuec.edu.cn/ReturnContent/GetContentDetail?AskString={"data":' + '"' + noticeList.href.match(/id=(.+)/)[1] + '"}', function(res) {
                            let html;
                            res.on('data', function(data) {
                                html = data;
                            })

                            res.on('end', function() {
                                let obj = html.toString();
                                let reg = /(\d{4}-\d{2}-\d{2})/m;
                                let date = new Date();
                                // console.log(chapterData.chapterTitle);
                                noticeList.time = obj.match(reg) ? obj.match(reg)[1] : date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + ((date.getDate()) > 9 ? (date.getDate()) : '0' + (date.getDate()));
                                noticeListArr.push(noticeList.time)

                                // pageList.list.push(chapterData);
                                // if (noticeListArr.length == 16) {

                                //     pageList.list.sort((a, b) => {
                                //         if (a.time > b.time) {
                                //             return -1
                                //         } else if (a.time < b.time) {
                                //             return 1
                                //         } else {
                                //             return 0
                                //         }
                                //     })

                                //     // filterChapters(pageList);

                                // }

                            })
                        }).on('error', function(e) {

                            console.log('获取课程数据出错2！');
                        })
                    } else {
                        http.get(noticeList.href, function(res) {
                            var html = '';
                            res.on('data', function(data) {
                                html += data;
                            })

                            res.on('end', function() {
                                var $ = cheerio.load(html);
                                var date = /(\d{4}-\d{2}-\d{2})/g;
                                if ($('.description').text()) {
                                    var str = $('.description').text()
                                    noticeList.time = str.match(date)[0];
                                    noticeListArr.push(noticeList.time);
                                } else {
                                    var str = $('#articinfo').text() || $("#th_content>h4").text();
                                    if(str.match(date) == null) {
                                        noticeList.time = str.match(date);
                                    }else {
                                        noticeList.time = str.match(date)[0];
                                    }
                                    if(noticeList.time == null) {
                                        console.log(noticeList.href);
                                    }
                                        console.log(noticeList.href);
                                        noticeListArr.push(noticeList.href);
                                    
                                }

                                // pageList.list.push(chapterData);
                                // if (noticeListArr.length == 16) {

                                //     pageList.list.sort((a, b) => {
                                //         if (a.chapterTime > b.chapterTime) {
                                //             return -1
                                //         } else if (a.chapterTime < b.chapterTime) {
                                //             return 1
                                //         } else {
                                //             return 0
                                //         }
                                //     })

                                //     // filterChapters(pageList)

                                // }
                        
                            })
                        }).on('error', function(e) {

                            console.log('获取课程数据出错2！');
                        })
                    }
                })
            })
        }).on(('error'), function (e) {
            console.log('获取课程数据出错！');
        })
    }
    getNoticeList();
}

crawler2();

module.exports = crawler2;