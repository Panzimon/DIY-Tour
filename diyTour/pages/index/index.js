//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    "greet": "您好~",
    "motto": {
        detail: "生活就像海洋，只有意志坚强的人才能到达彼岸。",
        author: "佚名",
        source: " "
    },
    "diyTitle": "私人の定制"

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
  }
})
