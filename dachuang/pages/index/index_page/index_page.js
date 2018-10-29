//index.js
//获取应用实例
var app = getApp()
var lists =require('list');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    listHeight:'100px',
    PageItems:[],
    // backImage: app.BASE_IMGURL+"/img/index/backgroundImage.png",
    newspaper: "../../../img/newspaper.png",
    weixin: "../../../img/weixin.png",
    weibo: "../../../img/weibo.png",
    broadcast: "../../../img/broadcast.png",
    television: "../../../img/television.png",
    live: "../../../img/live.png",
    magazine: "../../../img/magazine.png",
    other: "../../../img/other.png",
    imagesource: 'http://news.scuec.edu.cn/wp-content/themes/xww-beta/images/gjmwwx.jpg',
    xcxsource: 'http://news.scuec.edu.cn/wp-content/themes/xww-beta/images/gjmwwx.jpg',
    wxsource: 'http://news.scuec.edu.cn/wp-content/themes/xww-beta/images/znmzdxwb.jpg',
    wbsource: 'http://news.scuec.edu.cn/wp-content/themes/xww-beta/images/znmzdxwx.jpg',
    movies: [
      { url: '/img/bg.png' },
      { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527410951112&di=2f8ef960e16275aac164aab1b669e2ce&imgtype=0&src=http%3A%2F%2Fa4.topitme.com%2Fo%2F201008%2F16%2F12819009659891.jpg'},
      { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527411179477&di=bd8b73de35c3b769a5a59f3c426e4155&imgtype=0&src=http%3A%2F%2Ftu.simei8.com%3A7788%2Fpic158%2F15819-4.jpg' }
    ]
  },
  //图片预览函数
  previewImagexcx: function (e) {
    console.log(e)
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
  //图片预览函数
  previewImagewx: function (e) {
    console.log(e)
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
  //图片预览函数
  previewImagewb: function (e) {
    console.log(e)
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
  //图片保存函数
  onItemClickxcx: function (event) {
    var targetUrl = "/pages/index/xcx_qrcode/xcx_qrcode";
    if (event.currentTarget.dataset.url != null)
      targetUrl = targetUrl + "?url=" + event.currentTarget.dataset.url;
    wx.navigateTo({
      url: targetUrl
    });
  },
  //图片保存函数
  onItemClickwx: function (event) {
    var targetUrl = "/pages/index/wx_qrcode/wx_qrcode";
    if (event.currentTarget.dataset.url != null)
      targetUrl = targetUrl + "?url=" + event.currentTarget.dataset.url;
    wx.navigateTo({
      url: targetUrl
    });
  },
  //图片保存函数
  onItemClickwb: function (event) {
    var targetUrl = "/pages/index/wb_qrcode/wb_qrcode";
    if (event.currentTarget.dataset.url != null)
      targetUrl = targetUrl + "?url=" + event.currentTarget.dataset.url;
    wx.navigateTo({
      url: targetUrl
    });
  },
  //事件处理函数
  bindViewTap: function(){
    wx.navigateTo({
      url: '/pages/about/login/login'
    })
  },
  onLoad: function () {
    var that = this
    //console.log(app);
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })

      var pageItems = [];  
      var row = [];  
      var len = lists.PageItems.length;
      len = Math.floor((len + 2) / 3) * 3;  
      for (var i = 0; i < len; i++) {  
        if ((i + 1) % 3 == 0) {  
          row.push(lists.PageItems[i]);  
          pageItems.push(row);  
          row = [];  
          continue;  
        }  
        else {  
          row.push(lists.PageItems[i]);  
        }  
      }
      wx.getSystemInfo({  
        success: function (res) {  
          var windowWidth = res.windowWidth;  
          that.setData({  
            listHeight: (windowWidth / 3) + 'px'  
          })  
        }, 
        complete: function () {  
          that.setData({  
            pageItems: pageItems  
          })  
        }  
      })
    })
  }
})