<template>
  <div class="input_value">
    <el-input
      v-model="content"
      :rows="2"
      type="textarea"
      placeholder="输入评论"
      @input="inputValueChange"
    />
    <el-button type="primary" @click="commitComment">发表评论</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const content = ref<string>("")
const emit = defineEmits<{
  (e: "contentChange", value: string): void
  (e: "commitCommentClick"): void
}>()
const inputValueChange = (value: string) => {
  emit("contentChange", value)
}
const commitComment = () => {
  emit("commitCommentClick")
}
</script>

<style scoped lang="less">
.input_value {
  flex: 1;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .el-button {
    margin-top: 8px;
  }
}
</style>
