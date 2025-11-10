// index.js
const {base,infringementDetection}  = require('../../api/index.js')
const {formatDate} = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base:base,
    companyName: '',
    linkMan: '',
    mobile: '',
    detectionContent:'',
    fileName:'',
    fileUrl:'',
    imgList:[],
    picList:[],
    nowDate: '',
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          nowDate: formatDate(new Date())
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
//公司名称
companyInput(e){
    this.setData({
      companyName: e.detail.value
    })
},

//联系人
linkManInput(e){
  this.setData({
    linkMan: e.detail.value
  })
},
//手机号
mobileInput(e){
    this.setData({
      mobile: e.detail.value
    })
},

// 品牌检测内容
textareaAInput:function(e){
  this.setData({
    detectionContent:e.detail.value
  })
},

//   文件上传
  doUploadFile:function(){
    let _this = this;
    wx.chooseMessageFile({
      type: 'file',
      success (res) {
        const tempFilePaths = res.tempFiles
        wx.uploadFile({
          url: base+"/api/common/upload/tool",
          filePath: tempFilePaths[0].path,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success (res){
            const data = res.data;
            _this.setData({
              fileName: tempFilePaths[0].name,
              fileUrl : JSON.parse(data).data[0]
            })
          }
        })
      }
    })
  },

//   提交
  doSubmit:function(e){
    if(!wx.getStorageSync('userInfo').token){
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
      setTimeout(() => {
        wx.navigateTo({
            url: '/pages/authLogin/index',
        })
      }, 1500);
      return;
    }
  
    if(this.data.companyName == ''){
        wx.showToast({
          title: '请填写公司名称',
          icon:'none'
        })
        return;
    }
    if(this.data.linkMan == ''){
        wx.showToast({
          title: '请填写联系人',
          icon:'none'
        })
        return;
    }
    if(this.data.mobile==""){
        wx.showToast({
          title: '请填写手机号码',
          icon:'none'
        })
        return;
    }
    if(this.data.detectionContent==""){
      wx.showToast({
        title: '请填写检测内容',
        icon:'none'
      })
      return;
    }
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })  

    infringementDetection({
      companyName: _this.data.companyName,
      linkMan: _this.data.linkMan,
      mobile: _this.data.mobile,
      detectionContent: _this.data.detectionContent,
    }).then(res=>{
      wx.hideLoading({
        success: (res) => {},
      })
      if(res.code == 0){
        wx.showToast({
          title: '提交成功!',
          duration:2000,
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1000);
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  },
//   图片上传
  ChooseImage() {
    let _this = this
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }

        var iList = []
  
        this.data.imgList.forEach((item , index)=>{
          wx.uploadFile({
            //上传图片的网路请求地址
            url: base+"/api/common/upload/tool",
            //选择
            filePath: item,
            name: 'file',
    
            success: function (res) {
              _this.data.picList[index] = JSON.parse(res.data).data[0]
            },
            fail: function (res) {
              console.log("error");
            }
          });
        })
      }
      
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '删除图片',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.data.picList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList,
            picList:this.data.picList
          })
        }
      }
    })
  },

})