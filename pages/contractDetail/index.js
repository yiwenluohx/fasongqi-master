// index.js
const {base,templateDetail,templateDownload,userInfo} = require('../../api/index')
global.newPage({
  data:{
    list:[],
    base: base,
    templateId: '',
    detail: null,
    userInfo: null,
    userDownloadNums: 0,
    fileUrl: '',
  },
  onLoad: function (options) {
      this.setData({
        templateId: options.id,
      })
      this.getTemplateDetail()
  },
  onShow: function () {
    this.setData({
        userInfo: wx.getStorageSync('userInfo')
    })
    
  },
//   获取合同详情
  getTemplateDetail(){
    templateDetail({
        param: this.data.templateId
    }).then(res=>{
        if(res.code == 0){
            this.setData({
                detail: res.data
            })
        }
    })
  },

  downloadDocDisclaimers(){
    let _this = this
    wx.showModal({
      title: '下载声明',
      content: '本模板可能不适用您,请谨慎下载',
      success: function(res) {
        if (res.confirm) {
          // 用户点击确定
          _this.downloadDoc();
        } else if (res.cancel) {
          // 用户点击取消
          console.log('用户取消上传');
        }
      }
    });
  },

//   下载文档
    async downloadDoc(){
        if(!wx.getStorageSync('userInfo').token){
            wx.navigateTo({
                url: '/pages/authLogin/index',
            })
        }else{
            // 已经登陆，获取用户信息，拿到下载次数
            let res = await userInfo()
            if(res.code == 0){
                if(res.data.isVip || res.data.downloadNum != 0){
                    // 下载
                    this.getTemplateDownload()
                }else{
                    wx.showToast({
                        icon: 'none',
                        title: '先去签到获取下载次数吧！'
                    })
                }
            }
            
        }
    },
    // 掉接口
    getTemplateDownload(){
        templateDownload({
            param: this.data.templateId
        }).then(res=>{
            if(res.code == 0){
                this.setData({
                    fileUrl: res.data
                })
                this.downloadFile()
            }else{
                wx.showToast({
                    icon: 'none',
                    title: res.data
                })
            }
        })
    },
    // 下载事件
    downloadFile(){
        wx.downloadFile({
            url: this.data.base + this.data.fileUrl, //仅为示例，并非真实的资源
            success(res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                const filePath = res.tempFilePath;
                wx.openDocument({
                  filePath: filePath,
                  showMenu: true,
                  success: function (res) {}
                })
              }
            }
        })
    }
})
