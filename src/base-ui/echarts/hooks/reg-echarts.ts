import * as echarts from 'echarts'
import chinaMapData from '../data/china.json'

// 注册一张中国地图
echarts.registerMap('china', chinaMapData)
export default function (el: HTMLElement) {
  const echartsInstance = echarts.init(el)
  const setOption = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options)
  }

  //调用echartsInstance实例的缩放方法(屏幕变小变大后,echarts图形也发生变化)
  const updateSize = () => {
    echartsInstance.resize()
  }
  // 监听window页面的缩放
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })
  return {
    echartsInstance,
    setOption,
    updateSize
  }
}
