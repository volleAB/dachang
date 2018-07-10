const http = require("https");
const cheerio = require("cheerio");
const fs = require("fs");
const url = "https://weibo.com/SCUEC?refer_flag=1001030101_&is_hot=1";

let inforList = [];

crawler = () => {
    http.get(url, (res) => {
        let html = '';
        res.on('data', (data) => {
            html += data;
            console.log(html);
        })

        res.on('end', () => {
            let $ = cheerio.load(html);
            // let wbList = $(".WB_detail");
            let o = $('.pf_username');
            let wbForm = $(".WB_from S_txt2").find('a').toArray();
            let wbText = $(".WB_text W_f14");
            let wbMedia = $(".media_box").find('img').attr('src');
            // console.log(html);
            // wbForm.each(function (index, element) {
            //     let _this = $(this);
            //     console.log(_this.text());
            //     console.log("sd");
            // });
            for (var i = 0; i < wbForm.length; i++) {
                var data = $(wbForm[i]).text();
                console.log(data);
            }
        })
    })
}

crawler();