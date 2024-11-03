// app.js
import utils from './utils/utils.js'
import http from './utils/http.js'

wx.utils = utils
wx.http = http

App({
  globalData: {},
  onLaunch() {
    console.log('App Launch')
    this.token = wx.getStorageSync('token')
  },
})
