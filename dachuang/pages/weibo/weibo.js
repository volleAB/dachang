// //weibo.js
// 获取数据
var page=0;
var app = getApp();
var url_list = '/news/api/getWeiboContent';

var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
  });
  
}
Page({
  data: {
    hidden: true,
    list:[],
    scrollTop: 0,
    scrollHeight: 0,
    msg:[],
  },
  onLoad: function () {
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight,
          
        });
        
        
      }
    });
  },
  previewImage: function (e) {
   
    var current = e.target.dataset.src
   //图片预览
    wx.previewImage({
      current: current,
      urls: [current],
      success: function (res) {
      //  console.info("点击图片了")
      },
      fail: function (res) {
        console.log('fail')
      },
      complete: function (res) {
        // complete
      }
    })
  },  
  onShow: function () {
    //  在页面展示之后先获取一次数据
    var that = this;
    GetList(that);
  },
  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件
    // var that = this;
    // GetList(that);
  },
  scroll: function (event) {
    //  该方法绑定了页面滚动时的事件
    // this.setData({
    //   scrollTop: event.detail.scrollTop
    // });
  },
  refresh: function (event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  }
})
