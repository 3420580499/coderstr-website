<template>
  <div class="posts_list_mode_item">
    <div class="left_time">
      <div class="bg_time">
        <div class="time_date">{{ getDate(itemData.createAt) }}</div>
        <div class="time_year_month">{{ getYYYYMM(itemData.createAt) }}</div>
      </div>
      <div class="bg_border"></div>
    </div>
    <div class="right_content">
      <h2>{{ itemData.title }}</h2>
      <div class="author_info">
        <div class="cover">
          <img :src="getRemoteImgPath(itemData.author.avatarUrl)" alt="" />
        </div>
        <div class="name_info">
          <div class="name">{{ itemData.author.username }}</div>
          <div class="nickname">{{ itemData.author.nickname }}</div>
        </div>
      </div>
      <div class="tags">
        <el-icon><CollectionTag /></el-icon>
        <div class="tags_name">
          <div class="tag_item" v-for="item in itemData.tags" :key="item.id">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="display_content">
        <div class="summary">{{ itemData.summary }}</div>
      </div>
      <div class="footer">
        <div class="count">
          <div class="read item">
            <el-icon><View /></el-icon>
            <div class="read_count">{{ itemData.readCount || "阅读" }}</div>
          </div>
          <div class="like item">
            <!-- <el-icon><Pointer /></el-icon> -->
            <DigIcon style="height: 20px; width: 20px"/>
            <div class="like_count">{{ itemData.likeCount || "点赞" }}</div>
          </div>
          <div class="comment item">
            <el-icon><ChatLineRound /></el-icon>
            <div class="comment_count">
              {{ itemData.comments[0].count || "评论" }}
            </div>
          </div>
        </div>
        <div class="btn" @click="postsListItemClick">阅读全文</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRemoteImgPath } from "@/utils/getStaticImgPath"
import { getYYYYMM, getDate } from "@/utils/formateDate"
import { useRouter } from "vue-router"
import DigIcon from "@/assets/svg/digIcon.vue"


const router = useRouter()
const props = defineProps<{
  itemData: any
}>()
const postsListItemClick = () => {
  router.push("/about/" + props.itemData.id)
}
</script>

<style scoped lang="less">
.posts_list_mode_item {
  display: flex;
  margin: 30px auto;
  padding: 20px 0;
  width: 100%;
  box-shadow: 20px 20px 60px #ced1d6, -20px -20px 60px #fff;
  background: linear-gradient(50deg, #fff, #f2f2f2);
  border-radius: 12px;
  display: flex;
  flex-wrap: wrap;
  .left_time {
    width: 280px;
    margin-left: 15px;
    margin-right: 35px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .bg_time {
      width: 168px;
      height: 168px;
      background: url("@/assets/svg/bg_time.svg") 50% / contain no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .time_date {
        font-size: 60px;
        font-weight: 900;
        font-family: Georgia;
      }
      .time_year_month {
        padding-top: 30px;
      }
    }
    .bg_border {
      width: 168px;
      border-bottom: solid 4px #cce1fe;
      @media screen and (max-width: 700px) {
        border-bottom: solid 0 #cce1fe;
      }
    }
  }
  .right_content {
    flex: 1;
    padding-right: 20px;
    @media screen and (max-width: 700px) {
      padding-left: 30px;
    }
    .author_info {
      display: flex;
      .cover {
        width: 48px;
        height: 48px;
        border-radius: 48px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name_info {
        margin-left: 15px;
        .name {
          color: #338bff;
        }
        .nickname {
          padding-top: 10px;
        }
      }
    }
    .tags {
      display: flex;
      align-items: center;
      margin: 15px 0;
      .el-icon {
        background-color: #fff;
        color: #338bff;
        font-size: 20px;
      }
      .tags_name {
        display: flex;
        .tag_item {
          background-color: #338bff;
          height: 25px;
          line-height: 25px;
          text-align: center;
          color: #fff;
          margin-left: 10px;
          padding: 0 5px;
          margin-right: 10px;
          border-radius: 5px;
          font-size: 12px;
        }
      }
    }
    .display_content {
      margin-top: 15px;
      margin-bottom: 15px;
      .summary {
        color: #283d57;
        font-size: 16px;
        line-height: 28px;
      }
    }
    .footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding: 15px 0;
      .count {
        font-size: 20px;
        color: #338bff;
        display: flex;
        margin-top: 15px;
        .item {
          display: flex;
          .el-icon {
            padding-right: 5px;
          }
        }
        .like {
          padding: 0 15px;
        }
      }
      .btn {
        width: 128px;
        height: 44px;
        background: linear-gradient(90deg, #338bff 11.3%, #80b7ff 161.54%);
        box-shadow: 0 0 32px rgb(0 105 165 / 35%);
        line-height: 44px;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        font-size: 18px;
        margin-top: 15px;
      }
    }
  }
}
</style>
