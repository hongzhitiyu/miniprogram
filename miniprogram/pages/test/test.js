// pages/studentlist/studentlist.js
//获取应用实例
const app = getApp()
var page = 1;
var isfinish = false;//加载完毕

function loadmore(that) {
  if (isfinish) return;

  wx.showLoading({
    title: '正在加载中',
  })
  wx.request({
    url: app.globalData.url.index,
    header: {
      Cookie: wx.getStorageSync('session_id')
    },
    data: {
      page: page,
      condition: that.data.condition
    },
    success: (res) => {
      wx.hideLoading();
      console.log(res.data);
      //缓存
      wx.setStorage({
        key: "list",
        data: res.data
      })
      if (res.data.length > 0) {
        var list = that.data.list;

        for (var i = 0; i < res.data.length; i++) {
          list.push(res.data[i]);
        }
        that.setData({ list: list });
        page++;
      } else {
        isfinish = true;
      }
      wx.stopPullDownRefresh();
    }
  })
}

Page({
  data: {
    inputShowed: false,
    // inputVal: "",
    list: [],
    condition: ''//查询
    
  },
  //搜索
  showInput: function () {
    this.setData({
      inputShowed: true,
    });
  },
  search: function () {
    page = 1,
      isfinish = false,
      this.setData({
        inputShowed: true,
        list: []
      });
    loadmore(this)
  },
  inputTyping: function (e) {
    this.setData({
      condition: e.detail.value
    });
  },
  //监听页面加载
  onLoad: function (options) {
    page = 1;
  },
  onShow: function (e) {
    var that = this;
    loadmore(that);
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    //  console.log('正在下拉加载...');
    page = 1;
    isfinish = false;
    this.setData({ list: [] });
    loadmore(this);
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    // console.log('正在上拉加载...');
    var that = this;
    loadmore(that);
  },


})
