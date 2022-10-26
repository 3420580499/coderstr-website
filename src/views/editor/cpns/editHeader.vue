<template>
  <div class="edit-header">
    <el-input
      v-model="inputValue"
      placeholder="请输入标题"
      class="w-50 m-2"
      size="large"
      maxlength="50"
      show-word-limit
      @input="inputChange"
    />
    <el-button type="primary" @click="publishClick">发布</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const emit = defineEmits<{
  (e: "publishHandleClick", value: string, showDraw: boolean): void
}>()
const inputValue = ref<string>("")
const publishClick = () => {
  emit("publishHandleClick", inputValue.value, true)
}
const inputChange = () => {
  emit("publishHandleClick", inputValue.value, false)
}
</script>

<style scoped lang="less">
.edit-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-input {
    width: 50%;
  }
  .el-button {
    margin-right: 20px;
  }
}
</style>
