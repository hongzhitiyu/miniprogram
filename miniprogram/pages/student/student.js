var app = getApp();
Page({
      data: {
        userName: '',
        schoolName: '',
        name: '',
        dbName: '',
        user: ''
      },

      onLoad: function(options) {
        //  从上一页获取姓名
        var that = this
        var schoolName = wx.getStorageSync('schoolName')
        console.log(schoolName)
        this.setData({
          schoolName:schoolName
        });
       
        // 判断选中的学校名称并开始匹配数据库表名
        if (schoolName == '螺岭二部') {
          var dbName = 'erbu';
        } else if (schoolName == '螺岭一部') {
          var dbName = 'yibu';
        } else if (schoolName == '洪湖') {
          var dbName = 'honghu';
        } else if (schoolName == '安芳') {
          var dbName = 'anfang';
        } else if (schoolName == '滨河') {
          var dbName = 'binhe';
        } else if (schoolName == '淘金山') {
          var dbName = 'taojinshan';
        } else if (schoolName == '罗小') {
          var dbName = 'luoxiao';
        }
        // console.log(dbName)
        // 将输入的DB保存本地      
        wx.setStorageSync('dbName', dbName)
        console.log(dbName)
        var that = this
        that.setData({
          dbName: dbName
        })
      },
      // 当用户提交表单时回调函数

      formSubmit: function(e) {
        // var that = this
        // var username = e.detail.value.username
        //  console.log(event.detail) 
        var user = e.detail.value.user;

        // 将输入的姓名保存本地
        // wx.setStorageSync('username', e.detail.value.username)  
        // console.log(userName)
        var that = this
        wx.setStorageSync('user', e.detail.value.user)        
        this.setData({
          user: user
        })
        console.log(user)
        //  判断输入框不能为空
        if (user == "") {
          wx.showToast({
            title: '姓名不能为空',
            icon: 'none',
            duration: 2000
          })
        } else {
          // //1、引用数据库   
          const db = wx.cloud.database({
            //这个是环境ID不是环境名称     
            env: 'dev-hongzhi'
          })
          // 2、开始查询数据了  news对应的是集合的名称  
          db.collection(this.data.dbName).where({
            userName:this.data.user,
          }).get({
              //如果查询成功的话    
              success: res => {
                console.log(res.data[0]);              
                // console.log(res.data[0].userName); 
               var searchedName = res.data[0].userName
                console.log(searchedName)
                if (user==searchedName){
                console.log("查询到了")
                  wx.navigateTo({
                    url: '../result/result?user={{user}}',                     
                  })
                } else {
                  wx.showToast({
                    title: '没有查到该学生，请确认学校和姓名是否正确',
                    icon: 'none',
                    duration: 3000
                  })
                }
                
              }
            })
          }
        }

})