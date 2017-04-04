//index.js
//获取应用实例
var app = getApp(),
    sd = new Date(),
    sdY = sd.getFullYear(),
    sdM = sd.getMonth() - 10 > 0 
    ? sd.getMonth() + 1 
    : "0" + (sd.getMonth() + 1),
    sdD = sd.getDate() -10 > 0
    ? sd.getDate()
    : "0" + sd.getDate(),
    sdFull = sdY + "-" + sdM + "-" + sdD,
    edFull = (sdY + 3) + "-" + sdM + "-" + sdD;

Page({
  data: {
    "greet": "朋友好",
    "motto": {
        detail: "生活就像海洋，只有意志坚强的人才能到达彼岸。",
        author: "佚名",
        source: " "
    },
    "diyTitle": "私人の定制",
    "qtdate": "2017-04-04",
    "stdate": "2017-04-04",
    "startDate": "2017-04-04",
    "endDate": "2018-04-04",
    "angle": 45,
    "open": false
  },
  bindanglechange: function(){
    if(this.data.angle === 45){
      this.setData({
            angle : 135,
            open: true
        });
    }else{
      this.setData({
            angle : 45,
            open: false
        });
    }
        
  },
  //日期picker处理函数
  bindqtdateChange: function (e) {
      this.setData({
          qtdate: e.detail.value
       })
  },
  bindstdateChange: function (e) {
      this.setData({
           stdate: e.detail.value
      })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })
    this.setData({
      startDate: sdFull,
      endDate: edFull
    })
  }
})
