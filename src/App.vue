<script setup lang="ts">
import { RouterView } from "vue-router"
import HeadNavBar from "./components/head-nav-bar/headNavBar.vue"
</script>

<template>
  <!-- <RouterView /> -->
  <router-view #default="{ route, Component }">
    <HeadNavBar v-show="!route.meta.hiddenHead" />
    <Suspense>
      <keep-alive exclude="about,edit">
        <component :is="Component"></component>
      </keep-alive>
      <template #fallback> 正在加载... </template>
    </Suspense>
  </router-view>
</template>

<style scoped></style>
