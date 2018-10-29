var app = getApp();
var url_content1 = '/news/api/getMagazineSearch';
var url1 = app.BASE_URL.concat(url_content1);
Page({
  data: {
    "ret": 0,
    "msg": "成功",
    scrollTop: 0,
    scrollHeight: 0,
  },
  
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
      url: url1,
      data: {
        inputKeywords: options.inputContent
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({
          searchContent: res.data.content,
        }); //console.log(res.data.content[0]);
        // for (var i = 0; i < searchContent.len;i++){
        // console.log(searchContent[i]);
        // }
       
        setTimeout(function () {
          that.setData({
            loadingHidden: true
          })
        }, 1500)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    //  该方法绑定了页面滚动时的事件
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },

})