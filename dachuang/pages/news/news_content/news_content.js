var app = getApp();
var list = [];
var brief = [];

  
Page({
  data: {

  },
    previewImagexcx: function (e) {
    //console.log(e)
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: ["http://news.scuec.edu.cn/wp-content/themes/xww-beta/images/gjmwwx.jpg"],
      success: function (res) {
        console.info("点击图片了")
      },
      fail: function (res) {
        console.log('fail')
      },
      complete: function (res) {
        // complete
      }
    })
  },  
  previewImagewx: function (e) {
    //console.log(e)
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: ["http://news.scuec.edu.cn/wp-content/themes/xww-beta/images/znmzdxwb.jpg"],
      success: function (res) {
        console.info("点击图片了")
      },
      fail: function (res) {
        console.log('fail')
      },
      complete: function (res) {
        // complete
      }
    })
  },  
  previewImagewb: function (e) {
    //console.log(e)
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: ["http://news.scuec.edu.cn/wp-content/themes/xww-beta/images/znmzdxwx.jpg"],
      success: function (res) {
        console.info("点击图片了")
      },
      fail: function (res) {
        console.log('fail')
      },
      complete: function (res) {
        // complete
      }
    })
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
        var page = []
        list = res.data.mes
        console.log(list)
        if (that.data.tag == '民大要闻') {
          page = list[1]
          for (let i = 0; i < page.length; i++) {
            if (page[i].id == that.data.id) {
              that.setData({
                details: page[i].details
              });
            }
          }
        } else if (that.data.tag == '校园新闻') {
          page = list[0]
          for (let i = 0; i < page.length; i++) {
            if (page[i].id == that.data.id) {
              that.setData({
                details: page[i].details
              });
              console.log(thisI)
            }
          }
        }
      }
    });
} 
})