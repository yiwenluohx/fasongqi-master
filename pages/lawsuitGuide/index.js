// index.js
const {lawsuitGuide}  = require('../../api/index')
Page({
  setTabIndex(e){
    let activeIndex = e.currentTarget.dataset.i;
    this.setData({
      activeIndex
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    activeIndex:0,
    numList:[],
    activeKey:'0-0-0',
    currentIndex: "0-0-0",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.postLiucList()
  },
  postLiucList: function () {
    let _this = this
    lawsuitGuide().then((res) => {
      this.setData({
        numList: res.data
      })
    })
  },
  shghnn:function(e){
    this.setData({
      activeKey:e.target.dataset.key,
      currentIndex: e.currentTarget.dataset.key
    })
},
onTitleTap(e) {
  this.setData({
    currentIndex: e.currentTarget.dataset.key
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})