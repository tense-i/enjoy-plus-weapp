// pages/profile/index.ts
const currentPage = getCurrentPages()[0]
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
  },
  onLoad() {
    if (app.userProfile)
      this.setData({ ...app.userProfile })
  },
  async updateUserInfo(ev) {
    const { nickName } = ev.detail
    if (!nickName || nickName === '')
      return
    const { code } = await wx.http.post('/userInfo', { nickName })

    if (code !== 10000) return wx.utils.toast('更新失败')
    // 当前在profile页面、要修改my页面中的nickName
    currentPage.setData({ nickName })
  },
  async getAvatar(ev) {
    // api上传
    // 调用 API 上传文件
    wx.uploadFile({
      // 接口地址
      url: wx.http.baseURL + '/upload',
      // 待上传的文件路径
      filePath: ev.detail.avatar,
      name: 'file',
      header: {
        // 用户登录状态
        Authorization: 'Bearer ' + getApp().token
      },
      formData: { type: 'avatar' },
      success: (result) => {
        // 处理返回的数据
        const data = JSON.parse(result.data)
        // 检测接口是否调用成功
        if (data.code !== 10000) return wx.utils.toast('上传头像失败!')
        // 借助于页面栈实例来更新 pages/my/index.wxml 中的头像
        currentPage.setData({ avatar: data.data.url })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

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