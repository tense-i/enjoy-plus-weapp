Page({
  data: {
    houseList: [],
    isEmpty: false,
  },

  goDetail() {
    wx.navigateTo({
      url: '/repair_pkg/pages/detail/index',
    })
  },
  addRepair() {
    wx.navigateTo({
      url: '/repair_pkg/pages/form/index',
    })
  },
})
