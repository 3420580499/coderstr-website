<template>
  <div class="edit">
    <edit-header @publishHandleClick="publishClick" />
    <el-drawer v-model="drawer" title="发布文章" class="el_drawer">
      <div class="drawer-content">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="80px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
          label-position="left"
        >
          <el-form-item label="添加标签" prop="tags">
            <el-select
              v-model="ruleForm.tags"
              placeholder="请选择标签"
              multiple
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in tagOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="文章封面">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:8013/upload/PostsCoverImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="headers"
            >
              <img
                v-if="ruleForm.coverImg"
                :src="'http://localhost:8013/' + ruleForm.coverImg"
                class="avatar"
              />
              <el-icon v-else class="avatar-uploader-icon"
                ><Plus />
                <div class="tip_font">上传封面</div></el-icon
              >
            </el-upload>
          </el-form-item>
          <el-form-item label="编辑摘要" prop="summary">
            <el-input
              v-model="ruleForm.summary"
              type="textarea"
              :autosize="{ minRows: 4 }"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
          <el-form-item>
            <div class="operate">
              <el-button type="primary" @click="submitForm(ruleFormRef)"
                >确认并发布</el-button
              >
              <el-button @click="resetForm(ruleFormRef)">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <md-editor
      v-model="ruleForm.content"
      preview-theme="smart-blue"
      @on-upload-img="onUploadImg"
      @on-html-changed="onHtmlChanged"
      class="md_editor"
    >
    </md-editor>
  </div>
</template>

<script setup lang="ts">
import MdEditor from "md-editor-v3"
import "md-editor-v3/lib/style.css" 
import { ref, reactive, watch } from "vue"
import axios from "axios"
import EditHeader from "./cpns/editHeader.vue"
import { type UploadProps, ElMessage } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"

import { getTagsOfSearch, createPosts, updatePosts } from "@/api/mode1/index"

const drawer = ref(false)
const loading = ref(false)
const tagOptions = ref<
  Array<{
    name: string
    id: string
  }>
>([])
const publishClick = (titleValue: string, showDraw: boolean) => {
  ruleForm.title = titleValue
  drawer.value = showDraw
}
const headers = ref()
headers.value = {
  Authorization: "Bearer " + localStorage.getItem("token")
}

const remoteMethod = async (query: string) => {
  loading.value = true
  const result = await getTagsOfSearch(query)
  loading.value = false
  tagOptions.value = result.data
}

const onUploadImg = async (files: any, callback: any) => {
  const res = await Promise.all(
    files.map((file: any) => {
      return new Promise((rev, rej) => {
        const form = new FormData()
        form.append("file", file)
        axios
          .post("http://127.0.0.1:8013/upload/postsDetailImg", form, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then((res) => rev(res))
          .catch((error) => rej(error))
      })
    })
  )
  callback(
    res.map((item) => {
      return `http://127.0.0.1:8013/${item.data.data}`
    })
  )
}
const onHtmlChanged = (h: string) => {
  ruleForm.contentHtml = h
}
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  ruleForm.coverImg = response.data
}

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("请上传.jpg格式的文件")
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("文件大小不要超过2MB!")
    return false
  }
  return true
}

// 表单逻辑
const formSize = ref("default")
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  summary: "Hello coderer start!",
  tags: [],
  title: "",
  coverImg: "",
  content: "",
  contentHtml: ""
})
// 监听到数据变化时，自动创建一篇草稿状态的文字
const postsId = ref<string>("0")

watch(ruleForm, async (newValue, oldValue) => {
  // 先发起创建请求后更新请求
  if (postsId.value === "0") {
    //拿到现有的数据去创建
    const result = await createPosts({ ...ruleForm, tags: [...ruleForm.tags] })
    postsId.value = result.data.id
  } else {
    //携带现有的数据和返回的postId去更新
    updatePosts(postsId.value, { ...ruleForm, tags: [...ruleForm.tags] })
  }
})
//
const checkTags = (rule: any, value: any, callback: any) => {
  console.log(value.length)
  if (value.length > 3) {
    return callback(new Error("最多选择3个标签"))
  } else {
    return callback()
  }
}
const rules = reactive<FormRules>({
  summary: [
    { required: true, message: "请输入文章摘要", trigger: "blur" },
    { min: 50, max: 100, message: "摘要最少50字,最多100字", trigger: "blur" }
  ],
  tags: [
    {
      required: true,
      message: "请选择标签",
      trigger: "change"
    },
    { validator: checkTags, trigger: "change" }
  ],
  count: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change"
    }
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change"
    }
  ],
  date2: [
    {
      type: "date",
      required: true,
      message: "Please pick a time",
      trigger: "change"
    }
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change"
    }
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change"
    }
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "blur" }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!")
    } else {
      console.log("error submit!", fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`
}))
</script>

<style scoped lang="less">
.edit {
  .md_editor {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 60px;
  }
  :deep(.el-drawer__header) {
    color: #2d2d2d !important;
    padding-bottom: 10px;
    border-bottom: 1px solid #c1c1c1;
  }
}
.avatar-uploader .avatar {
  width: 138px;
  height: 138px;
  display: block;
}
.tip_font {
  font-size: 18px;
  color: #8c939d;
}
.operate {
  margin-top: 20px;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 138px;
  height: 138px;
  text-align: center;
  flex-direction: column;
}
</style>
