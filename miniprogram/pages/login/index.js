import validate from 'wechat-validate'
const app = getApp()
Page({
  data: {
    countDownVisible: false,
    mobile: '',
    redirect: '',
    smsCode: '',
  },
  behaviors: [validate],
  onLoad({ redirect }) {
    this.setData({ redirect })
  },
  rules: {
    mobile: [
      { required: true, message: '请填写手机号码!' },
      { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请填写正确的手机号码!' },
    ],
  },
  // 获取短信验证码
  async getSmsCode() {
    // 获取验证结果
    const { valid, message } = this.validate('mobile')
    // 如果验证不合法则不再执行后面的逻辑
    if (!valid) return wx.utils.toast(message)
    // 显示倒计时组件
    this.setData({ countDownVisible: true })
    // 发送短信验证码
    const res = await wx.http.get('/code', {
      mobile: this.data.mobile,
    })
    console.log(res)
  },

  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
  async login() {
    if (!this.validate())
      return

    const res = await wx.http.post('/login', {
      mobile: this.data.mobile,
      code: this.data.smsCode,
    })
    console.log(res)
    if (res.code !== 10000)
      return wx.utils.toast(res.message)
    wx.utils.toast('登录成功')
    app.setToken('token', res.data.token)
    app.setToken('refreshToken', res.data.refreshToken)
    // 跳转
    console.log(this.data.redirect)
    if (this.data.redirect === '') {
      //返回到上个页面
      wx.redirectTo({
        url: this.data.redirect,
      })
    }
    else {
      // 跳转到首页
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },
  handleInput(ev) {
    const { field } = ev.currentTarget.dataset
    this.setData({
      [field]: ev.detail,
    })
  },
  handleSmsCodeInput(ev) {
    this.setData({
      smsCode: ev.detail,
    })
  },
  handleMobileInput(ev) {
    this.setData({
      mobile: ev.detail,
    })
  },
})
