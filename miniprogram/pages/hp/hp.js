//云数据库初始化
const db = wx.cloud.database({});
const cont = db.collection('river_data');

Page({
  data: {
    tableData: [], //这是一个空的数组，等下获取到云数据库的数据将存放在其中
    classnum:[],
    teacher: '',
    totalClass: '',
    attendClass: '',
    remainingClass: '',
    userName: '洪心远',
    dbName: 'erBu',
    arr: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    const db = wx.cloud.database({
      env: 'dev-hongzhi'
    })
    db.collection(this.data.dbName).where({
      userName: this.data.userName,
    }).get({
      success: res => {
        wx.showToast({
          title: '查询记录成功',
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

  }





})