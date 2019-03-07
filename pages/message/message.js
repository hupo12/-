// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages:[],
  },
  
 /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    const messages = this.data.messages
    for (var i = 0; i < 18; i++) {
      messages.push({
        title: '免费送票！超有内涵的门票。',
        date: i + ' September',
        image: 'http://img0.imgtn.bdimg.com/it/u=2453568313,1114490207&fm=26&gp=0.jpg',
        summary: '最糟糕的，也许就是最幸运的。'
      })
    }

    this.setData({ messages })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //节点查询
    //首先创建节点查询器query
    const query = wx.createSelectorQuery()
    //选择id为bottom的节点
    query.select('#bottom').boundingClientRect()
    query.exec(res => wx.pageScrollTo({ scrollTop: res[0].top + 200 }))
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