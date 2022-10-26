<template>
  <div class="title-nav">
    <div class="content">
      <div v-for="(item, index) in list" :key="item">
        <template v-if="item.level === 1">
          <h1 :id="item.text" @click="itemClick(index)" >
            <a :href="'#' + item.text">{{ item.text }}</a>
          </h1>
        </template>
        <template v-if="item.level === 2">
          <h2 :name="item.text" @click="itemClick(index)">
            <a :href="'#' + item.text">{{ item.text }}</a>
          </h2>
        </template>
        <template v-if="item.level === 3">
          <h3 :id="item.text" @click="itemClick(index)">
            <a :href="'#' + item.text">{{ item.text }}</a>
          </h3>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  list: Array<any>
}>()
const itemClick = (index: number) => {
  console.log(index)
}
</script>
<style scoped lang="less">
.title-nav {
  max-height: 500px;
  width: 300px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
a {
  text-decoration: none;
  color: #333;
}
</style>
