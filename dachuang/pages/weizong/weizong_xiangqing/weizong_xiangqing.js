// weizong_xiangqing.wxss
var app = getApp();
var WxParse = require('../../../wxParse/wxParse/wxParse.js');
const MENU_WIDTH_SCALE = 0.82;
const FAST_SPEED_SECOND = 300;
const FAST_SPEED_DISTANCE = 5;
const FAST_SPEED_EFF_Y = 50;
var url_list = '/news/api/getMagazineListByPeriod';
var urlList = app.BASE_URL.concat(url_list);
var url_content = '/news/api/getMagazineContentByPeriod';
var urlContent = app.BASE_URL.concat(url_content);
var url_contentBylist = '/news/api/getMagazineContent';
var urlContentByList = app.BASE_URL.concat(url_contentBylist);
var id;
var ListTitle;
var ContentTitle;
var Content;
var All=[];
var AllList = [];
var Popen;

var GetMagazineList = function (that, id) {
  var magzineList = [];
  var test = [];
  let title_id = parseInt(id);
    wx.request({
      url: urlList,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: {
        "title_id": title_id
      },
      success: function (res) {

        for (var i = 0; i < res.data.content.length; i++) {
          //magzineList.push(res.data.content[i].list_title);
          console.log("AAA");
          console.log(res.data.content[i]);
          magzineList.push(res.data.content[i].toString());
        }
        that.setData({
          List: magzineList,
          ListTitle: magzineList
        });
        that.data.List = magzineList;
        app.BASEList = magzineList;
        test = magzineList;
        //console.log(magzineList);
        //console.log(that.data.List);
        console.log("BBB");
        console.log(List.length);

      },
    })
  //console.log(test);
  return test;
  //return that.data.List;
  //return that.data.List;
};

var GetMagazineListTest = function (that, id) {
  var magzineList = [];
  var test=[];
  let title_id = parseInt(id);
  var request = function (title_id){
    wx.request({
      url: urlList,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: {
        "title_id": title_id
      },
      success: function (res) {

        for (var i = 0; i < res.data.content.length; i++) {
          //magzineList.push(res.data.content[i].list_title); 
          console.log("AAA");
          console.log(res.data.content[i]);
          magzineList.push(res.data.content[i].toString());
        }
        that.setData({
          List: magzineList,
          ListTitle: magzineList,
          test: magzineList
        });
        that.data.List = magzineList;
        app.BASEList = magzineList;
      },
    })
  };
  request(title_id);
  console.log(test);
  return test;
};
var GetMagazineContent = function (that, id) {
  wx.request({
    url: urlContent,
    header: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: {
      "title_id": parseInt(id)
    },
    success: function (res) {
      // var magzineContent = [];
      // var contents=[]
      var magzineContent = res.data.content[0].list_content;
      // console.log(res.data.content[0]);
      // console.log(magzineContent);
      WxParse.wxParse('firstContent', 'html', magzineContent, that, 5)
      that.setData({
        Content: magzineContent,
        //ListTitle: title,
        // MagazineTitle: title,
        // List: 1
      });
      // console.log(magzineContent[0])
      // WxParse.wxParse('firstContent', 'html', magzineContent[0], that, 5)
      // that.setData({
      //   Content: magzineContent,
      // });
      // console.log('content:',magzineContent)
      app.BASEContent = magzineContent;
      //console.log(app.BASEContent);
    },
  })
};
var GetMagazineContentByTitle = function (that, title) {
  wx.request({
    url: urlContentByList,
    header: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: {
      "title_id": title
    },
    success: function (res) {
      var magzineContent = res.data.content[0].list_content;
      // console.log(res.data.content[0]);
      // console.log(magzineContent);
      WxParse.wxParse('magzineContent', 'html', magzineContent, that, 5)
      that.setData({
        Content: magzineContent,
        //ListTitle: title,
        MagazineTitle:title,
        List:1
      });
      //that.data.ui.offsetLeft = 0;
      // console.log(Content)
    },
  })
};

