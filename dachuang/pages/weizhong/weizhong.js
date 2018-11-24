var app = getApp();

var GetImage = function(that){
  wx.request({
    url: 'http://119.23.47.10/dachuang/cover/',
    header: { 'Content-Type': 'application/json'},
    method: 'get',
    success: function(res) {
      var coverQ = res.data.mes;
      var coverW = [];
      for (var i = 0; i < coverQ.length; i++) {
        coverW.push(coverQ[i].img)
      }
      // console.log(coverW)
      that.setData({
        coverList: coverQ,
        cover: coverW
      });
    },
  })
};

Page({
  data: {
    hidden: true,
    scrollTop: 0,
    scrollHeight: 0,
    coverList: [],
    backgroundImg: '../../img/weizon.png'
  },
  onLoad: function () {
    GetImage(this)
  },
  onShow: function () {
    //  在页面展示之后先获取一次数据
    var that = this;
  },
  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件
    var that = this;
  },
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.cover;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})