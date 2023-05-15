<template>
  <div class="postsListRightItem" @click="postsListItemClick">
    <div class="cover">
      <img :src="getRemoteImgPath(coverImg)" alt="" />
    </div>
    <h2 class="title">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
import { getRemoteImgPath } from "@/utils/getStaticImgPath"
import { useRouter } from "vue-router"

const router = useRouter()

const postsListItemClick = () => {
  router.push("/about/" + props.id)
}

const props = defineProps<{
  coverImg: string
  title: string
  id: string
}>()
</script>

<style scoped lang="less">
.postsListRightItem {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 20px 20px 60px #ced1d6, -20px -20px 60px #fff;
  .cover {
    width: 100%;
    img {
      width: 100%;
      height: 170px;
    }
  }
  .title {
    text-align: center;
    height: 80px;
    line-height: 80px;
    margin: 0;
    font-weight: 500;
  }
}
</style>
