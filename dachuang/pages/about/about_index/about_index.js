"use strict";
var app = getApp();
var root_path = "../../../";
var index_obj = require(root_path+'function/personal_index.js')

Page({
  data:{
    background: "/img/about-bg.jpg",
  },
  onLoad:function(options){
    var that = this;
    app.getUserInfo(function(userInfo){
        
        //设置用户信息
        that.setData({
            userInfo:userInfo
        })
    });
  },
  bind: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/about/login/login'
    })
  },
  viewBd: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/about/login/login'
    })
  },
    viewFk: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/about/feedback/feedback'
    })
  },
    viewGy: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/about/copyright/copyright'
    })
  },
  onReady:function(){
        index_obj.set_title();
  },
  onShow:function(){
        index_obj.set_title();
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})