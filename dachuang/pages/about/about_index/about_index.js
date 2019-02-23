"use strict";
var app = getApp();

Page({
  data:{
    background: "/img/about-bg.jpg",
  },
  onLoad:function(options){
    var that = this;
    app.getUserInfo(function(userInfo){
        that.setData({
            userInfo:userInfo
        })
    });
  },
  bind: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/about/copyright/copyright'
    })
  },
  bind2: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/about/feedback/feedback'
    })
  },
  onReady:function(){
  },
  onShow:function(){
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})