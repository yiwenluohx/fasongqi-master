// index.js
const {caseList} = require('../../api/index')
global.newPage({
  data:{
    list:[
        {
            taskId: 1,
            taskName: '租房合同',
            status: true,
            statusText: '',
            taskDesc:'发挥空间啊师傅很快收到回复了三顿饭饭看见史蒂芬霍金阿萨德发货放假啊收到话费了收到货就发啦发撒娇的匡扶汉室看见对方',
            createTime: '2024-03-12 09:36'
        },
        {
            taskId: 1,
            taskName: '租房合同',
            status: true,
            statusText: '',
            taskDesc:'发挥空间啊师傅很快收到回复了三顿饭饭看见史蒂芬霍金阿萨德发货放假啊收到话费了收到货就发啦发撒娇的匡扶汉室看见对方',
            createTime: '2024-03-12 09:36'
        },
        {
            taskId: 1,
            taskName: '租房合同',
            status: true,
            statusText: '',
            taskDesc:'发挥空间啊师傅很快收到回复了三顿饭饭看见史蒂芬霍金阿萨德发货放假啊收到话费了收到货就发啦发撒娇的匡扶汉室看见对方',
            createTime: '2024-03-12 09:36'
        },
        {
            taskId: 1,
            taskName: '租房合同',
            status: true,
            statusText: '',
            taskDesc:'发挥空间啊师傅很快收到回复了三顿饭饭看见史蒂芬霍金阿萨德发货放假啊收到话费了收到货就发啦发撒娇的匡扶汉室看见对方',
            createTime: '2024-03-12 09:36'
        },{
            taskId: 1,
            taskName: '租房合同',
            status: true,
            statusText: '',
            taskDesc:'发挥空间啊师傅很快收到回复了三顿饭饭看见史蒂芬霍金阿萨德发货放假啊收到话费了收到货就发啦发撒娇的匡扶汉室看见对方',
            createTime: '2024-03-12 09:36'
        },
        {
            taskId: 1,
            taskName: '租房合同',
            status: true,
            statusText: '',
            taskDesc:'发挥空间啊师傅很快收到回复了三顿饭饭看见史蒂芬霍金阿萨德发货放假啊收到话费了收到货就发啦发撒娇的匡扶汉室看见对方',
            createTime: '2024-03-12 09:36'
        },
        {
            taskId: 1,
            taskName: '租房合同',
            status: true,
            statusText: '',
            taskDesc:'发挥空间啊师傅很快收到回复了三顿饭饭看见史蒂芬霍金阿萨德发货放假啊收到话费了收到货就发啦发撒娇的匡扶汉室看见对方',
            createTime: '2024-03-12 09:36'
        },
        {
            taskId: 1,
            taskName: '租房合同',
            status: true,
            statusText: '',
            taskDesc:'发挥空间啊师傅很快收到回复了三顿饭饭看见史蒂芬霍金阿萨德发货放假啊收到话费了收到货就发啦发撒娇的匡扶汉室看见对方',
            createTime: '2024-03-12 09:36'
        },
    ],
    caseType: '',
    pageNum:1,
    pageSize:10,
    isAll: false,
    total: '',
    moreTxt: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: options.title
    })
    this.setData({
        caseType: options.caseType
    })
  },
  onShow: function(){
    this.data.list = [];
    this.data.pageNum = 1;
    this.getCaseList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.isAll) return
    this.data.pageNum++
    this.getCaseList();
  },
  getCaseList(){
    caseList({
        caseType: this.data.caseType,
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
    }).then(res=>{
        if(res.code == 0){
            let newlist = this.data.list.concat(res.data.records);
            this.setData({
                total: res.data.total,
                list: newlist //这里是重点
            })
            // 判断是否加载完毕
            if (newlist.length >= res.data.total) { //这里是重点
                this.setData({
                    isAll: true, //这里是重点
                    moreTxt: '-无更多数据-'
                })
            }
        }
    })
  },
  itemClick(e){
      wx.navigateTo({
        url: `/pages/newsDetail/index?caseId=${e.currentTarget.dataset.id}`,
      })
  }
})
