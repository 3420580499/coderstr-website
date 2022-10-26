<!-- <template>
  <div class="home">
    <button
      class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 border-none cursor-pointer"
    >
      Click me
    </button>
    <button
      p="y-2 x-4"
      font="semibold"
      shadow="lg"
      text="white"
      bg="green-500 hover:green-700"
      border="rounded-lg none "
      cursor="pointer"
    >
      Click me
    </button>
    <div class="i-ic-baseline-account-circle bg-green-500 text-xl"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style> -->

<template>
  <md-editor-v3
    v-model="state.text"
    :editor-id="state.id"
    preview-theme="smart-blue"
    preview-only
  >
  </md-editor-v3>
  <md-catalog
    :editor-id="state.id"
    :scroll-element="scrollElement"
    class="log"
  />
  <!-- <div class="box">
    <div class="content" ref="scrollElement">
      <a name="md-editor-v3" href="">aaaa</a>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import MdEditorV3 from "md-editor-v3"
import "md-editor-v3/lib/style.css"

const { MdCatalog } = MdEditorV3

const state = reactive({
  theme: "dark",
  text: "## 😲 md-editor-v3\n\nMarkdown 编辑器，vue3 版本，使用 jsx 模板 和 typescript 开发，支持切换主题、prettier 美化文本等。\n\n### 🤖 基本演示\n\n**加粗**，<u>下划线</u>，_斜体_，~删除线~，上标<sup>26</sup>，下标<sub>[1]</sub>，`inline code`，[超链接](https://imzbf.cc)\n\n> 引用：这是一段引用。\n\n![mark and Emoji extension](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)\n\n## 🤗 代码演示\n\n```vue\n<template>\n  <md-editor v-model=\"text\" />\n</template>\n\n<script setup>\nimport { ref } from 'vue';\nimport MdEditor from 'md-editor-v3';\nimport 'md-editor-v3/lib/style.css';\n\nconst text = ref('Hello Editor!');",
  id: "my-editor"
})

const scrollElement = ref(document.documentElement)
</script>
<style scoped>
.log {
  position: fixed;
  right: 0;
  top: 300px;
  width: 300px;
  max-height: 600px;
}
.box {
  height: 100px;
  overflow-y: scroll;
}
.content {
  height: 200px;
}
</style>
