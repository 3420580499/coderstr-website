<template>
  <div>
    <div v-if="postInfo.content">
      <md-editor
      v-model="postInfo.content"
      preview-theme="smart-blue"
      class="md_editor"
      :preview-only="true"
    >
    </md-editor>
    </div>
    <div v-else>
      <el-empty :image-size="200" />
    </div>

  </div>
</template>

<script setup lang="ts">
import {getpostContent} from '@/api/mode1'
import { useRoute } from 'vue-router';
import { ref, watch, watchEffect } from 'vue';
import "md-editor-v3/lib/style.css"
import MdEditor from "md-editor-v3"


const route =  useRoute()
const postInfo = ref<any>({})
  const initInfo = async (id:any) => {
  const result = await getpostContent({
    postId: id
  })
  postInfo.value = result.data
}
watchEffect(() => {
  console.log(route.params.id);
  initInfo(route.params.id)
})

</script>

<style scoped>

</style>