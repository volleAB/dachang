var app = getApp();
Page({
  data:{
    "ret": 0,
    "msg": "成功", 
    hidden: false,
    search: app.BASE_IMGURL + "/img/broadcast/search.png",
    mymusic_icon: app.BASE_IMGURL +"/img/broadcast/mymusic_icon.png",
  },
  searchPage:function(){
    wx.navigateTo({
      url: "../broadcast_search/broadcast_search" ,
    })
  },
  
  onLoad: function (options) {
    console.log(options.id)
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
      url: app.BASE_URL +'/news/api/carousel',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        that.setData({
          focusImages: res.data.content,
        });
        // setTimeout(function () {
        //             that.setData({
        //               hidden: true
        //             })
        //         }, 1000)
      },
      fail: function() {
      },
      complete: function() {
      }
    })

    wx.request({
      url: app.BASE_URL +'/news/api/getRadioList',
      data: {},
      method: 'POST', 
      success: function (res) {
        console.log(res.data.content)
        that.setData({
          weekContent: res.data.content,
        });
        setTimeout(function () {
          that.setData({
            hidden: true
          })
        }, 1000)
      },
      fail: function () {
        that.setData({
        })
      },
      complete: function () {
      }
    })
  }
})