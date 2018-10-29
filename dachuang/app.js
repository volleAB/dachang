//app.js
App({
  BASE_URL: 'https://www.yanjinye.top',
  // BASE_IMGURL:'http://119.29.3.135:8888',
  BASEList:'',
  BASEContent:'',
  // handlerScroll:function(){},
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  showLoadToast: function (title, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      duration: duration || 10000
    });
  },
  onShow(){
    //当应用程序进入前台显示状态时触发
    // console.log('App Show')
  },
  onHide(){
    //当应用程序进入后台状态时触发
    console.log('App Hide')
  },
  globalData:{
    userInfo:null
  },
  showErrorModal: function (content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
})