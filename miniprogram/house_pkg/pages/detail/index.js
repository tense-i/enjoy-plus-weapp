Page({
  editHouse() {
    debugger
    console.log(this.data.houseDetail)

    wx.navigateTo({
      url: `/house_pkg/pages/form/index?id=${this.data.id}`,
      // 传递房屋ID
      query: {
        houseDetail: this.data.houseDetail,
        id: this.data.id,
      },
    })
  },
  onLoad({ id }) {
    this.setData({ id })
    this.getHouseDetail(id)
  },
  // 房屋详情接口
  async getHouseDetail(id) {
    if (!id) return wx.utils.toast('参数有误!')
    // 调用接口
    const { code, data: houseDetail } = await wx.http.get('/room/' + id)
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({ houseDetail })
  },
})
