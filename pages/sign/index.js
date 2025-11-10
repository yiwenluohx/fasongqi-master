// index.js
const {signList,signIn} = require('../../api/index')
const {formatDate} = require('../../utils/util')
global.newPage({
  data:{
    days:[],
    continueDays: 0,
    isShowRule: false,
    isShowSuccess: false,
    isSignToday: false,
    todayDate: '',
    downloadNum: 0,
  },
  onLoad: function (options) {
      this.setData({
        todayDate: formatDate(new Date())
      })
      this.getSignList()
  },
//   获取签到记录
  getSignList(){
      signList().then(res=>{
        if(res.code == 0){
            let allDay = this.data.continueDays
            res.data?.days.forEach(item=>{
                if(item.hasSignIn){
                    allDay++
                    if(item.signInDate == this.data.todayDate){
                        this.setData({
                            isSignToday: true
                        })
                    }
                    this.setData({
                        continueDays: allDay
                    })
                }
            })
            this.setData({
                days: res.data.days,
                downloadNum: res.data.downloadNum
            })
        }
      })
  },
  // 签到
  signInCli(){
    if(this.data.isSignToday) return
    signIn({
        signInDate: this.data.todayDate
    }).then(res=>{
        if(res.code == 0){
            this.data.days.forEach((item,index)=>{
                if(item.signInDate == this.data.todayDate){
                    let dayNum = this.data.continueDays + 1
                    this.setData({
                        isShowSuccess: true,
                        ['days['+index+'].hasSignIn']: true,
                        continueDays: dayNum,
                        isSignToday: true
                    })
                }
            })
        }
    })
  },
  // 关闭签到成功弹框
  closeSuccessModal(){
    this.setData({
      isShowSuccess: false
    })
  },
  // 查看规则
  rulesCli(){
       this.setData({
        isShowRule: true
       })
  },
  // 关闭规则
  closeModal(){
    this.setData({
      isShowRule: false
    })
  }
})
