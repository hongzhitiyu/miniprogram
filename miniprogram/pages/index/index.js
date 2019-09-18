var app = getApp();
Page({
  data: {
    schoolName:'',
    schoolId:'',

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
    }
    ],    
  },
  jumpPage: function () {
    //  从上一页获取姓名
    var schoolName = wx.getStorageSync('schoolName')
    this.setData({
      schoolName: schoolName
    })
    //  判断输入框不能为空
    if (schoolName =='') {
      
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
})
