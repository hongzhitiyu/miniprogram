var app = getApp();
Page({
  data: {
    schoolName: '',
    schoolId: '',
    notice:'',
    isShow:'',

    selectArray: [{
      "id": "0",
      "text": "螺岭二部"
    }, {
      "id": "1",
      "text": "螺岭一部"
    }, {
      "id": "2",
      "text": "洪湖"
    }, {
      "id": "3",
      "text": "安芳"
    }, {
      "id": "4",
      "text": "滨河"
    }, {
      "id": "5",
      "text": "淘金山"
    }, {
      "id": "6",
      "text": "罗小"
    }],
  },
  jumpPage: function() {
    //  从上一页获取姓名
    var that = this
    var schoolName = wx.getStorageSync('schoolName')
    this.setData({
      schoolName: schoolName
    })
    //  判断输入框不能为空
    if (schoolName == '') {

      wx.showToast({
        title: '学校名不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../student/student?schoolName={{schoolName}}',
      })
    }
  },

  onLoad: function(options){    
    // 初始化云
    wx.cloud.init({
      env: 'dev-hongzhi',
      traceUser: true
    });

    var that = this
    // 初始化数据库
    const db = wx.cloud.database(); 
    // const_ = db.command;
    // db.collection('notice').where({notice:'notice'})
   
    db.collection("notice").get({      
      success: function(res) {
        console.log(res.data[0].notice1)       
        that.setData({
          notice: res.data[0].notice1,
          isShow: res.data[0].show
        })
      }
      

     
    })

  }


})