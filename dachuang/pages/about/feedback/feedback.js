//feedback.js
//获取应用实例
var app = getApp();
var utils = require('../../../utils/util.js');

Page({
  data: {
    title: '',
    content: '',
    nickName:'',
    info: '',
    qiniu: '',
  },
  onLoad: function(options){
    var _this = this;

    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女 
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        var username='';
        username+=nickName;
        var title = wx.getStorageSync('title');
        _this.setData({
          nickName: username,
          title: title
        });
      }
    });
  },
  titleInput:function(e){
    this.setData({
      title: e.detail.value
    })
  },

  // inputFocusEventHandle:function(e){
  //   console.log("输入框获取到焦点："+e.detail.value)
  // },
  // inputEventHandle:function(e){
  //   this.setData({
  //     title: e.detail.value
  //   })
  //   console.log("输入框正在输入："+e.detail.value)
  // },
  bindTextAreaBlur: function (e) {
    this.setData({
      content: e.detail.value
    })
  },    
  // inputConfirmEventHandle:function(e){
  //   console.log("输入完成:"+e.detail.value)
  // },
  // inputBlurEventHandle:function(e){
  //   console.log("输入框失去焦点："+e.detail.value)
  // }
});