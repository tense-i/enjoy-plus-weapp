// components/author/auhor.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false,
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在组件实例被创建时执行的函数
    attached() {
      const app = getApp()
      const isLogin = Boolean(app.token)
      this.setData({ isLogin })
      const pageStack = getCurrentPages()
      if (!isLogin) {
        wx.redirectTo({
          url: '/pages/login/index?redirect=' + pageStack.route,
        })
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {},
})
