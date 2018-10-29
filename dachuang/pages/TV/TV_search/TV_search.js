var app = getApp();
Page({
  data: {
    "ret": 0,
    "msg": "成功",
    hidden: true,
    search: app.BASE_IMGURL + "/img/broadcast/search.png",
  },
  inputValue: function (e) {
    this.setData({ inputContent: e.detail.value })
 
 
 
  }, 

  click: function () {
    var that = this;
    that.setData({
      hidden: false
    });
    wx.request({
      url: app.BASE_URL +'/news/api/getTelevisionSearch',
      data: {
        "inputKeywords": this.data.inputContent
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data.message == "调用成功") {
          console.log(res.data)
          that.setData({
            searchContent: res.data.content
          });
          that.setData({
            hidden: true
          });
        }
        else {
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },  
})