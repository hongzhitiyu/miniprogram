var app = getApp();
Page({
  data: {
    username: '',
    schoolName:'',

    listData: [
      { "code": "01", "text": "text1", "type": "type1" },
      { "code": "02", "text": "text2", "type": "type2" },
      { "code": "03", "text": "text3", "type": "type3" },
      { "code": "04", "text": "text4", "type": "type4" },
      { "code": "05", "text": "text5", "type": "type5" },
      { "code": "06", "text": "text6", "type": "type6" },
      { "code": "07", "text": "text7", "type": "type7" }
    ]
  },

 onLoad: function (options) {
  //  从上一页获取姓名
   var username = wx.getStorageSync('username')
   var schoolName = wx.getStorageSync('schoolName')
   this.setData({
     username: username,
     schoolName: schoolName
   })
 }
})
