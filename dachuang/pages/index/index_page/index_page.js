//index.js
//获取应用实例
let app = getApp()
let lists = require('list')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    PageItems: lists.PageItems,
    movies: [
      { url: '/img/bg.png' },
      { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527410951112&di=2f8ef960e16275aac164aab1b669e2ce&imgtype=0&src=http%3A%2F%2Fa4.topitme.com%2Fo%2F201008%2F16%2F12819009659891.jpg'},
      { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527411179477&di=bd8b73de35c3b769a5a59f3c426e4155&imgtype=0&src=http%3A%2F%2Ftu.simei8.com%3A7788%2Fpic158%2F15819-4.jpg' }
    ]
  },
  onLoad: function () {
  }
})