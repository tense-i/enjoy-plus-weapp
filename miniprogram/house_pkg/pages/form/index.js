// \u4e00-\u9fa5] 中文验证规则
import wxValidate from 'wechat-validate'
Page({
  behaviors: [wxValidate],
  data: {
    point: '',
    building: '',
    room: '',
    name: '',
    gender: "1",
    mobile: '',
    idcardFrontUrl: '/static/images/avatar_1.jpg',
    idcardBackUrl: '/static/images/avatar_2.jpg',
  },
  rules: {
    name: [
      { required: true, message: '业主姓名不能为空!' },
      { pattern: /^[\u4e00-\u9fa5]{2,5}$/, message: '业主姓名只能为中文!' },
    ],
    mobile: [
      { required: true, message: '业主手机号不能为空!' },
      { pattern: /^1[3-8]\d{9}$/, message: '请填写正确的手机号!' },
    ],
    idcardFrontUrl: [
      { required: true, message: '请上传身份证国徽面!' }
    ],
    idcardBackUrl: [
      { required: true, message: '请上传身份证照片面!' }
    ],
  },
  goList() {
    wx.reLaunch({
      url: '/house_pkg/pages/list/inde __webviewId__, statusx',
    })
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark.type
    this.setData({ [type]: '' })
  },
  onLoad({ point, building, room, id }) {
    // 拿到路由中的请求参数
    const currentPage = getCurrentPages().pop()
    // 判断是否传递了房屋ID
    console.log(currentPage.options)

    debugger
    if (id) this.getHouseDetail(id)
    else this.setData({ point, building, room })
  },
  // 上传身份证
  // 上传身份证照片
  async uploadPicture(ev) {
    // 区分用户上传的是正面或反面
    const type = ev.mark.type

    try {
      // 打开相册或拍照
      const media = await wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['compressed'],
      })

      // 调用 API 上传图片
      wx.uploadFile({
        url: wx.http.baseURL + '/upload',
        filePath: media.tempFiles[0].tempFilePath,
        name: 'file',
        header: {
          Authorization: 'Bearer ' + getApp().token,
        },
        success: (result) => {
          // 处理返回的 json 数据
          const data = JSON.parse(result.data)
          // 判断接口是否调用成功
          if (data.code !== 10000) return wx.utils.toast('上传图片失败!')
          // 渲染数据
          this.setData({ [type]: data.data.url })
        },
      })
    } catch (err) {
      // 获取图片失败
      console.log(err)
    }
  },
  async submit() {
    debugger
    // 转换性别
    this.data.gender = Number(this.data.gender)
    // 验证数据
    const valid = this.validate()
    if (!valid) {
      // 对话框提示
      wx.showModal({
        title: '提示',
        content: '请填写完整信息!',
        showCancel: false,
      })
      return
    }
    // 获取全部的数据（剔除可能多余参数 __webviewId__）
    const { __webviewId__, status, ...data } = this.data
    // 调用接口
    const { code } = await wx.http.post('/room', data)
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast('提交数据失败!')
    // 返回房屋列表页面
    wx.reLaunch({
      url: '/house_pkg/pages/list/index',
    })
  },
  async getHouseDetail(id) {
    if (!id) return wx.utils.toast('参数有误!')
    const { code, data: houseDetail } = await wx.http.get('/room/' + id)
    if (code !== 10000) return wx.utils.toast()
    houseDetail.gender = houseDetail.gender.toString()
    this.setData({ ...houseDetail })
  },
})
