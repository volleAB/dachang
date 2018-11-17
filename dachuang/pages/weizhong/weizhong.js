var app = getApp();

var GetImage = function(that){
  wx.request({
    url: 'http://119.23.47.10/dachuang/cover/',
    header: { 'Content-Type': 'application/json'},
    method: 'get',
    success: function(res) {
      var coverQ = res.data.mes;
      that.setData({
        coverList: coverQ
      });
      console.log(that.data.coverList)
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
})