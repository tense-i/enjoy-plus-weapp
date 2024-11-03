// house_pkg/pages/building/index.js
Page({
  data: {
    size: 0,
    point: '',
    type: '',
  },
  // 获取地址参数
  onLoad({ point }) {
    // 生成假数据
    this.fake(point)
  },
  fake(point) {
    // 生成楼栋数（用于上课）
    const size = Math.floor(Math.random() * 4) + 3
    // 楼栋名称（xx小区 / xx栋）
    const type = size > 4 ? '号楼' : '栋'
    // 数据渲染
    this.setData({ size, type, point })
  },
})
