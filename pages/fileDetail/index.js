// index.js
const {taskDetail} = require('../../api/index')
Page({
  data:{
    list:[],
    title:'',
    id: '',
    fileUrl: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: options.title+'详情',
    })
    this.setData({
        id: options.id,
        fileUrl: options.url
    })
    if(options.id){
        this.getFileDetail()
    }
  },
  onShow: function(){
    // wx.setNavigationBarTitle({
    //     title: this.data.title
    // })
  },
  getFileDetail(){
    taskDetail({
        param: this.data.id
    })
  }
})
