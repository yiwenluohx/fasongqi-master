// index.js
const {getUserInfo,getPhoneNumber,updateUserInfo} = require('../../api/index')
Page({
  data:{
    userInfo:null,
    avatarUrl: null,
    nickName: null,
  },
  onLoad: function (options) {
  },
//   获取头像
onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
//   获取昵称
nicknameBlur(e){
    this.setData({
        nickName: e.detail.value,
    })
},
//   更新个人信息
updateUserInfo(){
    updateUserInfo({
        avatarUrl: this.data.userInfo.avatar,
        nickName:this.data.userInfo.nickName,
    }).then(res=>{
        if(res.code == 0){
            wx.navigateBack()
        }
    })
},
//   授权登陆
  authLogin(){
    wx.getUserProfile({
        desc: '获取你的昵称、头像、地区及性别', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
            let _this = this
            wx.login({
              success: (data) => {
                if(data.code){
                    getUserInfo({
                        avatarUrl:res.userInfo.avatarUrl,
                        nickName:res.userInfo.nickName,
                        jsCode:data.code
                    }).then(result=>{
                        if(result.code == 0){
                            wx.setStorageSync('userInfo', result.data)
                            _this.setData({
                                userInfo: result.data,
                            })
                            _this.updateUserInfo()
                        }else{
                            wx.showToast({
                                title: '登录失败，请重试！',
                            })
                        }
                    })

                }
              },
            })
        }
    })
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
                        })
                        // _this.authLogin()
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
})
