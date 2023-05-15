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
    <div class="posts_footer">
      <div class="left">
        <div class="info_name">分类:</div>
        <el-tag type="success" class="mx-1" effect="dark">
          {{ postsDetail.sort.name }}
        </el-tag>
      </div>
      <div class="right">
        <div class="info_name">标签:</div>
        <el-tag
          class="mx-1"
          effect="dark"
          v-for="item in postsDetail.tags"
          :key="item.id"
        >
          {{ item.name }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MdEditorV3 from "md-editor-v3"

import { getRemoteImgPath } from "@/utils/getStaticImgPath"
import { getYYYYMMDD } from "@/utils/formateDate"
import { ref, watchEffect } from "vue"

const props = defineProps<{
  postsDetail: any
}>()
const content = ref<string>("")
// 直接拿到的props可能不是请求后的新值
watchEffect(() => {
  content.value = props.postsDetail?.content
})
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
  .posts_footer {
    padding-left: 20px;
    padding-bottom: 30px;
    display: flex;
    @media screen and (max-width: 800px) {
      display: block;
    }
    line-height: 24px;
    .left {
      .info_name {
        color: #515767;
        margin-right: 8px;
      }
      display: flex;
      margin-right: 20px;
      @media screen and (max-width: 800px) {
        margin-bottom: 15px;
      }
    }
    .right {
      .info_name {
        color: #515767;
        margin-right: 8px;
      }
      display: flex;
    }
  }
}
#default_editor {
  padding: 20px;
}
</style>
