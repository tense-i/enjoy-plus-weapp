// 导入 http 模块
import http from 'wechat-http'
// 基础路径，同时需添加合法请求域名
http.baseURL = 'https://live-api.itheima.net'

// 请求拦截器，添加 token
http.intercept.request = (header) => {
  header.Authorization = `Bearer ${getApp().token}`
  return header
}
// 响应拦截器，返回核心数据 data
http.intercept.response = async ({ data, config }) => {
  if (data.code === 401) {
    const app = getApp()
    // refreshToken也过期了、必须重新登录
    if (config.url.includes('/refreshToken')) {
      const pageStack = getCurrentPages()
      const currentPage = pageStack.pop()
      const redirectUrl = currentPage.route
      return wx.redirectTo({ url: `/pages/login/index?redirectUrl=${redirectUrl}` })
    }

    // 通过 refreshToken 获取新的 token
    const res = await http({
      url: '/refreshToken',
      method: 'POST',
      header: {
        Authorization: `Bearer ${app.refreshToken}`,
      }
    })
    if (res.code !== 10000) return
    // 更新 token
    app.setToken('token', res.data.token)
    app.setToken('refreshToken', res.data.refreshToken)
    // 重新发起请求
    config = Object.assign(config, {
      header: {
        Authorization: `Bearer ${app.token}`,
      },
    })
    return http(config)
  }
  return data
}

// 普通的模块导出
export default http