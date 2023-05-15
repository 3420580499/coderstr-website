<template>
  <div class="posts_comment box_shadow_custom">
    <div class="comment_input">
      <h3>评论</h3>
      <div class="input_info">
        <div class="cover" v-if="userStore.userInfo">
          <img
            :src="getRemoteImgPath(userStore.userInfo.avatarUrl)"
            alt=""
            class="comment_cover_img"
          />
        </div>
        <CommentInput
          @contentChange="contentChange"
          @commitCommentClick="commitCommentClick"
        />
      </div>
    </div>
    <div class="comment_detail">
      <h3>全部评论 {{ getCommentsCount(postWithComments) }}</h3>
      <CommentItem
        v-for="item in postWithComments"
        :key="item[0].id"
        :itemData="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentInput from "@/base-ui/comment-input/commentInput.vue"
import CommentItem from "./cpns/commentItem.vue"
import { useUserStore } from "@/stores/user"
import { usePostsStore } from "@/stores/posts"
import { ref } from "vue"
import { getRemoteImgPath } from "@/utils/getStaticImgPath"
import { ElMessage } from "element-plus"

const userStore = useUserStore()
const postsStore = usePostsStore()
const content = ref<string>("")
const props = defineProps<{
  postWithComments: any
}>()

const contentChange = (value: string) => {
  content.value = value
}
const commitCommentClick = () => {
  if (!userStore.userInfo) return ElMessage.error("请先登录")
  postsStore.changeComments({
    content: content.value
  })
}
const getCommentsCount = (data: Array<Array<any>>) => {
  if (!data) return
  let count = 0
  for (const item of data) {
    count += item.length
  }
  return count
}
</script>
<style scoped lang="less">
.posts_comment {
  margin-top: 30px;
  padding: 15px;
  background-color: #fff;
  .comment_input {
    .input_info {
      display: flex;
      .cover {
        margin-right: 15px;
        .comment_cover_img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
        }
      }
    }
  }
}
</style>
