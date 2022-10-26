<!-- <template>
  <div>
    <md-editor
      v-model="text"
      :previewOnly="true"
      :editorId="state.id"
      preview-theme="smart-blue"
      @on-get-catalog="onGetCatalog"
    >
      <div></div>
    </md-editor>
    <md-catalog
      :editorId="state.id"
      :scroll-element="scrollElement"
      theme="dark"
    />
    <TitleNav v-if="Catalog" :list="Catalog"/>
  </div>
</template>

<script setup lang="ts">
import MdEditor, { type HeadList } from "md-editor-v3"
import "md-editor-v3/lib/style.css"
import { ref, reactive } from "vue"
import TitleNav from "../../base-ui/title-nav/index.vue"

const Catalog = ref<any[]>()

const scrollElement = document.documentElement
const onGetCatalog = (list: HeadList[]) => {
  Catalog.value = list
}
const state = reactive({
  theme: "dark",
  text: "标题",
  id: "myx-editor"
})
const text = ref(
  "## 😲 md-editor-v3\n\n## 😲 md-editor-v3\n\n## 😲 md-editor-v3\n\n## 😲 md-editor-v3\n\nMarkdown 编辑器，vue3 版本，使用 jsx 模板 和 typescript 开发，支持切换主题、prettier 美化文本等。\n\n### 🤖 基本演示\n\n**加粗**，<u>下划线</u>，_斜体_，~删除线~，上标<sup>26</sup>，下标<sub>[1]</sub>，`inline code`，[超链接](https://imzbf.cc)\n\n> 引用：这是一段引用。\n\n![mark and Emoji extension](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)\n\n## 🤗 代码演示\n\n```vue\n<template>\n  <md-editor v-model=\"text\" />\n</template>\n\n<script setup>\nimport { ref } from 'vue';\nimport MdEditor from 'md-editor-v3';\nimport 'md-editor-v3/lib/style.css';\n\nconst text = ref('Hello Editor!');"
)
</script>

<style scoped></style> -->

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
        <div class="other_block box_shadow_custom" ref="otherBlock">
          <Clock v-if="postsDetailInfo.id != '0'" />
        </div>
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
// const postsDetailInfo = ref<any>(undefined)

// getPostsById("15").then((res) => {
//   // 这里不能动态绑定id？
//   postsDetailInfo.value = res.data
// })

const postsStore = usePostsStore()
postsStore.setPostsDetailInfo("15")
const { postsDetailInfo } = storeToRefs(postsStore)
const otherBlock = ref()
onMounted(() => {
  console.dir(otherBlock.value)
})
</script>

<style scoped lang="less">
.about {
  width: 100%;
  margin-top: 20px;
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
