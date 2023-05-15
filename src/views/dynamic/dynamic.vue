<template>
  <div 
    class="dynamic infinite-list"
    v-infinite-scroll="load"
    style="overflow: auto">
    <div class="content_box">
      <div
        class="select_rule_mode"
        :style="{ marginRight: dynamicCurrentRule === 1 ? '320px' : '0' }"
      >
        <div class="left_rule option">
          <div
            v-for="item in ruleArray"
            :key="item.rule"
            class="item"
            :style="{
              color: dynamicCurrentRule === item.rule ? '#007fff' : '#71777c'
            }"
            @click="ruleClick(item.rule)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <!-- <div class="big_mode_item" v-show="currentMode === 2">
        <PostsListModeItem
          v-for="item in dynamicList"
          :key="item.id"
          :item-data="item"
          class="infinite-list-mode-item"
        />
      </div> -->
      <div class="content_box_left">
        <PostsListItem
          v-for="item in dynamicList"
          :key="item.id"
          :item-data="item"
          class="infinite-list-item"
        >
        </PostsListItem>
      </div>
      <div class="content_box_right">
        <!-- 取后面三个来进行侧边栏进行展示 -->
        <PostsListItemRight
          :coverImg="dynamicList[dynamicList.length - 1].coverImg"
          :title="dynamicList[dynamicList.length - 1].title"
          :id="dynamicList[dynamicList.length - 1].id"
          v-if="dynamicList[dynamicList.length - 1]"
        />
        <PostsListItemRight
          :coverImg="dynamicList[dynamicList.length - 2].coverImg"
          :title="dynamicList[dynamicList.length - 2].title"
          :id="dynamicList[dynamicList.length - 2].id"
          v-if="dynamicList[dynamicList.length - 2]"
        />
        <PostsListItemRight
          :coverImg="dynamicList[dynamicList.length - 3].coverImg"
          :title="dynamicList[dynamicList.length - 3].title"
          :id="dynamicList[dynamicList.length - 3].id"
          v-if="dynamicList[dynamicList.length - 3]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllSorts } from "@/api/mode1/index"
import PostsListItem from "@/components/posts-list-item/postsListItem.vue"
import PostsListModeItem from "@/components/posts-list-mode-item/postsListModeItem.vue"
import { usePostsStore } from "@/stores/posts"
import { storeToRefs } from "pinia"
import { ref } from "vue"
import PostsListItemRight from "@/components/posts-list-right-item/postsListRightItem.vue"
import ruleArray from "@/assets/ts/data_rule"
import modeArray from "@/assets/ts/data_mode"
import Atropos from "atropos/vue"

const postsStore = usePostsStore()

const { dynamicCurrentRule } = storeToRefs(postsStore)
const { dynamicList } = storeToRefs(postsStore)

const initDynamicList = async () => {
  postsStore.dynamicPage = 0
  postsStore.changedynamicList({ size: 8 })
}
initDynamicList()

const ruleClick = (rule: number) => {
  postsStore.dynamicPage = 0
  postsStore.dynamicCurrentRule = rule
  postsStore.changedynamicList({ size: 8 })
}

const load = () => {
  console.log("first")
  console.log(postsStore.dynamicPage)
  // 第一次进来，因为盒子高度为100vh,而我们的数据高度不止100vh，会触底持续执行此方法，需要排除这个问题
  if (postsStore.dynamicPage === 0) return
  postsStore.changedynamicList({ size: 8 })
}

</script>

<style scoped lang="less">
.dynamic {
  .sort_box {
    // padding-top: 60px;
    position: fixed;
    left: 0;
    top: 60px;
    right: 0;
    background-color: #fff;
    z-index: 999;
    .top_sort_list {
      max-width: 960px;
      margin: 0 auto;
      height: 44px;
      line-height: 44px;
      display: flex;
      .item {
        padding-left: 13px;
        padding-right: 13px;
        flex-shrink: 0;
      }
      .item:nth-child(1) {
        padding-left: 0;
      }
      @media screen and (max-width: 960px) {
        overflow-x: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .item:nth-child(1) {
          padding-left: 13px;
        }
      }
    }
  }
  .content_box {
    border-top: 84px solid #f2f3f5;
    margin: 0 auto;
    max-width: 1060px;
    display: flex;
    flex-wrap: wrap;
    .select_rule_mode {
      flex: 100%;
      height: 35px;
      line-height: 35px;
      background-color: #fff;
      @media screen and (max-width: 700px) {
        margin-right: 0 !important;
      }
      display: flex;
      justify-content: space-between;
      .option {
        display: flex;
        .item {
          padding-right: 15px;
          padding-left: 15px;
        }
      }
    }
    .big_mode_item {
      flex: 100%;
    }
    .content_box_left {
      background-color: #fff;
      flex: 1;
      @media screen and (max-width: 700px) {
        width: 100%;
      }
      .posts_list_item:nth-child(1) {
        border-top: 1px solid #ccc;
        padding-top: 15px;
        margin-top: 0;
      }
    }
    .content_box_right {
      margin-left: 20px;
      @media screen and (max-width: 700px) {
        display: none;
      }
      width: 300px;
    }
  }
}

.infinite-list {
  height: 100vh;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  height: 140px;
  background: #fff;
  margin: 15px;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
