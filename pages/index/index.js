// index.js
const {tipsList} = require('../../api/index')

global.newPage({
  data:{
    tipsList: [],
    tabs:[
      {
        id: 1,
        image: '/static/jinrong.png',
        title: '金融债务',
        url: '/pages/newsList/index'
      },
      
      {
        id: 2,
        image: '/static/zhaiquan.png',
        title: '债权债务',
        url: '/pages/newsList/index'
      },
      {
        id: 3,
        image: '/static/hetong.png',
        title: '合同欠款',
        url: '/pages/newsList/index'
      },
      {
        id: 4,
        image: '/static/jiufen.png',
        title: '劳动纠纷',
        url: '/pages/newsList/index'
      },
      {
        id: 5,
        image: '/static/tiaojie.png',
        title: '调解中心',
        url: '/pages/newsList/index'
      },
      {
        id: 6,
        image: '/static/download.png',
        title: '合同模板下载',
        url: '/pages/contractDownload/index'
      }
    ]
  },
  onLoad: function (options) {
      this.getTipsList()
      // wx.showShareMenu({
      //   withShareTicket: true,
      //   menus: ['shareAppMessage', 'shareTimeline']
      // })
  },
  // onShareAppMessage: function () {
  //   return {
  //     title: '分享好友',
  //     path: '/index/index?id=123'
  //   }
  // },
  // onShareTimeline: function () {
  //   return {
  //     title: '分享朋友圈',
  //     path: '/index/index?id=123'
  //   }
  // },
//   获取消息提示列表
  getTipsList(){
    tipsList().then(res=>{
        if(res.code == 0){
            this.setData({
                tipsList: res.data
            })
        }
    })
  },
  tabClick(e){
    let url  = `${e.currentTarget.dataset.url}?title=${e.currentTarget.dataset.title}&caseType=${e.currentTarget.dataset.id}`
    wx.navigateTo({
      url: url,
    })
  }
})
