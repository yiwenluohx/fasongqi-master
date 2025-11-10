// index.js
const {base,fileManage} = require('../../api/index')
Page({
  data:{
    base: base,
    list:[],
    pageNum:1,
    pageSize:10,
    isAll: false,
    total: '',
    moreTxt:''
  },
  onLoad: function (options) {
    this.getFileManageList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.isAll) return;
        this.data.pageNum++
        this.getFileManageList();
  },
  getFileManageList(){
    fileManage({
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
  previewFile(e){
    wx.downloadFile({//下载对应文件
        url: this.data.base + e.currentTarget.dataset.url,
        success: function (res) {    
          var filePath = res.tempFilePath;//文件路径    
          wx.openDocument({
            filePath: filePath,   // 装载对应文件的路径
            // fileType: 'docx',   // 指定打开的文件类型
            showMenu: true,       // 右上角的菜单转发分享操作
            success: function (res) {
              console.log("打开成功");
            },
            fail: function (res) {
              console.log(res);
            }
          })   
        },
        fail: function (res) {
          console.log(res);
        }
    })
  },
  
})
