// index.js
const {base,dropDownList,legalCreate}  = require('../../api/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [],
    industryList:[],
    industryIndex: '',
    typeIndex: '',
    industryDefault:'请选择',
    typeDefault:'请选择',
    base:base,
    fileName:'',
    fileUrl:'',
    miaoshu:'',
    imgList:[],
    background_content:'',
    picList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndustryList();
    this.getTypeList();
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
//   获取企业合规类型
  getTypeList:function(){
    let _this = this;
    dropDownList({
        param: 'clue_enterprise_rule'
    }).then(res=>{
      if(res.code == 0){
        _this.setData({typeList: res.data});
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  },
//   获取所属行业
  getIndustryList:function(){
    let _this= this;
    dropDownList({
        param: 'clue_enterprise_industry'
    }).then((res)=>{
      if(res.code == 0){
        _this.setData({industryList: res.data});
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
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
//   委托方及特别需求输入
  textareaAInput:function(e){
    this.setData({
      miaoshu:e.detail.value
    })
  },
//   合同背景输入
  backgroundInput:function(e){
    this.setData({
      background_content:e.detail.value
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
    if(this.data.industryIndex == ''){
      wx.showToast({
        title: '请选择所属行业',
        icon:'none'
      })
      return;
    }
    if(this.data.typeIndex == ''){
      wx.showToast({
        title: '请选择合规类型',
        icon:'none'
      })
      return;
    }
    if(this.data.background_content == ''){
        wx.showToast({
          title: '请填写企业背景',
          icon:'none'
        })
        return;
    }
    if(this.data.miaoshu==""){
      wx.showToast({
        title: '请填写委托方及特别需求',
        icon:'none'
      })
      return;
    }
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })  
   
    legalCreate({
      clueType: _this.data.typeList[_this.data.typeIndex].itemValue,//企业合规类型
      belongType: _this.data.industryList[_this.data.industryIndex].itemValue,//所属行业
      bgDesc: _this.data.background_content,
      desc: _this.data.miaoshu,//委托方及特别需求
      fileUrl: _this.data.fileUrl,
      picList: _this.data.picList,
      source: 1, //0: 合同审查 1: 企业合规预警 2: 法律文书
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
//   所属行业切换
  bindIndustryChange:function(e){
    let array = this.data.industryList;
    this.setData({
      industryIndex:e.detail.value,
      industryDefault:array[e.detail.value].itemName
    })
  },
//   合同类型切换
  bindTypeChange:function(e){
    let array = this.data.typeList;
    this.setData({
      typeIndex:e.detail.value,
      typeDefault:array[e.detail.value].itemName
    })
  },
  chooseImageWithConfirmation(){
    let _this = this
    wx.showModal({
      title: '提示',
      content: '每次最多选4张图片,多次选择可上传更多图片',
      success: function(res) {
        if (res.confirm) {
          // 用户点击确定
          _this.chooseImage();
        } else if (res.cancel) {
          // 用户点击取消
          console.log('用户取消上传');
        }
      }
    });
  },
//   图片上传
  chooseImage() {
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