const http = require("https");
const cheerio = require("cheerio");
const fs = require('fs');
const url = ["https://www.scuec.edu.cn/s/1/t/560/p/2/i/170/list.htm", "https://www.scuec.edu.cn/s/329/t/1619/p/2/i/66/list.htm"];

let allArr = [];
let pageListArr = [];
let noticeListArr = [];

crawler2 = () => {
    
    getPageList = (url) => {              //对新闻网进行爬虫
        http.get(url, (res) => {
            let html = '';
            res.on('data', (data) => {
                html += data;
            })

            res.on('end', () => {
                let $ = cheerio.load(html);
                let i = 0;

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
                        tag: '',
                        id: ''
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
                            let mes = $('.single-content').text();

                            let date = new Date();
                            let reg = /(\d{4}-\d{2}-\d{2})/m;
                            let time = obj.match(reg) ? obj.match(reg)[1] : date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + ((date.getDate()) > 9 ? (date.getDate()) : '0' + (date.getDate()));
                            

                            let reg2 = /作者: (.*)/;
                            let author = "";

                            if(author == "作者: ") {
                                author = "作者: 未知";
                            }else {
                                // author = obj.match(reg2)[0];
                                author = obj.match(reg2);
                            }

                            let reg3 = /p\/(\d)/;
                            // console.log(obj.match(reg2));
                            let classify = url.match(reg3)[0];
                            let tag = "";
                            // console.log(classify, author);
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
                            pageList.id = i++;

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
                            var buf = new Buffer(allArr); //存放二进制数据的缓存区
                            fs.writeFile('./brief.json', JSON.stringify(allArr), function(err) {
                                if (err) console.log('写文件操作失败');
                            });
                        })
                    })
                    // console.log(pageList.href);
                });
                // console.log(pageListArr);
                allArr.push(pageListArr);
            })
        })
    }
    getPageList("https://www.scuec.edu.cn/s/329/t/1619/p/2/list.htm");  //民大要闻
    // getPageList("https://www.scuec.edu.cn/s/329/t/1619/p/7/list.htm");  //教学科研



//todo
    getNoticeList = () => {                 //通知公告
        http.get(url[0], (res) => {
            let html = "";
            res.on('data', (data) => {
                html += data;
            })
            
            res.on('end', () => {
                let $ = cheerio.load(html);
                let noticeList = {};
                let noticeListTitle = $(".wz_list").find("a");
                
                noticeListTitle.each(function (index, element) {
                    let _this = $(this);
                    let reg = /^\//;
                    
                    let noticeListHref = _this.attr("href");
                    noticeList = {
                        title: '',
                        author: '',
                        time: '',
                        href: reg.test(noticeListHref) ? 'https://www.scuec.edu.cn' + noticeListHref : noticeListHref,
                        details: '',
                        tag: '通知公告'
                    }
                    noticeList.title = _this.text();
                    
                    
                    let reg2 = /^(https)/;
                    let http = require('http');
                    //details time TODO
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
                                let $ = cheerio.load(html);
                                let obj = html.toString();
                                noticeList.details = $("#Content").text();
                                // console.log(noticeList.details, "4");
                                let reg = /(\d{4}-\d{2}-\d{2})/m;
                                let date = new Date();

                                noticeList.time = obj.match(reg) ? obj.match(reg)[1] : date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + ((date.getDate()) > 9 ? (date.getDate()) : '0' + (date.getDate()));

                                noticeListArr.sort((a, b) => {
                                    if (a.time > b.time) {
                                        return -1;
                                    } else if (a.time < b.time) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                })
                                // console.log(noticeListArr, "0");
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
                                let $ = cheerio.load(html);
                                let date = /(\d{4}-\d{2}-\d{2})/g;
                                if ($('.description').text()) {
                                    let str = $('.description').text();
                                    noticeList.time = str.match(date)[0];
                                    noticeList.details = $(".article").text();
                                    // console.log(noticeList.details, "3");


                                } else if($('#articinfo').text()){
                                    let str = $('#articinfo').text() || $("#th_content>h4").text();
                                    if(str.match(date) == null) {
                                        noticeList.time = str.match(date);
                                    }else {
                                        noticeList.time = str.match(date)[0];
                                    }
                                    noticeList.details = $(".list_right_content").find("table").text();
                                    // console.log(noticeList.details, "0");

                                }else if($(".th_c_text").text()) {
                                    noticeList.details = $(".th_c_text").text();
                                    // console.log(noticeList.details, "1");
                                }else {
                                    noticeList.time = "1";
                                }
                                
                                noticeListArr.push(noticeList);

                                noticeListArr.sort((a, b) => {
                                    if (a.chapterTime > b.chapterTime) {
                                        return -1
                                    } else if (a.chapterTime < b.chapterTime) {
                                        return 1
                                    } else {
                                        return 0
                                    }
                                })

                            })
                        }).on('error', function(e) {
                            console.log('获取课程数据出错2！');
                        })
                    }
                    noticeListArr.push(noticeList);
                    allArr.push(noticeListArr);

                    var buf = new Buffer(allArr); //存放二进制数据的缓存区
                    fs.writeFile('./brief.json', JSON.stringify(allArr), function(err) {
                        if (err) console.log('写文件操作失败');
                    });
                    // console.log(noticeListArr);
                })
            })
        }).on(('error'), function (e) {
            console.log('获取课程数据出错！');
        })
        
    }
}

crawler2();

module.exports = crawler2;