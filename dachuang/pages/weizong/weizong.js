//
var app = getApp();
var GetImage=function(that){
  wx.request({
    url: url_logo,
    data: {},
    header: { 'Content-Type': 'application/json'},
    method: 'POST',
    success: function(res) {
      var image = res.data.content;
      that.setData({
        image:image,
      });
      console.log(res.data.content);
    },
  })
};
var GetList = function (that) {
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: {},
    success: function (res) {
      var magzineList = [];
      for (var i = 0, len = res.data.content.length; i < len; i += 4) {
        magzineList.push(res.data.content.slice(i, i + 4));
      that.setData({
         magzineList: magzineList,
       });
      }
      console.log(magzineList)
    },
  })
};
Page({
  data: {
    hidden: true,
    scrollTop: 0,
    scrollHeight: 0,
  },


  onLoad: function () {
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