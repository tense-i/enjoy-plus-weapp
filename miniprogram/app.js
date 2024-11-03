// app.js
import utils from './utils/utils.js'
import http from './utils/http.js'
// 引入环境变量
import config from './config.env.js'
// 引入地图SDK
import QQMapWX from './libs/qqmap-wx-jssdk.js'

wx.utils = utils
wx.http = http
wx.config = config

App({
  globalData: {},
  onLaunch() {
    // 初始化地图SDK
    // 由于qqMap的构造函数需要传入key，而key在环境变量中，所以需要在这里初始化（确保key在环境变量中）
    const qqMap = new QQMapWX({
      key: wx.config.env.development.qqmap_Key
    })
    wx.qqMap = qqMap
    this.token = wx.getStorageSync('token')
  },
})
