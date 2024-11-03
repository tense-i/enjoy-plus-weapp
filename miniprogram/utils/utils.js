// utils/utils.js
const utils = {
  /**
   * 用户消息反馈
   * @param {string} title 文字提示的内容
   */
  toast(title = '数据加载失败...') {
    wx.showToast({
      title,
      mask: true,
      icon: 'none',
    })
  }
}
// 模块导出
export default utils