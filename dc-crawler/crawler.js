const http = require("https");
const cheerio = require("cheerio");
const fs = require('fs');
const Promise = require('bluebird');
const scuecUrl = ["https://www.scuec.edu.cn/s/329/t/1619/p/2/list.htm","https://www.scuec.edu.cn/s/329/t/1619/p/3/list.htm"]

crawler = () => {
    let allArr = [];
    let schoolNews = [];
    let schoolNews2 = [];
    
    getPageList = (url) => {              //对新闻网进行爬虫
        let pageListArr = [];
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
                    if(index > 10) {
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
                            mes = unescape(mes.replace(/&#x/g,'%u').replace(/;/g,''))
                            mes = mes.replace(/\n/g,'')
                            mes = mes.replace(/picture\/article/g,'https://www.scuec.edu.cn/picture/article')
                            mes = mes.replace(/\/https/g,'https')

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
                            if(pageList.tag == '校园新闻') {
                                pageList.id = 'xy' + i++;
                            }else if(pageList.tag == '民大要闻') {
                                pageList.id = 'md' + i++;
                            }else {
                                pageList.id = 'else' + i++;
                            }
                            

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
    getPageList(scuecUrl[0]);
    getPageList(scuecUrl[1]);
}

// crawler();

module.exports = crawler;