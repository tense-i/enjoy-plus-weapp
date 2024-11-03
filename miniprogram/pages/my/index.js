// pages/profile/index.ts
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    nickName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    app.token && this.getUserProfile()
  },
  async getUserProfile() {
    // 调用接口获取昵称和头像
    const { code, data: { avatar, nickName } } = await wx.http.get('/userInfo')
    // 检测接口是否正常返回结果
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({ avatar, nickName })
  },

  goLogin() {
    if (!app.token)
      wx.redirectTo({
        url: '/pages/login/index?redirect=' + encodeURIComponent(wx.getCurPageUrl()),
      })
  },
  async getUserInfo() {
    app.userProfile = { ...this.data }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})