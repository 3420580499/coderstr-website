<template>
  <div class="my-overview">
    <div class="card-item">
      <BaseEchars :options="postAndDynamicOptions" />
    </div>
    <div class="card-item">
      <BaseEchars :options="readAndLikeCountOptions" />
    </div>
    <div class="card-item">
      <BaseEchars :options="likeOptions" />
    </div>
    <div class="card-item">
      <BaseEchars :options="readOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseEchars from '@/base-ui/echarts';
import type { EChartsOption } from 'echarts'
import { storeToRefs } from 'pinia';
import { useUserStore } from "@/stores/user"
import { ref } from 'vue'
import { computed, type Ref } from 'vue';

const userStore = useUserStore()
const { postCountData,likeAndReadData,likeTopData,readTopData }  = storeToRefs(userStore)
userStore.initOverview()

const postAndDynamicOptions : Ref<EChartsOption> = computed(() => {
  return {
  //Echarts官方文档中有每个属性的详细用法
    title: {
      text: "数据统计",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["文章数", "动态数"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: postCountData.value.map(item => item.date),
      axisLabel: {
        rotate: 45,  // 旋转角度，单位为度
      },
    },
    yAxis: {
      type: "value",
    },
    // 数据的来源
    series: [
      {
        name: "文章数",
        type: "line",
        stack: "Total",
        data:postCountData.value.map(item => item.postCount),
      },
      {
        name: "动态数",
        type: "line",
        stack: "Total",
        data: postCountData.value.map(item => item.dynamicCount),
      }
    ],
  };
})
const readAndLikeCountOptions : Ref<EChartsOption>= computed(() => {
  return {
    title: {
        text: '收获统计',
    },
    tooltip: {
        trigger: 'item',
        // formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    color: [
      '#5370c8', '#f06667', '#fbc85a'
    ],
    legend: {
        orient: 'vertical',
        right: 40,
        data: ['阅读数', '点赞数', '评论数']
    },
    series: [
        {
            name: '收获',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: likeAndReadData.value.readCount, name: '阅读数'},
                {value: likeAndReadData.value.likeCount, name: '点赞数'},
                {value: likeAndReadData.value.commentCount, name: '评论数'}
            ],
            itemStyle: {
              // emphasis: {
              //     shadowBlur: 10,
              //     shadowOffsetX: 0,
              //     shadowColor: 'rgba(0, 0, 0, 0.5)'
              // }
            }
        }
    ]
};
})

const likeOptions : Ref<EChartsOption> = computed(() => {
  return {
    title: {
      text: '点赞top',
    },
    tooltip: {},
    legend: {
      data:['点赞数']
    },
    xAxis: {
      data: likeTopData.value.map(item => item.title),
      axisLabel: {
        rotate: 45,  // 旋转角度，单位为度
      },
    },
    yAxis: {},
    series: [{
      name: '点赞数',
      type: 'bar',
      data: likeTopData.value.map(item => item.likeCount)
    }]
  };
})
const readOptions : Ref<EChartsOption> = computed(() => {
  return {
    title: {
      text: '阅读top',
    },
    tooltip: {},
    legend: {
      data:['阅读数']
    },
    xAxis: {
      data: readTopData.value.map(item => item.title),
      axisLabel: {
        rotate: 45,  // 旋转角度，单位为度
      },
    },
    yAxis: {},
    series: [{
      name: '阅读数',
      type: 'bar',
      data: readTopData.value.map(item => item.readCount)
    }]
  };
})
</script>

<style lang="less" scoped>
// main的样式已经在行内定义过了
.my-overview {
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .card-item {
    height: 350px;
    // flex: 45%;
    width: 45%;
    margin: 20px 0;
  }
}
</style>
