<template>
  <div class="posts_list_item" @click="postsListItemClick">
    <div class="head_info">
      <div class="author_name">{{ itemData.author.username }}</div>
      <div class="create_time">{{ getYearAndSecond(itemData.createAt) }}</div>
      <div class="tags_name">
        <el-tag
          class="mx-1"
          effect="dark"
          v-for="item in itemData.tags"
          :key="item.id"
        >
          {{ item.name }}
        </el-tag>
      </div>
    </div>
    <div class="item_content">
      <div class="left">
        <div class="title">{{ itemData.title }}</div>
        <div class="summary">{{ itemData.summary }}</div>
        <div class="info">
          <div class="read">
            <el-icon><View /></el-icon>
            <div class="read_count">{{ itemData.readCount || "阅读" }}</div>
          </div>
          <div class="like">
            <!-- <el-icon><Pointer /></el-icon> -->
            <DigIcon style="height: 20px; width: 20px"/>
            <div class="like_count">{{ itemData.likeCount || "点赞" }}</div>
          </div>
          <div class="comment">
            <el-icon><ChatLineRound /></el-icon>
            <div class="comment_count">
              {{ itemData.comments[0].count || "评论" }}
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <img
          :src="getRemoteImgPath(itemData.coverImg)"
          alt=""
          style="width: 120px; height: 80px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRemoteImgPath } from "@/utils/getStaticImgPath"
import { getYearAndSecond } from "@/utils/formateDate"
import { useRouter } from "vue-router"
import { getAddReadCount } from '@/api/mode1'
import DigIcon from "@/assets/svg/digIcon.vue"


const router = useRouter()
const props = defineProps<{
  itemData: any
}>()
const postsListItemClick = () => {
  router.push("/about/" + props.itemData.id)
  getAddReadCount({
    id: props.itemData.id
  })
}
</script>

<style scoped lang="less">
.posts_list_item {
  border-bottom: 1px solid #ccc;
  .head_info {
    display: flex;
    height: 30px;
    align-items: center;
    .author_name {
      padding-right: 10px;
      color: #4e5969;
    }
    .create_time {
      color: #86909c;
      padding: 0 10px;
      border-left: solid 1px #ccc;
      border-right: solid 1px #ccc;
      @media screen and (max-width: 900px) {
        border-right: solid 0 #ccc;
      }
    }
    .tags_name {
      @media screen and (max-width: 900px) {
        display: none;
      }
      padding-left: 10px;
    }
  }
  .item_content {
    display: flex;
    .left {
      flex: 1;
      .title {
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        color: #1d2129;
        width: 100%;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        margin: 8px 0;
      }
      .summary {
        color: #86909c;
        font-size: 14px;
        line-height: 20px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        margin: 8px 0;
      }
      .info {
        display: flex;
        color: #86909c;
        font-size: 14px;
        .read {
          display: flex;
          align-items: center;
          .read_count {
            margin-left: 4px;
          }
        }
        .like {
          display: flex;
          align-items: center;
          margin: 0 10px;
          .like_count {
            margin-left: 4px;
          }
        }
        .comment {
          display: flex;
          align-items: center;
          .comment_count {
            margin-left: 4px;
          }
        }
      }
    }
    .right {
      width: 120px;
      height: 80px;
      margin-left: 10px;
      border-radius: 4px;
      overflow: hidden;
    }
  }
}
</style>
