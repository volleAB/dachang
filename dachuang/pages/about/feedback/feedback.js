//feedback.js
//获取应用实例
var app = getApp();
var url_content = '/news/api/addFeedBack';
var url = app.BASE_URL.concat(url_content);

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
    // title: e.detail.value;
    //console.log(title);
  },
  submit: function(e){
    var _this = this;
    if (!_this.data.title_content || !_this.data.content_content) {
      app.showErrorModal('标题或反馈内容不能为空', '提醒');
        return false;
      }
    // wx.setStorageSync('title', _this.datadata.title);
    wx.setStorageSync('title', _this.data.title);
    // utils.isEmpty(_this.data.title);

    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    //console.log(this.data.title);
    //_this.data.title="12345";
    _this.setData({
      content: _this.data.content
    })
    wx.showModal({
      title: '提示',
      content: '是否确认提交反馈？',
      success: function(res) {
        if (res.confirm) {
          var title = _this.data.title;
          var content = _this.data.content;
          var nickName = _this.data.nickName;
          // console.log(nickName);
          // console.log(title);
          // console.log(content);
          // app.showLoadToast();
          wx.request({
            url: url,
            header: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
              "nikename": String(_this.data.nickName),
              "title": String(_this.data.title),
              "content": String(_this.data.content)
            },
            success:function(res){
              //console.log(res.data.code)
              if (res.data.code === "N01"){
                var text='反馈成功，您可以了解反馈动态';
                wx.showModal({
                  title: '反馈成功',
                  content: text,
                  showCancel:false,
                  success:function(res){
                    wx.navigateBack();
                  }
                })
              }
              else{
                app.showErrorModal(res.data.message,'提交失败');
              }
            },
            fail:function(res){
              app.showErrorModal(res.errMsg,'反馈失败');
            },
            complete:function(res){
              wx.hideToast();
            }
          })
        }
      }
    });
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