// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../libs/bmap-wx.js');
Page({
  data: {
    weatherData: ''
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        console.log(res.windowHeight);
        // console.log(res.language)
        // console.log(res.version)
        that.setData({
          height: res.windowHeight
        })
      }
    })
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'kq6qXqhBjL0nIjAbdc8qxH6snn9XDF1c'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      that.setData({
        weatherData: weatherData
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  }
})