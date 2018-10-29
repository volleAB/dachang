// pages/service/service_index/service_douban/service_douban.js

var get_douban = (that) => {
  wx.request({
    url: 'http://route.showapi.com/213-4',
    method: 'GET',
    data: {
      showapi_appid: '66637',
      showapi_sign: '7D57FEE438600A681F51A0D35D7CC3B5',
      topid: '4'
    },
    success: function (res) {
      that.setData({
        songlist: res.data.showapi_res_body.pagebean.songlist
      })
      console.log(res);
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  play: function (e) {
    let that = this;
    console.log(e);
    let myindex = e.currentTarget.dataset.url;
    console.log(myindex)
    that.setData({
      activeindex: myindex
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      mid: options.id
    })
    get_douban(that);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})