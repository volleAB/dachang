// pages/detail/detail.js
var app = getApp();
Page({
  data:{
    loadingHidden:false
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: app.BASE_URL+'/news/api/getRadioContent',
      data: {
        "program_id": options.id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data);
        that.setData({
          broadcastContent: res.data.content,
          broadcastName:options.name
        });
        setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1500)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
    wx.request({
      url: app.BASE_URL +'/news/api/getHistoryRecord',
      data: {
        "program_id": options.id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data);
        that.setData({
          historyList: res.data.content
        });
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
    });

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})