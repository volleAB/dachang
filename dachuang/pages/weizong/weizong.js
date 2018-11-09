// //new_list.js
var app = getApp();
var url_content = '/news/api/getMagazineList';
var url = app.BASE_URL.concat(url_content);
var url_content1 = '/news/api/getMagazineSearch';
var url1 = app.BASE_URL.concat(url_content1);
var url_logo1 = '/news/api/getMagazineImage';
var url_logo = app.BASE_URL.concat(url_logo1);
var url_list ='news/api/getMagazineListByPeriod';
var urlList = app.BASE_URL.concat(url_list);
var magzineList;
var image;
var title = [];
var small_description = [];
var image = [];
// var magzine;
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
    searchImg: app.BASE_IMGURL + "/img//weizong/search.png",
    navigateUrl: "../weizong_xiangqing/weizong_xiangqing",
    magzineList: [],
    image:[],
    weizong: app.BASE_IMGURL + "/img/weizong/weizong.png",
  },

  inputValue: function (e) {
    this.setData({ inputContent: e.detail.value })
  },
  click: function () {
    var that = this;
    wx.request({
      url: url1,
      data: {
        "inputKeywords": this.data.inputContent
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({
          mes: res.data.message
        });
        if (that.data.mes == "调用成功") {
          console.log(res.data)
          wx.navigateTo({
            url: "../weizong_search/weizong_search?inputContent=" + that.data.inputContent,
          })
        }
        else {
          // this.data.test = "查无追溯码"
        }
      },
      fail: function () {
        // fail


        
      },
      complete: function () {
        // complete
      }
    })
  },

  onLoad: function () {
    
    // console.info(magzineList);
    var that = this;
    GetList(that);
    GetImage(that);
    wx.getSystemInfo({
      success: function (res) {
        // console.info(res.data.content);
        //console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    //  在页面展示之后先获取一次数据
    var that = this;
  },
  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件
    var that = this;
  },
  scroll: function (event) {
    //  该方法绑定了页面滚动时的事件
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      magzineList: [],
      image:[],
      scrollTop: 0
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length >= 7) {
      wx.hideKeyboard();
    }
  },
})