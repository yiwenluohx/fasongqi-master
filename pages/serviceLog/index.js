// index.js
const {serveRecord} = require('../../api/index')
Page({
  data:{
    list:[
    ],
    pageNum:1,
    pageSize:10,
    isAll: false,
    total: '',
    moreTxt: ''
  },
  onLoad: function (options) {
      this.getServeiceList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.isAll) return
    this.data.pageNum++
    this.getServeiceList();
  },
  getServeiceList(){
    serveRecord({
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
    }).then(res=>{
        if(res.code == 0){
            let newlist = this.data.list.concat(res.data.records);
            this.setData({
                total: res.data.total,
                list: newlist //这里是重点
            })
            // 判断是否加载完毕
            if (newlist.length >= res.data.total) { //这里是重点
                this.setData({
                    isAll: true, //这里是重点
                    moreTxt: '-无更多数据-'
                })
            }
        }
    })
  },
  toDetail(e){
    wx.navigateTo({
      url: `/pages/fileDeliveryDetail/index?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}&status=${e.currentTarget.dataset.status}`,
    })
  }
})
