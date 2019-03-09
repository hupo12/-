const fetch=require('../../utils/tetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     shops:{},
     every:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`/shops/${options.item}`)
    .then(res=>{
      console.log(res.data);
      this.setData({shops:res.data})
    })
  },
   //预览详情页面的商品图片
   previewTopImg(e){
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: this.data.shops.images // 需要预览的图片http链接列表
    })
  },
  //预览评论中的商品图片
  previewCommentImg(e){
    console.log(e)
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: e.target.dataset.images.map(v => v.replace("w.h", "600.800")) // 需要预览的图片http链接列表
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})