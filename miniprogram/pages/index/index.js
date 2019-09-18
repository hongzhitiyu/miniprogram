var app = getApp();
// const { $Toast } = require('../student/student');
Page({
  data: {
    schoolName:'',

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
    wx.navigateTo({
      url: '../student/student?schoolName={{schoolName}}',
    })
  }, 
})
