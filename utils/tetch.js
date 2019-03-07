module.exports=(url,data,method='get',header={})=>{
    wx.showLoading({ title: 'Loading...' })
    return new Promise((resolve,reject)=>{
        wx.request({
            url:`https://locally.uieee.com${url}`,
            data:data,
            method,
            header,
            dataType: 'json',
            success: resolve,
            fail: reject,
            complete: wx.hideLoading
          })
    })
}