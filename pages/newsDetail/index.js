// index.js
const {caseDetail,addCaseAttention} = require('../../api/index')
global.newPage({
  data:{
    caseId: '',
    detail: '',
    desc: "",
  },
  onLoad: function (options) {
    this.setData({
        caseId: options.caseId
    })
    this.getCaseDetail()
  },
  getCaseDetail(){
    caseDetail({
        param: this.data.caseId
    }).then(res=>{
        if(res.code == 0){
          let txt = res.data.desc
          txt = txt.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
            this.setData({
                detail: res.data,
                desc: txt
            })
        }
    })
  },
  attentionClick(){
    addCaseAttention({
        param: this.data.caseId
    }).then(res=>{
        if(res.code == 0){
            wx.showToast({
                title: '关注成功!',
                duration:1000,
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
})
