<template>
  <div class="about">
    <div class="content">
      <div class="left-content">
        <PostsDeatil
          :postsDetail="postsDetailInfo"
          v-if="postsDetailInfo.id != '0'"
        />
        <PostsComment
          :postWithComments="postsDetailInfo.comments"
          v-if="postsDetailInfo.id != '0'"
        />
      </div>
      <div class="right-content">
        <!-- <div class="other_block box_shadow_custom" ref="otherBlock">
          <Clock v-if="postsDetailInfo.id != '0'" />
        </div> -->
        <PostNav />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostsComment from "@/components/posts-comment/postsComment.vue"
import PostsDeatil from "@/components/posts-detail/postsDetail.vue"
import PostNav from "@/components/posts-nav/postsNav.vue"

import { getPostsById } from "@/api/mode1/index"
import { ref, onMounted } from "vue"
import { usePostsStore } from "@/stores/posts"
import { storeToRefs } from "pinia"
import Clock from "@/base-ui/clock/clock.vue"
import { useRoute } from "vue-router"
// const postsDetailInfo = ref<any>(undefined)

// getPostsById("15").then((res) => {
//   // 这里不能动态绑定id？
//   postsDetailInfo.value = res.data
// })
const route = useRoute()
const postsStore = usePostsStore()
console.log(route.params.id)
postsStore.setPostsDetailInfo(route.params.id)
const { postsDetailInfo } = storeToRefs(postsStore)
const otherBlock = ref()
onMounted(() => {
  console.dir(otherBlock.value)
})
</script>

<style scoped lang="less">
.about {
  width: 100%;
  margin-top: 85px;
  .content {
    width: 1140px;
    margin: 0 auto;
    display: flex;
    @media screen and (max-width: 800px) {
      width: 100%;
      .left-content {
        width: 100%;
      }
      .right-content {
        display: none;
      }
    }
    .left-content {
      border-radius: 8px;
      // overflow: hidden;
    }
    .right-content {
      flex: 1;
      margin-left: 20px;
      position: relative;
      .other_block {
        box-sizing: border-box;
        display: flex;
        width: 320px;
        height: 320px;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
      }
      .other_block::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 320px;
        height: 320px;
        background: linear-gradient(45deg, #ffc107 100%, #ffc107);
        background-position: center center;
      }
      .other_block::after {
        content: "";
        position: absolute;
        // top: -20px;
        left: 0;
        width: 320px;
        height: 320px;
        animation: animate 5s ease-in-out infinite;
        background: linear-gradient(
          160deg,
          #03a9f4,
          #03a9f4 50%,
          transparent 50%,
          transparent
        );
      }
    }
  }
}
</style>
