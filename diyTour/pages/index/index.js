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
    "open": false,
    "daynum": 1,
    "pernum": 1,
    "tel": null,
    "validate": false,
    "letter": 0
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
  //验证联系方式
  bindvalidate: function(e){
      var value = e.detail.value;
      //todo
      if(value !== undefined){
        this.setData({
          validate: true
        });
        if(/^\d{11}$/.test(value)){
          this.setData({
            tel: value,
            warnType: "success"
        })
        }else{
          this.setData({
            warnType: "warn"
          })
        }
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
  //数量变化处理
  changeNum: function(e){
    var num = e.currentTarget.dataset.num,
        type = e.currentTarget.dataset.type,
        numchanged;
    if(type === "day"){
      numchanged = this.data.daynum + parseInt(num);
      if(numchanged < 1) numchanged++;
      this.setData({
           daynum: numchanged
      })
    }else{
      numchanged = this.data.pernum + parseInt(num);
      if(numchanged < 1) numchanged++;
      this.setData({
          pernum: numchanged
      })
    }
  },
  //文本域字数限制
  bindletter: function(e){
    var letnum = e.detail.value.length;
    this.setData({
          letter: letnum
      })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },
  //帮助提示
  showhelp: function(){
    //todo
  },
  //提交定制需求
  submitAll: function(){
    //todo
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
