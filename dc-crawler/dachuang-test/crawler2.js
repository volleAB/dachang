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

                pageListTitle.each(function (index, element) {
                    if(i++ >= 10) {
                        return
                    }
                    let title = $(this);
                    let titleHref = title.find('a').attr("href");
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
                            let mes = $('.single-content').html();
                            mes = unescape(mes.replace(/&#x/g,'%u').replace(/;/g,''));
                            mes = mes.replace(/\n/g,'');
                            mes = mes.replace(/src=\"/g,'src=\"https://www.scuec.edu.cn');

                            let date = new Date();
                            let reg = /(\d{4}-\d{2}-\d{2})/m;
                            let time = obj.match(reg) ? obj.match(reg)[1] : date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + ((date.getDate()) > 9 ? (date.getDate()) : '0' + (date.getDate()));
                            

                            let reg2 = /作者: (.*)/;
                            let author = "";

                            if(author == "作者: ") {
                                author = "作者: 未知";
                            }else {
                                author = obj.match(reg2);
                            }

                            let reg3 = /p\/(\d)/;
                            let classify = url.match(reg3)[0];
                            let tag = "";
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

                            fs.writeFile('./brief.json', JSON.stringify(allArr), function(err) {
                                if (err) console.log('写文件操作失败');
                            });
                        })
                    })
                });
                allArr.push(pageListArr);
            })
        })
    }
    // getPageList("https://www.scuec.edu.cn/s/329/t/1619/p/2/list.htm");  //民大要闻
    // getPageList("https://www.scuec.edu.cn/s/329/t/1619/p/3/list.htm");  //校园新闻

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
                let i = 0;
                let reg1 = /^\//;
                let reg2 = /^https/;
                let http = require('https')

                noticeListTitle.each(function (index, element) {
                    let _this = $(this);
                    
                    if(i >= 10) {
                        return
                    }
                    
                    let noticeListHref = _this.attr("href");
                    noticeList = {
                        title: '',
                        author: '',
                        time: '',
                        href: reg1.test(noticeListHref) ? 'https://www.scuec.edu.cn' + noticeListHref : noticeListHref,
                        details: '',
                        tag: '通知公告'
                    }
                    noticeList.title = _this.text();

                    
                    if(/www.scuec.edu.cn/g.test(noticeList.href)){
                        if(!reg2.test(noticeList.href)) {
                            http = require('http');
                        } else {
                            http = require('https');
                        }
                        http.get(noticeList.href, (res) => {
                            var html = '';
                            res.on('data', function(data) {
                                html += data;
                            })
                            res.on('end', function() {
                                let $ = cheerio.load(html);
                                noticeList.details = $('.list_right_content').html();
                                // noticeList.details = unescape(noticeList.details.replace(/&#x/g,'%u').replace(/;/g,''));
                                // noticeList.details = noticeList.details.replace(/\n/g,'');
                                // noticeList.details = noticeList.details.replace(/src=\"/g,'src=\"https://www.scuec.edu.cn');
                                // console.log(noticeList.details)
                                noticeListArr.push(noticeList)
                                if (noticeListArr.length == 10) {
                                    noticeListArr.sort((a, b) => {
                                        if (a.time > b.time) {
                                            return -1;
                                        } else if (a.time < b.time) {
                                            return 1;
                                        } else {
                                            return 0;
                                        }
                                    })
                                }
                            }).on('error', function(e) {
                                 console.log('获取课程数据出错2！');
                            })
                            i++;
                        })
                    } else {
                        return
                    }
                    allArr.push(noticeListArr);
                    fs.writeFile('./brief.json', JSON.stringify(allArr), function(err) {
                        if (err) console.log('写文件操作失败');
                    });
                })
            })
        }).on(('error'), function (e) {
            console.log('获取课程数据出错！');
        })
        
    }
    getNoticeList()
}

crawler2();

module.exports = crawler2;