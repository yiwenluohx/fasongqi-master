// index.js
const {base,taskDetail,taskConfirm,taskReject} =  require('../../api/index.js');
Page({
  data:{
    base: base,
    id:'',
    detail: null,
    isShowReject: false,
    rejectReason: '',
    status: ''
  },
  onLoad: function (options) {
      this.setData({
          id: options.id
      })
      this.getTaskDetail()
  },
  getTaskDetail(){
    taskDetail({
        param: this.data.id
    }).then(res=>{
        this.setData({
            detail: res.data
        })
    })
  },
//   预览
preview(){
    wx.downloadFile({//下载对应文件
        url: this.data.base + this.data.detail.deliverFile,
        success: function (res) {    
          var filePath = res.tempFilePath;//文件路径    
          wx.openDocument({
            filePath: filePath,   // 装载对应文件的路径
            // fileType: 'docx',   // 指定打开的文件类型
            showMenu: true,       // 右上角的菜单转发分享操作
            success: function (res) {
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
// 驳回
reject(){
    this.setData({
        isShowReject: !this.data.isShowReject
    })
},
reasonInput(e){
    this.setData({
        rejectReason: e.detail.value
    })
},
cancel(){
    this.setData({
        isShowReject: false
    })
},
rejectCommit(){
    taskReject({
        taskId: this.data.id,
        rejectReason: this.data.rejectReason
    }).then(res=>{
        this.setData({
            isShowReject: false
        })
        wx.navigateBack()
    })
},
// 确认
  confirm(){
    taskConfirm({
        param: this.data.id
    }).then(res=>{
        wx.navigateBack()
    })
  },
    //   下载
    downloadFile(){
      wx.downloadFile({//下载对应文件
        url: this.data.base + this.data.detail.deliverFile,
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
    }
})
