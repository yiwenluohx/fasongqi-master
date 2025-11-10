// index.js
const {base,userInfo} = require('../../api/index')
global.newPage({
  data: {
    tabs: [
      {
        id: 0,
        image: '/static/fawu/hetongshencha.png',
        title: '合同审查管理',
        url: '/pages/contractReview/index',
        isLogin: true,
      },

      {
        id: 1,
        image: '/static/fawu/shenfenheshi.png',
        title: '被告身份核实',
        url: '/pages/IdVerification/index',
        isLogin: true,
      },
      {
        id: 2,
        image: '/static/fawu/daixie.png',
        title: '代写法律文书',
        url: '/pages/legalWriting/index',
        isLogin: true,
      },
      {
        id: 3,
        image: '/static/fawu/jisuan.png',
        title: '诉讼费用计算',
        url: '/pages/lawsuitCost/index'
      },
      {
        id: 4,
        image: '/static/fawu/zhidao.png',
        title: '诉讼流程指导',
        url: '/pages/lawsuitGuide/index'
      },
      {
        id: 5,
        image: '/static/fawu/zixun.png',
        title: '律师咨询协助',
        url: '/pages/attorneys/index'
      }, {
        id: 6,
        image: '/static/fawu/jiance.png',
        title: '品牌侵权监测',
        url: '/pages/jiance/index'
      },
      {
        id: 7,
        image: '/static/fawu/yujing.png',
        title: '企业合规预警',
        url: '/pages/enterpriseWarn/index',
        isLogin: true,
      }
    ],
    list:[
      {
        id: 0,
        image: '/static/vip/zixun.png',
        content: '免费法律咨询\n1分钟快速接通',
        width: '44rpx',
        height: '46rpx'
      },
      {
        id: 1,
        image: '/static/vip/hetong.png',
        content: '海量合同库无限下载使用',
        width: '42rpx',
        height: '46rpx'
      },
      {
        id: 2,
        image: '/static/vip/loudong.png',
        content: '合同审查规避潜在风险漏洞',
        width: '51rpx',
        height: '46rpx'
      },
      {
        id: 3,
        image: '/static/vip/dingzhi.png',
        content: '合同量身定制专属又专业',
        width: '48rpx',
        height: '46rpx'
      },
      {
        id: 4,
        image: '/static/vip/hetong.png',
        content: '法律文书拟写线上立案无忧',
        width: '42rpx',
        height: '46rpx'
      },
      {
        id: 5,
        image: '/static/vip/fuwu.png',
        content: '增值服务享市场价7-8折优惠',
        width: '59rpx',
        height: '46rpx'
      },
      {
        id: 6,
        image: '/static/vip/dingzhi.png',
        content: '商标、专利数据检索',
        width: '53rpx',
        height: '46rpx'
      },
      {
        id: 7,
        image: '/static/vip/jiance.png',
        content: '知识产权法律状态监测',
        width: '53rpx',
        height: '46rpx'
      },
      {
        id: 8,
        image: '/static/vip/fengxian.png',
        content: '企业合规风险排查',
        width: '54rpx',
        height: '46rpx'
      },
      {
        id: 9,
        image: '/static/vip/zhidao.png',
        content: '合规评估、咨询指导',
        width: '40rpx',
        height: '40rpx'
      },
      {
        id: 10,
        image: '/static/vip/dingzhi.png',
        content: '更多服务查看服务详情',
        width: '40rpx',
        height: '40rpx'
      },
    ],
    userInfo: null
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    // this.setData({ userInfo: wx.getStorageSync('userInfo') });
    this.getUserInfo()
  },
  tabClick(e) {
    console.log(wx.getStorageSync('userInfo'), 'userInfo')
    if (e.currentTarget.dataset.islogin) {
      if (!wx.getStorageSync('userInfo').token) {
        wx.navigateTo({
          url: '/pages/authLogin/index',
        })
      } else {
        let url = e.currentTarget.dataset.url
        wx.navigateTo({
          url: url,
        })
      }
    } else {
      let url = e.currentTarget.dataset.url
      wx.navigateTo({
        url: url,
      })
    }
  },
  //获取用户信息
  async getUserInfo(){
    let user = wx.getStorageSync('userInfo');
    if(user != null){
      let res = await userInfo()
      console.log(res)
        if(res.code == 0){
          wx.setStorageSync('userInfo', res.data)
          this.setData({userInfo:res.data});
      }
    }
  },
  handleContact(e){
    console.log(e.detail)
  }
})
