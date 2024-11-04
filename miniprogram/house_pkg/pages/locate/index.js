// house_pkg / pages / locate / index.ts

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '请定位',
    points: [],
    latitude: 0,
    longitude: 0,
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
    const app = getApp()
    const { latitude, longitude } = await wx.getLocation()
    // 缓存定位坐标、如果坐标相同则不再执行后面的逻辑、减少接口调用次数
    if (typeof app.position === 'undefined') {
      // 第一次定位
      // 逆地址解析
      await wx.qqMap.reverseGeocoder({
        location: `${latitude},${longitude}`,
        sig: `${wx.config.env.development.qqmap_SK}`,
        success: (res) => {
          this.setData({
            address: res.result.address,
            latitude,
            longitude,
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
    } else if (app.position.latitude === latitude && app.position.longitude === longitude) {
      // 轻提示
      wx.showToast({
        title: '定位成功',
        icon: 'none'
      })
      // 定位坐标相同、直接使用缓存数据
      this.setData({
        address: app.position.address,
        latitude,
        longitude,
        points: app.position.points,
      })
      return true
    }
    return false
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
        const app = getApp()
        // 缓存定位信息
        app.position = {
          latitude,
          longitude,
          points: res.data,
          address: this.data.address,
        }
        console.log(res)
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },

})