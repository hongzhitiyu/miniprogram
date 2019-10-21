// pages/databaseGuide/databaseGuide.js
const app = getApp()
Page({

  data: {
    step: 1,
    counterId: '',
    notice1: '',
    notice2: '',
    notice3: '',
    isShow: '',
    count: null,
    queryResult: '',
  },


  onLoad: function(options) {
    // 初始化云
    wx.cloud.init({
      env: 'dev-hongzhi',
      traceUser: true
    });
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('notice').doc("f62ba3c1-5b92-4eea-8e97-dd0481df87de").get({
      success: function(res) {
        // console.log(res.data.notice1)
        // var notice2 = res.data.notice1
        // var show = res.data.show
        // console.log(notice2)
        console.log(res.data.show)
        console.log(res.data.notice1)
        that.setData({
          notice3: res.data.notice1,
          isShow: res.data.show
        })
      },

    })

  },
})