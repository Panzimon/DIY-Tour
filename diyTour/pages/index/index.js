//index.js
//获取应用实例
var app = getApp(),
  sd = new Date(),
  sdY = sd.getFullYear(),
  sdM = sd.getMonth() - 10 > 0
    ? sd.getMonth() + 1
    : "0" + (sd.getMonth() + 1),
  sdD = sd.getDate() - 10 > 0
    ? sd.getDate()
    : "0" + sd.getDate(),
  sdFull = sdY + "-" + sdM + "-" + sdD,
  edFull = (sdY + 3) + "-" + sdM + "-" + sdD;

Page({
  data: {
    "greet": "您好",
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
    "open": false,
    "daynum": 1,
    "pernum": 1,
    "tel": null,
    "validate": false,
    "letter": 0,
    "origin": "广州",
    "destination": "深圳",
    "comment": ""
  },
  onShow: function () {
    //origin,destin,early,late,days,number,phone,comment
    var origin = wx.getStorageSync('origin') || '广州',
      destination = wx.getStorageSync('destin') || '深圳',
      early = wx.getStorageSync('early') || '2017-04-23',
      late = wx.getStorageSync('late') || '2017-04-23',
      days = wx.getStorageSync('days') || 1,
      pnumber = wx.getStorageSync('number') || 1,
      phone = wx.getStorageSync('phone') ? wx.getStorageSync('phone') : '',
      comment = wx.getStorageSync('comment') ? wx.getStorageSync('comment') : '';
    this.setData({
      "origin": origin,
      "destination": destination,
      "qtdate": early,
      "stdate": late,
      "daynum": days,
      "pernum": pnumber,
      "tel": phone,
      "comment": comment
    })
    //console.log(origin,destination,early,late,days,pnumber,phone,comment);
  },
  bindanglechange: function () {
    if (this.data.angle === 45) {
      this.setData({
        angle: 135,
        open: true
      });
    } else {
      this.setData({
        angle: 45,
        open: false
      });
    }

  },
  //验证联系方式
  bindvalidate: function (e) {
    var value = e.detail.value + "";
    //todo
    if (value !== undefined) {
      this.setData({
        validate: true
      });
      if (/^1[34578]\d{9}$/.test(value)) {
        this.setData({
          tel: value,
          warnType: "success"
        });
        wx.setStorageSync('phone', value);
      } else {
        this.setData({
          warnType: "warn"
        })
        wx.setStorageSync('phone', value);
      }
    }
  },
  //日期picker处理函数
  bindqtdateChange: function (e) {
    wx.setStorageSync('early', e.detail.value);
    this.setData({
      qtdate: e.detail.value
    })
  },
  bindstdateChange: function (e) {
    wx.setStorageSync('late', e.detail.value);
    this.setData({
      stdate: e.detail.value
    })
  },
  //数量变化处理
  changeNum: function (e) {
    var num = e.currentTarget.dataset.num,
      type = e.currentTarget.dataset.type,
      numchanged;
    if (type === "day") {
      numchanged = this.data.daynum + parseInt(num);
      if (numchanged < 1) numchanged++;
      this.setData({
        daynum: numchanged
      })
      wx.setStorageSync('days', numchanged);
    } else {
      numchanged = this.data.pernum + parseInt(num);
      if (numchanged < 1) numchanged++;
      this.setData({
        pernum: numchanged
      })
      wx.setStorageSync('pnumber', numchanged);
    }
  },
  //文本域字数限制
  bindletter: function (e) {
    var letnum = e.detail.value.length;
    this.setData({
      letter: letnum
    })
    wx.setStorageSync('comment', e.detail.value);
  },
  //事件处理函数
  /*
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  */
  //帮助提示
  showhelp: function () {
    wx.showModal({
      title: '客服电话☎',
      content: '18826139515',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '18826139515',
            success: function (res) {
              // success
              console.log('用户点击确定')
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //提交定制需求
  submitAll: function () {
    //origin,destin,early,late,days,number,phone,comment
    var origin = wx.getStorageSync('origin'),
      destination = wx.getStorageSync('destin'),
      early = wx.getStorageSync('early'),
      late = wx.getStorageSync('late'),
      days = wx.getStorageSync('days'),
      pnumber = wx.getStorageSync('number'),
      phone = wx.getStorageSync('phone'),
      comment = wx.getStorageSync('comment'),
      sessionId = wx.getStorageSync('sessionId');

    if (/^1[34578]\d{9}$/.test(phone)) {
      var submitObj = {
        origin: origin,
        destination: destination,
        early: early,
        late: late,
        days: days,
        number: pnumber,
        phone: phone,
        comment: comment,
        sessionId: sessionId
      };

      wx.request({
        url: 'https://www.cooode.cn/weixin/donkey/form/savePreferForm',
        data: submitObj,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "application/x-www-urlencoded",
          "charset": "utf-8"
        }, // 设置请求的 header
        success: function (res) {
          // success
          console.log(res.data)
          if (res.data.status) {
            wx.clearStorageSync();
            wx.showModal({
              title: '小鲜驴',
              content: '提交成功了哦~',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });

          } else {
            wx.showModal({
              title: '小鲜驴',
              content: '提交失败了呀...',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        },
        fail: function (res) {
          // fail
          console.log(res)
          wx.showModal({
            title: '小鲜驴',
            content: '提交失败了...',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '小鲜驴',
        content: '请检查电话等信息',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }


  },
  onLoad: function () {
    console.log('onLoad');
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      startDate: sdFull,
      endDate: edFull,
      userInfo: userInfo
    })
  },
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
        console.log(res, "分享成功")
      },
      fail: function (res) {
        // 分享失败
        console.log(res, "分享失败")
      }
    }
  }
})