Page({
  data: {
    ui: {
      windowWidth: 0,
      menuWidth: 0,
      offsetLeft: 0,
      tStart: true,
      Popen: true,
      List:[],
      icon: app.BASE_IMGURL + "/img/weizong_detail/icon.png",
    },
    icon: app.BASE_IMGURL + "/img/weizong_detail/icon.png",
    //All: [{ title: List, content: Content }],
  },
  
  onHide: function () {
  },
  //图片预览函数
  previewImage: function (e) {
    //console.log(e)
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: ["imageList.image"],
      success: function (res) {
        //console.info("点击图片了")
      },
      fail: function (res) {
        console.log('fail')
      },
      complete: function (res) {
        // complete
      },
      //侧滑
      tap_ch: function (e) {
        if (this.data.open) {
          this.setData({
            open: false
          });
        } else {
          this.setData({
            open: true
          });
        }
      }
    })
  },
  onLoad: function (options) {
    //侧滑
    try {
      let res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.ui.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
      this.data.ui.offsetLeft = 0;
      this.data.ui.windowWidth = res.windowWidth;
      this.setData({ ui: this.data.ui })
    } catch (e) {
    }
    // var that = this;
    // that.setData({
    //   id: options.id,
    //   title: options.title,
    //   name: options.name
    // })
    this.setData({
      id: options.id,
      title: options.title,
      name: options.name
    })
    var test = [];
    let title_id = parseInt(id);


    //修改请求位置
    // var request = function (title_id) {
    //   wx.request({
    //     url: urlList,
    //     header: {
    //       'Content-Type': 'application/json'
    //     },
    //     method: 'POST',
    //     data: {
    //       "title_id": title_id
    //     },
    //     success: function (res) {

    //       for (var i = 0; i < res.data.content.length; i++) {
    //         //magzineList.push(res.data.content[i].list_title);
    //         magzineList.push(res.data.content[i].toString());
    //       }
    //       that.setData({
    //         List: magzineList,
    //         ListTitle: magzineList
    //       });
    //       that.data.List = magzineList;
    //       app.BASEList = magzineList;
    //       test = magzineList;
    //     },
    //   })
    // };
    // wx.GetMagazineListTest({

    // })

    //console.log(test);
    var a=GetMagazineListTest(this, options.id);
    console.log(a);
    //console.log(GetMagazineList(this, options.id));
    GetMagazineContent(this, options.id);
    //console.log(ListTitle);
    
    //console.log(app.BASEList);
    // that.setData({
    //   All: [{ Title: List, content: Content }],
    //   AllList: All
    // })
    // console.log("AAAAA");
    //console.log(that.data.List);

    var self = this;
    
  },
  handlerStart(e) {
    let { clientX, clientY } = e.touches[0];
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.tapStartTime = e.timeStamp;
    this.startX = clientX;
    this.data.ui.tStart = true;
    this.setData({ ui: this.data.ui })
  },
  handlerMove(e) {
    let { clientX } = e.touches[0];
    let { ui } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    ui.offsetLeft -= offsetX;
    if (ui.offsetLeft <= 0) {
      ui.offsetLeft = 0;
    } else if (ui.offsetLeft >= ui.menuWidth) {
      ui.offsetLeft = ui.menuWidth;
    }
    this.setData({ ui: ui })
  },
  handlerCancel(e) {
    // console.log(e);
  },
  handlerEnd(e) {
    this.data.ui.tStart = false;
    this.setData({ ui: this.data.ui })
    let { ui } = this.data;
    let { clientX, clientY } = e.changedTouches[0];
    let endTime = e.timeStamp;
    //快速滑动
    if (endTime - this.tapStartTime <= FAST_SPEED_SECOND) {
      //向左
      if (this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
        ui.offsetLeft = 0;
      } else if (this.tapStartX - clientX < -FAST_SPEED_DISTANCE && Math.abs(this.tapStartY - clientY) < FAST_SPEED_EFF_Y) {
        ui.offsetLeft = ui.menuWidth;
      } else {
        if (ui.offsetLeft >= ui.menuWidth / 2) {
          ui.offsetLeft = ui.menuWidth;
        } else {
          ui.offsetLeft = 0;
        }
      }
    } else {
      if (ui.offsetLeft >= ui.menuWidth / 2) {
        ui.offsetLeft = ui.menuWidth;
      } else {
        ui.offsetLeft = 0;
      }
    }
    this.setData({ ui: ui })
  },
  handlerPageTap(e) {
    let { ui } = this.data;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui })
    }
  },
  handlerAvatarTap(e) {
    let { ui } = this.data;
    if (ui.offsetLeft == 0) {
      ui.offsetLeft = ui.menuWidth;
      this.setData({ ui: ui })
    }
  },
  handlerScroll: function (event) {
    //  该方法绑定了页面滚动时的事件
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  // GetFresh: function (e) {
  //   var that = this;
  //   var title = e.currentTarget.id;
  //   GetMagazineContentByTitle(that, title);
  // },
  handlerAvatarTap2(e) {
    var that = this;
    let { ui } = this.data;
    var title = e.currentTarget.id;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui })
      GetMagazineContentByTitle(that, title);
    }
  },
})
