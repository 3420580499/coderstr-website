<template>
  <div class="edit">
    <edit-header @publishHandleClick="publishClick" ref="editHeaderRef"/>
    <el-drawer v-model="drawer" title="发布文章">
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
          <el-form-item label="选择分类" prop="sortId">
            <el-select v-model="ruleForm.sortId" placeholder="请选择分类">
              <el-option
                v-for="item in sortList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="添加标签" prop="tags">
            <el-select
              v-model="ruleForm.tags"
              placeholder="请选择标签"
              multiple
              filterable
            >
              <el-option
                v-for="item in tagsList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="文章封面" prop="coverImg">
            <el-upload
              class="avatar-uploader"
              :action="getRemoteImgPath('upload/PostsCoverImg')"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="headers"
            >
              <img
                v-if="ruleForm.coverImg"
                :src="getRemoteImgPath(ruleForm.coverImg)"
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
import { ref, reactive, watch, watchEffect } from "vue"
import axios from "axios"
import EditHeader from "./cpns/editHeader.vue"
import { type UploadProps, ElMessage } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"

import {
  getTagsOfSearch,
  createPosts,
  updatePosts,
  getAllSorts,
  getMyPostContent,
  getAllTags
} from "@/api/mode1/index"
import { debounce } from "lodash"
import { useRouter, useRoute} from "vue-router"
import local from "@/utils/localStorage"
import { getRemoteImgPath } from "@/utils/getStaticImgPath"

const router = useRouter()
const route = useRoute()

const drawer = ref(false)
const loading = ref(false)
const editHeaderRef = ref<any>(null)
// 分类list
const sortList = ref<Array<any>>([])
const tagsList = ref<Array<any>>([])
const getAllSortsList = async () => {
  const result = await getAllSorts()
  sortList.value = result.data[0]
}
const getAllTagsList = async () => {
  const result = await getAllTags()
  tagsList.value = result.data
}
getAllSortsList()
getAllTagsList()
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
  Authorization: "Bearer " + local.getItem("token")
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
          .post(getRemoteImgPath("upload/postsDetailImg"), form, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + local.getItem("token")
            }
          })
          .then((res) => rev(res))
          .catch((error) => rej(error))
      })
    })
  )
  callback(
    res.map((item) => {
      return getRemoteImgPath(item.data.data)
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
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("请上传.jpg或者.png格式的文件")
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
  contentHtml: "",
  sortId: undefined
})
// 监听到数据变化时，自动创建一篇草稿状态的文字
const postsId = ref<string>("0")

const lodashFn = debounce(async (newValue: any, oldValue: any) => {
  // 先发起创建请求后更新请求
  if (postsId.value === "0") {
    //拿到现有的数据去创建
    const result = await createPosts({ ...ruleForm, tags: [...ruleForm.tags] })
    postsId.value = result.data.id
  } else {
    //携带现有的数据和返回的postId去更新
    updatePosts(postsId.value, { ...ruleForm, tags: [...ruleForm.tags] })
  }
}, 1500)
// 进行防抖处理
watch(ruleForm, lodashFn)
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
  sortId: [{ required: true, message: "请选择分类", trigger: "blur" }],
  coverImg: [{ required: true, message: "请上传封面", trigger: "blur" }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await updatePosts(postsId.value, {
        ...ruleForm,
        tags: [...ruleForm.tags],
        status: "release"
        // 先写死是审核通过状态
        // status: "approved"
      })
      ElMessage({
        message: "发布成功，待审核中",
        type: "success"
      })
      router.push("/")
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

console.log(route.query);
const initRuleInfo =async (route:any) => {
  if (route.query.type === 'reEdit' && route.query.id) {
    postsId.value = route.query.id
    const result = await getMyPostContent({
      postId: route.query.id
    })
    ruleForm.summary = result.data.summary
    ruleForm.tags = result.data.tags.map((item:any) => item.id)
    ruleForm.title = result.data.title
    editHeaderRef.value.inputValue = result.data.title
    ruleForm.coverImg = result.data.coverImg
    ruleForm.content = result.data.content
    ruleForm.contentHtml = result.data.contentHtml
    ruleForm.sortId = result.data.sort.id
    console.log(result);
    
  }
}
watchEffect(() => {
  initRuleInfo(route)
})
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
  :deep(.el-drawer) {
    @media screen and (max-width: 700px) {
      width: 80% !important;
    }
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
