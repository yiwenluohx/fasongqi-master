// index.js
const {base,contractTemplates,dropDownList,templateDownload} = require('../../api/index')
global.newPage({
  data:{
    base: base,
    typeList:[],
    typeIndex: '',
    typeValue: '',
    industryList:[],
    industryIndex: '',
    industryValue: '',
    docName: '',
    pageNum: 1,
    pageSize: 9,
    list: [],
    isAll: false,
    total: '',
    moreTxt: '',
  },
  onLoad: function (options) {
    this.getIndustryList(); 
    this.getTypeList()
    this.getContractTemplateList()
  },
//   文档类型切换
  bindTypeChange(e){
    this.setData({
        typeIndex: e.detail.value,
        typeValue: this.data.typeList[e.detail.value].itemValue
    })

    this.getContractTemplateList()
  },
//   行业领域切换
  bindIndustryChange(e){
    this.setData({
        industryIndex: e.detail.value,
        industryValue: this.data.industryList[e.detail.value].itemValue
    })
    this.getContractTemplateList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.isAll) return
    this.data.pageNum++
    this.getContractTemplateList();
  },
//   获取模版列表
  getContractTemplateList(){
      if(this.data.docName || this.data.typeValue || this.data.industryValue){
          this.setData({
            pageNum: 1,
            list: [],
            isAll: false,
            total: '',
          })
      }
    contractTemplates({
        docName: this.data.docName,
        contractType: this.data.typeValue,
        industryType: this.data.industryValue,
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
    }).then(res=>{
        if(res.code ==  0){
            let newlist = this.data.list.concat(res.data.records);
            this.setData({
                total: res.data.total,
                list: newlist
            })
            // 判断是否加载完毕
            if (newlist.length >= res.data.total) {
                this.setData({
                    isAll: true,
                    moreTxt: '-无更多数据-'
                })
            }
        }
    })
  },
//   点击进入详情
itemClick(e){
    wx.navigateTo({
      url: `/pages/contractDetail/index?id=${e.currentTarget.dataset.id}`,
    })
},
// 回车搜索
searchHandle(e){
    this.setData({
        docName: e.detail.value
    })
    this.getContractTemplateList()
},
//   获取文档类型
  getTypeList(){
    dropDownList({
        param: 'contract_template_type'
    }).then((res)=>{
      if(res.code == 0){
        this.setData({typeList: res.data});
      }
    })
  },
// 获取行业领域
  getIndustryList(){
    dropDownList({
        param: 'contract_template_industry'
    }).then(res=>{
        if(res.code == 0){
            this.setData({
                industryList:res.data
            })
        }
    })
  },
})
