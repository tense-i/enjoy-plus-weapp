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
      // 获取当前页面栈 
      const currentPage = getCurrentPages().pop()

      const pageStack = getCurrentPages()
      if (!isLogin) {
        // // 使用空白函数覆盖原生的生命周期 onLoad onShow
        currentPage.onLoad = () => { } // 空白函数
        currentPage.onShow = () => { } // 空白函数
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
