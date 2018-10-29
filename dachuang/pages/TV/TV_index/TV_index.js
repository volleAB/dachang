var app = getApp();
Page({
  data: {
    hidden: false,
    search: app.BASE_IMGURL + "/img/broadcast/search.png",
  },
  searchTvPage: function () {
    wx.navigateTo({
      url: "../TV_search/TV_search",
    })
  },
   onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
      url: app.BASE_URL +'/news/api/getTelevisionTitle',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        that.setData({
          televisionTitle: res.data.content.tv_list,
          titleFirst: res.data.content.tv_list[0].television_title
        });
      },
      fail: function () {
      },
      complete: function () {
      }
    });
    wx.request({
      url: app.BASE_URL +'/news/api/getTelevisionContentByTitle',
      data: {
        "title_name": "校园多看点"
        // "title_name": titleFir
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        that.setData({
          televisionContent: res.data.content,
        });
        // setTimeout(function () {
        //             that.setData({
        //               hidden: true
        //             })
        //         }, 1000)
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },
  getTvContent:function(e){
    var that = this;
    var titleName = e.currentTarget.dataset.name;
    wx.request({
      url: 'https://www.yanjinye.top/news/api/getTelevisionContentByTitle',
      data: {
        "title_name": titleName
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        that.setData({
           televisionContent: res.data.content,
           currentTitle: titleName
        });
        // setTimeout(function () {
        //             that.setData({
        //               hidden: true
        //             })
        //         }, 1000)
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  }
})