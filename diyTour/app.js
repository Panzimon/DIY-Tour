//app.js
App({
  onLaunch: function () {

    console.log('App Launch')
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var self = this;
    var sessionId = wx.getStorageSync('sessionId');
    console.log('sessionId', sessionId ? 'yoyoyo ~' : 'muyou ~')
    if (!sessionId) {
      self.login();
    } else {
      wx.checkSession({
        success: function () {
          // 登录态未过期
          console.log('登录态未过期')
          self.sessionId = sessionId;
          console.log('sessionId', sessionId ? 'yoyoyo ~' : 'muyou ~');
        },
        fail: function () {
          //登录态过期
          self.login();
        }
      })
    }
  },
  sessionId: '',
  getUserInfo: function () {
    var that = this;
    //调用登录接口
    wx.getUserInfo({
      success: function (res) {
        that.globalData = res;
        wx.setStorageSync('userInfo', that.globalData.userInfo);
        that.globalData.code = wx.getStorageSync('code');
        //console.log(that.globalData);
        wx.request({
          url: 'https://www.cooode.cn/weixin/donkey/user/code2session',
          data: that.globalData,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'charset': 'utf-8'
          }, // 设置请求的 header
          success: function (res) {
            // success
            console.log(res.data.status);
            that.globalData.sessionId = res.data.msg;
            wx.setStorageSync('sessionId', res.data.msg);
          },
          fail: function (res) {
            // fail
            console.log(res.data.status);
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    code: ''
  },
  login: function () {
    var that = this;
    wx.login({
      success: function (resp) {
        var code = resp.code;
        wx.setStorageSync('code', code);
        console.log(code ? 'code yoyoyo~'
          : "no code");
        that.getUserInfo();
      }
    });
  }
})



