
var city = require('../utils/city.js');
var citylist = city.cityList;
var all = function () {
        var arr = [];
        citylist.forEach(function (obj) {
          obj.datas.forEach(function (data) {
            arr.push(data);
          });
        });
        return arr
      }();
Page({
  data: {
    list: [],
    all: [],
    alpha: '',
    windowHeight: '',
    hisCity: '',
    isShowLetter: '',
    showLetter: '',
    showArr: false
  },
  onLoad(options) {
    try {
      var res = wx.getSystemInfoSync()
      var hisCity = wx.getStorageSync('destin') || '深圳';
      this.pixelRatio = res.pixelRatio;
      // this.apHeight = 32 / this.pixelRatio;
      // this.offsetTop = 160 / this.pixelRatio;
      this.apHeight = 15;
      this.offsetTop = res.windowHeight * 0.15;

      /*
      
      */

      this.setData({
        list: citylist,
        windowHeight: res.windowHeight + 'px',
        hisCity: hisCity
      })

    } catch (e) {
      wx.showModal({
        title: 'Oops~好像哪里出错了~',
        content: '请重新打开小程序',
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
  bindKeyInput: function (e) {

    var arr = all;
    console.log(all);

    var keystr = e.detail.value;
    var keyarr = [];

    arr.forEach(function (city) {
      if (city.indexOf(keystr) !== -1) {
        keyarr.push(city);
      }
    });
    //console.log(keyarr);
    if (keystr) {
      this.setData({
        all: keyarr,
        showArr: true
      });
    } else {
      this.setData({
        showArr: false
      });
    }
  },
  bindselectCity: function (e) {
    var selected = e.currentTarget.dataset.selectcity;
    wx.setStorage({
      key: 'destin',
      data: selected,
      success: function () {
        wx.navigateBack();
      },
      fail: function () {
        wx.showModal({
          title: 'Oops~好像哪里出错了~',
          content: '请重新选择城市',
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
  },
  clickLetter: function (e) {
    var showLetter = this.data.alpha || e.currentTarget.dataset.ap;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1500)
  },
  handlerAlphaTap(e) {
    let {ap} = e.target.dataset;
    this.setData({ alpha: ap });
  },
  handlerMove(e) {
    let {list} = this.data;
    let moveY = e.touches[0].clientY;
    let rY = moveY - this.offsetTop;
    if (rY >= 0) {
      let index = Math.ceil((rY - this.apHeight) / this.apHeight);
      if (0 <= index < list.length) {
        let nonwAp = list[index];
        nonwAp && this.setData({ alpha: nonwAp.alphabet });
      }
    }
  }
})