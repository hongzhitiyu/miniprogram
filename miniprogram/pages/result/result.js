//云数据库初始化
const db = wx.cloud.database({});
Page({
  data: {
    tableData: [], //这是一个空的数组，等下获取到云数据库的数据将存放在其中
    classnum: [],
    teacher: '',
    totalClass: '',
    attendClass: '',
    remainingClass: '',
    userName: '',
    dbName: '',
    arr: [],
    user: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //  从上一页获取姓名
    var that = this
    var schoolName = wx.getStorageSync('schoolName')
    var dbName = wx.getStorageSync('dbName')
    var user = wx.getStorageSync('user')
    
    this.setData({
      schoolName: schoolName,
      user: user,
      dbName:dbName
    });
    console.log(schoolName)
    console.log(user)
    var _this = this;
    const db = wx.cloud.database({
      env: 'dev-hongzhi'
    })

    db.collection(this.data.dbName).where({
      userName: this.data.user,
    }).get({
      success: res => {
        wx.showToast({
          title: '查询中...',
        })
        this.setData({
          classnum: res.data
        })
        let result = res.data[0];
        console.log(result)

        for (var key in result) {
          if (key.indexOf("2019") > -1 && result[key] != "") {
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

  }
})