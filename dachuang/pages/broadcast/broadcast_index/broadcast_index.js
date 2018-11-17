var app = getApp();
var url_voice = 'https://api.ximalaya.com/tracks/get_batch?app_key=b617866c20482d133d5de66fceb37da3&client_os_type=4&nonce=5519a1e121fa5f53519355b2e575447c&server_api_version=1.0.0&ids=15362879%2C252045&sig=1e0f754de7ebefdc0b9191441eb7441e'

var GetImage = function (that) {
  wx.request({
    url: url_voice,
    data: {},
    header: { 'Content-Type': 'application/json' },
    method: 'get',
    success: function (res) {
      console.log(res);
    },
  })
};
Page({
  data:{
    hidden: false,
  },
  onLoad: function (options) {
    GetImage()
  }
})