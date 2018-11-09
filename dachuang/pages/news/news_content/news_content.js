let app = getApp();
let list = [];
let brief = [];
let WxParse = require('../../../wxParse/wxParse/wxParse.js')
let err = '出错了！！！'
  
Page({
  data: {

  }, 
onLoad: function(options) {
   var that = this;
   that.setData({
    id: options.id,
    time: options.time,
    title: options.title,
    author: options.author,
    tag: options.tag
   })
   console.log(that.data.id)
    wx.request({
      url: "http://119.23.47.10/brief/",
      success: function (res) {
        var list = res.data.mes;
        var preview = '';
        var allPage = [];
        var page1 = [];
        var page2 = [];
        var details = '';

        page1 = list[0]
        page2 = list[1]
        allPage = allPage.concat(page1, page2)
        allPage.sort((a, b) => {
          if (a.time > b.time) {
            return -1;
          } else if (a.time < b.time) {
            return 1;
          } else {
            return 0;
          }
        })
        if (that.data.tag == '民大要闻') {
          for (let i = 0; i < allPage.length; i++) {
            if (allPage[i].id == that.data.id) {
              details = allPage[i].details
              WxParse.wxParse('details', 'html', details, that, 0)
            }
          }
        } else if (that.data.tag == '校园新闻') {
          for (let i = 0; i < allPage.length; i++) {
            if (allPage[i].id == that.data.id) {
              details = allPage[i].details
              WxParse.wxParse('details', 'html', details, that, 0)
            }
          }
        } else {
          WxParse.wxParse('details', 'text', err, that, 0)
        }
      }
    });
  } 
})