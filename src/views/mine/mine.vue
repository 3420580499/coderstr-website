<template>
  <div class="mine">
    <div class="mine-header">
      <el-icon style="margin-left: 10px; margin-right: 10px" @click="() => { router.push('/home') }"><ArrowLeft /></el-icon>
      <div @click="() => { router.push('/home') }">返回主页</div>
    </div>
    <div class="mine-menu">
      <div class="mine-menu-left">
        <div 
          v-for="item in (mineChildren.concat(adminInMineChildren).filter(child => !child.redirect))"
          v-show="item.permission?.includes(userInfo.role)"
          :key="item.path"
          :class="{'left-item-tab': true,'active-item': route.path === `/mine/${item.path}`}"
          @click="mineChildrenClick(item)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="mine-menu-right">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import {  mineChildren, adminInMineChildren } from '@/router'
import { useUserStore } from "@/stores/user"

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)
const mineChildrenClick = (item: any) => {
  console.log(111);
  router.push(`/mine/${item.path}`)
}
console.log(route.path);


</script>

<style scoped lang="less">
.mine {
  .mine-header {
    height: 45px;
    width: 1200px;
    background-color: #fff;
    margin: 80px auto;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    &:hover {
      color: #1d7dfa;
    }
  }
  .mine-menu {
    width: 1200px;
    // height: 70vh;
    min-height: 70vh;
    margin: 0 auto;
    background-color: #f2f3f5;
    display: flex;
    .mine-menu-left {
      flex: 1px;
      margin-right: 20px;
      background-color: #fff;
      .left-item-tab {
        min-height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active-item {
          background: #e8f3ff;
          color: #1d7dfa;
        }
        &:hover {
          background: #e8f3ff;
          color: #1d7dfa;
        }
      }
    }
    .mine-menu-right {
      flex: 4;
      max-width: 950px;
      background-color: #fff;
      padding: 15px;
    }
  }
}
</style>
