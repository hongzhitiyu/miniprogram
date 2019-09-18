var app = getApp();
Page({
  data: {
    username: '',
    schoolName:'',
    dbName:'',

    listData: [
      { "code": "2019.9.7", "text": "上午1", "type": "刘" },
      { "code": "2019.9.7", "text": "上午1", "type": "黄" },
      { "code": "2019.9.7", "text": "下午", "type": "彭" }
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
  // 判断选中的学校名称并开始匹配数据库表名
   if (schoolName == '螺岭二部') {
    var dbName = 'erbu';
  }
   else if (schoolName == '螺岭一部') {
    var dbName = 'yibu';
  }
   else if (schoolName == '洪湖') {
    var dbName = 'honghu';
  }
   else if (schoolName == '安芳') {
    var dbName = 'anfang';
  }
   else if (schoolName == '滨河') {
    var dbName = 'binhe';
   } else if (schoolName == '淘金山') {
    var dbName = 'taojinshan';
   } else if (schoolName == '罗小') {
    var dbName = 'luoxiao';
  }
  // 将输入的姓名保存本地
  wx.setStorageSync('dbName', dbName);
  console.log(dbName)
 }
})