<template>
  <div class="base-echarts">
    <div ref="baseRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import getResEcharts from '../hooks/reg-echarts'
import type { EChartsOption } from 'echarts'

// 在vue3的新特性中，可以去除setup函数
// 利用withDefaults和defineProps函数可以使用props传参
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width: string
    height: string
  }>(),
  {
    width: '100%',
    height: '350px'
  }
)
const baseRef = ref<HTMLElement>()
onMounted(() => {
  if (!baseRef.value) return
  const { setOption } = getResEcharts(baseRef.value)
  watchEffect(() => {
    setOption(props.options)
  })
})
</script>

<style lang="scss" scoped></style>
