// index.js
const {base,getUserInfo,getPhoneNumber,updateUserInfo} = require('../../api/index')
Page({
  data:{
    base:base,
    userInfo:null,
    avatarUrl: null,
    nickName: null,
  },
  onLoad: function (options) {
  },
//   获取头像
onChooseAvatar(e) {
    let _this = this
    wx.uploadFile({
        url: base+"/api/common/upload/tool",
        filePath: e.detail.avatarUrl ,
        name: 'file',
        formData: {
          'user': 'test'
        },
        success (res){
            const data = res.data;
            _this.setData({
                avatarUrl: _this.data.base + JSON.parse(data).data[0],
            })
        }
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
        avatarUrl: this.data.avatarUrl,
        nickName:this.data.nickName,
    }).then(res=>{
        if(res.code == 0){
            wx.navigateBack()
        }
    })
},
//   授权登陆
  authLogin(){
    let _this = this
    wx.login({
        success: (data) => {
        if(data.code){
            getUserInfo({
                avatarUrl: this.data.avatarUrl,
                nickName: this.data.nickName,
                jsCode:data.code
            }).then(result=>{
                if(result.code == 0){
                    wx.setStorageSync('userInfo', result.data)
                    
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
