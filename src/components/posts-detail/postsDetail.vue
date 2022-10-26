<template>
  <div class="posts_detail box_shadow_custom">
    <div class="posts_info">
      <h1 class="title">{{ postsDetail.title }}</h1>
      <div class="info">
        <div class="cover">
          <img
            class="user_img"
            :src="getRemoteImgPath(postsDetail.author?.avatarUrl)"
            alt=""
          />
        </div>
        <div class="message">
          <div class="name">{{ postsDetail.author?.username }}</div>
          <div class="publish_time">
            {{ getYYYYMMDD(postsDetail.createAt) }} · 阅读 {{ 100 }}
          </div>
        </div>
      </div>
      <div class="posts_cover">
        <img
          :src="getRemoteImgPath(postsDetail.coverImg)"
          alt=""
          class="posts_cover_img"
        />
      </div>
    </div>
    <md-editor-v3
      v-model="content"
      editor-id="default_editor"
      preview-theme="smart-blue"
      preview-only
    >
    </md-editor-v3>
  </div>
</template>

<script setup lang="ts">
import MdEditorV3 from "md-editor-v3"

import { getRemoteImgPath } from "@/utils/getStaticImgPath"
import { getYYYYMMDD } from "@/utils/formateDate"
import { ref } from "vue"

const props = defineProps<{
  postsDetail: any
}>()
const content = ref(props.postsDetail?.content)
</script>

<style scoped lang="less">
.posts_detail {
  background-color: #fff;
  width: 800px;
  max-width: 100%;
  .posts_info {
    .title {
      padding: 20px;
      padding-bottom: 0;
    }
    .info {
      display: flex;
      padding: 20px;
      padding-bottom: 0;
      .cover {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        overflow: hidden;
        margin-right: 10px;
        .user_img {
          width: 100%;
          height: 100%;
        }
      }
      .message {
        .name {
          color: #252933;
        }
        .publish_time {
          margin-top: 6px;
          color: #8a919f;
        }
      }
    }
    .posts_cover {
      padding: 20px;
      padding-bottom: 0;
      .posts_cover_img {
        width: 100%;
        height: 472px;
        @media screen and (max-width: 800px) {
          height: 180px;
        }
      }
    }
  }
}
#default_editor {
  padding: 20px;
}
</style>
