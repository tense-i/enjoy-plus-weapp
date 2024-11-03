Page({
  data: {
    notices: [],
  },
  onLoad() {
    this.getNotices() // 直接调用
  },
  async getNotices() {
    const { data: notices } = await wx.http.get('/announcement')
    console.log(notices)
    this.setData({ notices })
  },
})
