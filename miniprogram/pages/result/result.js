var app = getApp();



Page({
  data: {
    username: '',
    schoolName:'',
    dbName:'',
    tableData: [], //这是一个空的数组，等下获取到云数据库的数据将存放在其中
    classnum: [],
    teacher: '',
    totalClass: '',
    attendClass: '',
    remainingClass: '',
    userName: '',
    user:'',
  },

 onLoad: function (options) {
  //  从上一页获取姓名
   var user = wx.getStorageSync('user')
   var schoolName = wx.getStorageSync('schoolName')
   this.setData({
     user: user,
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


   // 初始化云
   wx.cloud.init({
     env: 'dev-hongzhi',
     traceUser: true
   });
   // 初始化数据库
   const db = wx.cloud.database();
   const _ = db.command; 
  // 在数据库中查询：
  //  db.collection("dbName").doc("username").get({
  //    success: function (res) {
  //      console.log(res.data)
  //    }
  //  })
  //*****************************************/
   var _this = this;
  //  const db = wx.cloud.database({
  //    env: 'dev-hongzhi'
  //  })
   db.collection('erBu').where({
    //  userName: this.data.user,
      userName: user,
   }).get({
     success: res => {
       wx.showToast({
         title: '查询中',
       })
       this.setData({
         classnum: res.data
       })
       let result = res.data[0];
       // console.log(result)

       for (var key in result) {
         if (key.indexOf("2019") > -1 && result[key] != "") {
           // let timelist = key.split("-")[2]; 
           // console.log(timelist);
           // console.log(timelist.includes('上午2'));
           // if (key.includes('上午1') == true || key.includes('上午') == true){                     
           //   key = key.replace('上午1','8:30')                  
           // } else if (key.includes('上午2') == true){
           //   key = key.replace('上午2', '10:10') 
           //   console.log(timelist)
           // } else if (key.includes('下午') == true) {
           //   key = key.replace('下午', '16:15')
           // } 
           // console.log(key)
           let data = {
             // date: key,
             date: key.split("-")[0],
             week: key.split("-")[1],
             time: key.split("-")[2],
             teacher: result[key],
           }
           this.data.tableData.push(data)

         }
       }
       this.setData({
         tableData: this.data.tableData
       })

     }

   })

  /************************* */
 },

//  生命周期函数--监听页面显示
  onShow: function () {
    // this.setData({
    //   userName: app.appData.account.userName,
    //   userPassword: app.appData.account.userPassword
    // })
  },
 

})