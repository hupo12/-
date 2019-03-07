const fetch=require('../../utils/tetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:{},  //当前加载的分类
    shops:[],  //此分类下的所有店铺
    category:null,
    pageIndex:0,
    pageSize:20,
    hasMore:true
  },
  
  //封装一个函数 加载下一页数据
  loadMore(){
    //每次加载前先判断如果hasMore为false说明数据已经加载完成,那么就不能再加载了
    if(!this.data.hasMore) return
    //解构对象
    let {pageIndex,pageSize}=this.data
    const params={_page:++pageIndex,_limit:pageSize}
    return fetch(`/categories/${this.data.category.id}/shops`,params)
    .then(res=>{
      //每次发送请求时的请求头中有X-Total-Count 保存的是数据的总条数
      const allCount=parseInt(res.header['X-Total-Count']);
      const hasMore=pageIndex*pageSize < allCount;
      //每一次加载下一页要拼接到之前的数据之后,否则就会覆盖掉之前的数据
      const shops=this.data.shops.concat(res.data)
      //将所有的数据都保存到变量中后再进行设置
      this.setData({shops,pageIndex,hasMore})
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`/categories/${options.cat}`)
    .then(res=>{
        // console.log(res.data);
        // this.setData({shops:res.data});
        //如果fetch这个回调函数执行得非常快,那么它并不一定会在onReady后执行,所以
        this.setData({category:res.data})
        //动态设置当前页面的标题
        wx.setNavigationBarTitle({
          title:res.data.name
        })
        
        //加载完分类信息过后再去加载商铺信息
        //_page是请求的第几页,_limit是规定每页多少条数据
        this.loadMore();
        })
    .then(res=>{
        this.setData({shops:res.data})
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //通过判断这个名字是否存在再设置页面标题
   if(this.data.category.name) {
    wx.setNavigationBarTitle({
      title:this.data.category.name
    })
   }

  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉刷新
   */
  onPullDownRefresh:function(){
    //下拉刷新的时候所有数据清空
    this.setData({shops:[],pageIndex:0,hasMore:true})
    /*只有当页面完全刷新完之后才能停止刷新,之所以这样写,
    是因为这里的this.loadMore()属于异步操作,只有这样才能保证在数据加载完之后才会停止刷新*/
    this.loadMore().then(()=>{
      wx.stopPullDownRefresh() 
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     //当数据被上拉到页面底部时,在这里加载下一页
     this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})