const { getPhoneNumber } = require("../../api/index");
// index.js
global.newPage({
  data:{
    content1:[
      {
        id: 0,
        image: '/static/wenjian.png',
        title: '文件交付',
        url: 'pages/fileDelivery/index',
        isLogin: true,
      },
      {
        id: 1,
        image: '/static/record.png',
        title: '我的服务记录',
        url: 'pages/serviceLog/index',
        isLogin: true,
      },
      {
        id: 2,
        image: '/static/file.png',
        title: '文件管理库',
        url: 'pages/fileManage/index',
        isLogin: true,
      },
    ],
    content2:[
      {
        id: 0,
        image: '/static/contact.png',
        title: '联系客服',
        // url: 'pages/attorneys/index',
        isLogin: false,
        mobile: '15210649756'
      },
      {
        id: 1,
        image: '/static/aboutUs.png',
        title: '关于我们',
        url: 'pages/aboutUs/index',
        isLogin: false,
      },
    ],
    userInfo: null,
    bindPhone: false,
  },
  onShow: function () {
    this.setData({userInfo:wx.getStorageSync('userInfo')});

    if(this.data.userInfo.mobile=='' && this.data.userInfo){
      this.setData({
        bindPhone: true
      })
    }
  },
  // 授权登陆
  authLoginCli(){
    this.login()
  },
  // 绑定手机号
  getPhoneNumber (e) {
    let _this = this
    wx.login({
        success:function(result){
            let jsCode = result.code;
            getPhoneNumber({
                iv:e.detail.iv,
                data:e.detail.encryptedData,
                jsCode:jsCode,
            }).then((res)=>{
                if(res.code == 0 && res.data.mobile){
                    wx.setStorageSync('userInfo', res.data)
                    _this.setData({
                        userInfo:res.data,
                        bindPhone: false//已绑定
                    })
                }else{
                    wx.showToast({
                        icon:'none',
                        title: res.msg,
                    })
                }
            })
        }
    })
      
  },
  // 列表点击
  handleClick(e){
    if(e.currentTarget.dataset.islogin){
        this.login();
    }
    if(e.currentTarget.dataset.mobile){
        // wx.makePhoneCall({
        //     phoneNumber: e.currentTarget.dataset.mobile 
        // })
    }
    
    let url  = `/${e.currentTarget.dataset.url}`
    wx.navigateTo({
      url: url,
    })
  },
  handleContact(e){
    console.log(e.detail)
  },
  // 签到
  signInCli(){
    if(!wx.getStorageSync('userInfo').token){
        wx.navigateTo({
            url: '/pages/authLogin/index',
        })
        return;
    }
    wx.navigateTo({
      url: '/pages/sign/index',
    })
  },
  // 开通VIP
  openVipCli(){
    wx.navigateTo({
      url: '/pages/vip/index',
    })
  },
//   先授权
  login(){
    if(!wx.getStorageSync('userInfo').token){
          wx.navigateTo({
            url: '/pages/authLogin/index',
          })
      }else if(this.data.userInfo.token && !this.data.userInfo.mobile){
          this.setData({
              bindPhone: true
          })
      }
  }
})
