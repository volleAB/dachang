const http = require("https");
const cheerio = require("cheerio");
const fs = require('fs');

let allArr = [];
let pageListArr = [];
let sign

crawler = () => {
    
    getPageList = (url) => {             //对新闻网进行爬虫
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
                            sign = true
                        })
                    })

                });

                allArr.push(pageListArr);
            })
        })
    }
    getPageList("https://www.scuec.edu.cn/s/329/t/1619/p/2/list.htm");  //民大要闻
    getPageList("https://www.scuec.edu.cn/s/329/t/1619/p/3/list.htm");  //校园新闻
}

crawler();

module.exports = crawler;