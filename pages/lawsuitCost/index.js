// index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        typeList:[
          {type:1 , title:'合同违约赔偿',shouliStart:0 , shouliEnd:500},
          {type:2 , title:'人身损害赔偿',shouliStart:0 , shouliEnd:500},
          {type:3 , title:'合伙财产纠纷',shouliStart:0 , shouliEnd:500},
          {type:4 , title:'夫妻财产争议',shouliStart:0 , shouliEnd:500},
          {type:5 , title:'知识产权侵权案件',shouliStart:0 , shouliEnd:500},
          {type:6 , title:'借贷纠纷',shouliStart:0 , shouliEnd:500},
        ],
        typeIndex:0,
        showCaichan:false,
        caichanNum:0,
        shoulifei:0,
        zhixingfei:0,
        baoquanfei:0
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
  
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
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    },
    bindPickerChange: function(e) {
      this.setData({
        typeIndex: e.detail.value
      })
    },
    bindSwChange:function(e){
      let status= e.detail.value;
        this.setData({
          showCaichan:status
        })
    },
    caichanInput:function(e){
      let num = e.detail.value;
      var r = /^\+?[1-9][0-9]*$/;　　//正整数
       if(r.test(num)){
        this.setData({
          caichanNum:num
        })
       }else{
         wx.showToast({
           title: "财产金额只能输入数字",
           icon:'none'
         })
       } 
    },
    doCalculation:function(){
      let type = this.data.typeIndex+1;
      let num = this.data.caichanNum;
      this.susongjisuan(num*1);
      this.baoquanjisuan(num*1);
    },
    susongjisuan:function(num){
      let fei = 0;
      let syfei = 0
   
        if(num>20000000){
          fei += (num-20000000)*0.005;
          fei += 10000000*0.006;
          fei += 5000000 * 0.007;
          fei += 3000000 * 0.008;
          fei += 1000000 * 0.009;
          fei += 500000 * 0.01;
          fei += 300000 * 0.015;
          fei += 100000 * 0.02;
          fei += 100000 * 0.025;
          fei += 50;
        }else if(20000000>=num && num >10000000){
          fei += (num-10000000)*0.006;
          fei += 5000000 * 0.007;
          fei += 3000000 * 0.008;
          fei += 1000000 * 0.009;
          fei += 500000 * 0.01;
          fei += 300000 * 0.015;
          fei += 100000 * 0.02;
          fei += 100000 * 0.025;
          fei += 50;
        }else if(10000000>=num && num >5000000){
          fei += (num-5000000)*0.007;
          fei += 3000000 * 0.008;
          fei += 1000000 * 0.009;
          fei += 500000 * 0.01;
          fei += 300000 * 0.015;
          fei += 100000 * 0.02;
          fei += 100000 * 0.025;
          fei += 50;
        }else if(5000000>=num && num >2000000){
          fei += (num-2000000)*0.008;
          fei += 1000000 * 0.009;
          fei += 500000 * 0.01;
          fei += 300000 * 0.015;
          fei += 100000 * 0.02;
          fei += 100000 * 0.025;
          fei += 50;
        }else if(2000000>=num && num >1000000){
          fei += (num-1000000)*0.009;
          fei += 500000 * 0.01;
          fei += 300000 * 0.015;
          fei += 100000 * 0.02;
          fei += 100000 * 0.025;
          fei += 50;
        }else if(1000000>=num && num >500000){
          fei += (num-500000)*0.01;
          fei += 300000 * 0.015;
          fei += 100000 * 0.02;
          fei += 100000 * 0.025;
          fei += 50;
        }else if(500000>=num && num >200000){
          fei += (num-200000)*0.015;
          fei += 100000 * 0.02;
          fei += 100000 * 0.025;
          fei += 50;
        }else if(200000>= num && num >100000){
          console.log(num ,"aaa");
          fei += (num-100000)*0.02;
          fei += 100000 * 0.025;
          fei += 50;
        }else if(100000>=num && num >10000){
          fei += (num-10000)*0.025;
          fei += 50;
        }else if(10000>=num && num >0){
          fei += 50;
        }else{
          fei = 0;
        }
        console.log(fei);
        let type = this.data.typeList[this.data.typeIndex];
        var str = "";
        if(type.shouliEnd){
         str =  (type.shouliStart + fei)  
        }else{
         str =  (type.shouliStart + fei) 
        }
        this.setData({
          shoulifei: str
        }) 
    },
    baoquanjisuan(num){
      var fei = 0;
      if(num>100000){
        fei += (num-100000) * 0.005;
        fei += 99000 * 0.01;
        fei += 30;
      }else if(num <=100000 && num >1000){
         fei += (num-1000) * 0.01;
         fei += 30; 
      }else{
        fei += 30 ;
      }
      if(fei > 5000){
        fei = 5000;
      }
      this.setData({
        baoquanfei: fei 
      }) 
    }
  
  })
