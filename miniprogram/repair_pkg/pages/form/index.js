import wxValidate from 'wechat-validate'
Page({
  behaviors: [wxValidate],
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseId: '',
    houseName: '',
    repairItem: [],
    repairList: [],
    attachment: [],
  },
  rules: {
    houseId: [
      { required: true, message: '请选择报修房屋!' }
    ],
    repairItemId: [
      { required: true, message: '请选择维修的项目!' }
    ],
    mobile: [
      { required: true, message: '请填写手机号码!' },
      { pattern: /^1[3-8]\d{9}$/, message: '请填写正确的手机号码!' },
    ],
    appointment: [
      { required: true, message: '请选择预约日期!' }
    ],
    description: [
      { required: true, message: '请填写问题描述!' }
    ],
  },
  async submitForm() {
    if (!this.validate()) return
    console.log(this.data)
    // 提取接口需要的数据
    const { houseId, repairItemId, mobile, appointment, description, attachment } = this.data
    // 调用接口
    const { code } = await wx.http.post('/repair', {
      houseId,
      repairItemId,
      mobile,
      appointment,
      description,
      attachment,
    })
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast('在线报修失败!')
    // 跳转到报修列表页面
    wx.redirectTo({
      url: '/repair_pkg/pages/list/index',
    })
  },
  onLoad() {
    // 获取房屋列表（必须是通过审核的房屋）
    this.getHouseList()
    // 获取维修项目 
    this.getRepairItem()
  },
  // 获取维修项目
  async getRepairItem() {
    // 调用接口
    const { code, data: repairItem } = await wx.http.get('/repairItem')
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({ repairItem })
  },
  // 获取房屋列表（必须是通过审核的房屋）
  async getHouseList() {
    // 调用接口
    const { code, data: houseList } = await wx.http.get('/house')
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({ houseList })
  },
  // 获用户选择的房屋
  selectHouse(ev) {
    // 数据渲染
    this.setData({
      houseId: ev.detail.id,
      houseName: ev.detail.name,
    })
  },
  // 获用户选择的维修项目
  selectRepair(ev) {
    this.setData({
      repairItemId: ev.detail.id,
      repairItemName: ev.detail.name,
    })
  },
  // 获用户选择的日期
  selectDate(ev) {
    this.setData({
      appointment: wx.utils.dataFormat(ev.detail),
      dateLayerVisible: false,
    })
  },
  // 上传文件
  async uploadFile(ev) {
    console.log(ev)
    const { file } = ev.detail
    // 上传文件
    await wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      filePath: file.url,
      name: 'file',
      header: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + getApp().token,
      },
      success: (res) => {
        console.log(res)
        const data = JSON.parse(res.data)
        // 检测接口是否调用成功
        if (data.code !== 10000) return wx.utils.toast('文件上传失败!')
        // 先获取原来已经上传的图片
        const { attachment } = this.data
        // 追加新的上传的图片
        attachment.push(data.data)
        // 渲染数据
        this.setData({ attachment })
      },
    })
  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index',
    })
  },
})
