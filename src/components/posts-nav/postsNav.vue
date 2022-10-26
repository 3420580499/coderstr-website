<template>
  <div class="posts_nav box_shadow_custom">
    <div style="border-bottom: 1px solid #e4e6eb; padding-bottom: 15px">
      目录
    </div>
    <md-catalog editor-id="default_editor" :scroll-element="scrollElement" />
  </div>
</template>

<script setup lang="ts">
import MdEditorV3 from "md-editor-v3"
import { ref } from "vue"
import "md-editor-v3/lib/style.css"

const { MdCatalog } = MdEditorV3
const scrollElement = ref(document.documentElement)
</script>

<style scoped lang="less">
.posts_nav {
  position: sticky;
  top: 40px;
  background-color: #fff;
  max-height: 575px;
  overflow-y: scroll;
  padding: 20px;
  border-radius: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  :deep(.md-catalog-active > span) {
    color: #036aca !important;
  }
  :deep(.md-catalog-link span:hover) {
    color: #036aca !important;
  }
  .md-catalog {
    padding-top: 14px;
  }
}
</style>
