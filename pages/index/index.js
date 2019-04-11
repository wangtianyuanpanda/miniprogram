//index.js
//获取应用实例
const app = getApp();
import { cities } from '../../static/js/city';

Page({
  data: {
      motto: 'YummyMap',
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      mainTitle: 'YummyMap',
      titleLocation: '杭州',
      cities : [],
      showCities: false,
      back: '返回',
      author: 'Designed by 胖达人'

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
    onReady: function () {
      this.initCities();
    },
    initCities: function () {
        let storeCity = new Array(26);
        const words = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        words.forEach((item,index)=>{
            storeCity[index] = {
                key : item,
                list : []
            }
        })
        cities.forEach((item)=>{
            let firstName = item.pinyin.substring(0,1);
            let index = words.indexOf( firstName );
            storeCity[index].list.push({
                name : item.name,
                key : firstName
            });
        })
        this.data.cities = storeCity;
        this.setData({
            cities : this.data.cities
        })
    },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
    toggleCity: function () {
      let visible = !this.data.showCities;
      console.log(visible)
      this.setData({showCities: visible});
    },
    onCityChange: function (e) {
        this.setData({
            titleLocation: e.currentTarget.dataset.name,
            showCities: false
        })
    }
})
