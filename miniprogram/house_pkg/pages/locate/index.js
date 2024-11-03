// house_pkg / pages / locate / index.ts

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log("onLoad")
    this.getLocation()
  },

  async getLocation() {
    const res = await wx.getLocation()
    console.log("res")
    console.log(res)
    const point = await this.getPoint(res.latitude, res.longitude)
    console.log(point)
  },

  async getPoint(latitude, longitude) {
    await wx.qqMap.search({
      keyword: '小区',
      // WebServiceAPI的SK
      sig: `${wx.config.env.development.qqmap_SK}`,
      location: `${latitude},${longitude}`,
      page_size: 20,
      success: (res) => {
        this.setData({
          points: res.data
        })
        console.log(res)
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },

})