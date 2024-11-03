// house_pkg / pages / locate / index.ts

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '请定位',
    points: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getLocation()
  },

  /**
   * 获取本地位置及附近小区
   */
  async getLocation() {
    const { latitude, longitude } = await wx.getLocation()
    // 逆地址解析
    await wx.qqMap.reverseGeocoder({
      location: `${latitude},${longitude}`,
      sig: `${wx.config.env.development.qqmap_SK}`,
      success: (res) => {
        this.setData({
          address: res.result.address
        })
      },
      fail: (res) => {
        wx.showToast({
          title: `定位失败:${res.message}`,
          icon: 'none'
        })
      }
    })
    await this.getPoint(latitude, longitude)
  },

  /**
   * 获取附近小区
   */
  async getPoint(latitude, longitude) {
    if (!latitude || !longitude) return
    // 搜索周边小区
    await wx.qqMap.search({
      keyword: '小区',
      // WebServiceAPI的SK
      sig: `${wx.config.env.development.qqmap_SK}`,
      location: `${latitude},${longitude}`,
      page_size: 15,
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