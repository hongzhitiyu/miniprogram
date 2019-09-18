var app = getApp();

Page({
  data: {
    userName: '',
    schoolName:''

  },

   // 当用户提交表单时回调函数
  formSubmit: function (e) {
    // var that = this
    // var username = e.detail.value.value
    //  console.log(event.detail) 
    var username = e.detail.value.username;
    // 将输入的姓名保存本地
    wx.setStorageSync('username', e.detail.value.username)

    //  判断输入框不能为空
    if (username == "") {
      // wx.showModal({
      //   title: '提示',
      //   content: '姓名不能为空！',
      //   showCancel:false,
      //   success: function (res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //     }
      //   }        
      // })

      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })


    } else {
        console.log(e.detail.value)
      // detail
      wx.navigateTo({
        url: '../result/result?username={{username}}',
      })
    }      
  }, 

  onLoad: function (options) {
    //  从上一页获取姓名
    var schoolName = wx.getStorageSync('schoolName')
    this.setData({
      schoolName: schoolName
    })
  } 
})
