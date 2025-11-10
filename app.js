// app.js
const {addLogs} = require('./api/index')

global.newPage = function(obj) { 
  let defaultSet = {
     onShareAppMessage: function() {
        return { 
          title: '法颂契', 
          path: 'pages/index/index', 
          imageUrl: '' 
        } 
      }, 
      onShareTimeline: function() {
        return {
          title: '法颂契',
          path: '/pages/index/index'
        };
      },
      onShow() { 
        // do something
      } 
    } 
  return Page({...defaultSet, ...obj}) 
}
App({
  globalData: {
      userInfo: null
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // addLogs({
    //     moduleName: '首页',
    //     moduleType: 'home',
    //     pageName: '首页',
    //     startTime: Date.now(),
    //     endTime: Date.now()
    // }).then(res=>{
    //     console.log(res,'---home----')
    // })
    // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },

})
