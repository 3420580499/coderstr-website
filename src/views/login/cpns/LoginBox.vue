<template>
  <div class="login_box">
    <div class="header">
      <div
        class="account_login"
        :class="{ active: loginMode === 1 }"
        @click="loginMode = 1"
      >
        账号登录
      </div>
      <div
        class="wx_login"
        :class="{ active: loginMode === 2 }"
        @click="loginMode = 2"
      >
        <img src="@/assets/svg/weixin.233.svg" alt="" style="height: 24px" />
        <div>微信登录</div>
      </div>
    </div>
    <div class="content" v-show="loginMode === 1">
      <el-form :rules="rules" :model="loginData" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginData.username"
            placeholder="请输入账号"
            style="height: 50px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginData.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="verify_item">
          <el-input
            readonly
            v-model="verifyPlaceHolder"
            class="verify_input"
            @click="verifyInputClick"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginBtn" @click="loginBtnClick"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="footer" v-show="loginMode === 1">
      <div @click="changeLoginComponent" class="go_register">
        没有账号，立即注册>
      </div>
      <div class="rember_login">
        <el-checkbox v-model="isRember">记住登录</el-checkbox>
      </div>
    </div>
    <div v-show="loginMode === 2">开发中。。。</div>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore, verifyType } from "@/stores/login"
import { useUserStore } from "@/stores/user"
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCheckbox,
  ElMessage
} from "element-plus"
import { ref, reactive, watchEffect } from "vue"

//登录表单的数据
const loginData = reactive({
  // name: local.getItem("name") || "",
  username: "",
  // password: local.getItem("password") || ""
  password: ""
})
const loginStore = useLoginStore()
const userStore = useUserStore()
const loginForm = ref()
const verifyPlaceHolder = ref("点击我开始验证")
const verifyInputColor = ref("blue")
const isRember = ref(false)
const loginMode = ref<number>(1)
const emit = defineEmits<{
  (e: "changeLoginComponentHandle", value: boolean): void
  (e: "verifyInputClick", value: boolean): void
}>()
const changeLoginComponent = () => {
  emit("changeLoginComponentHandle", false)
  loginStore.isSliderVerify = verifyType.NOVERIFY
}
const rules = {
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
}
//登录按钮点击
const loginBtnClick = () => {
  if (loginStore.isSliderVerify !== verifyType.VERIFYSUCCESS)
    return ElMessage.error("请先通过验证")
  loginForm.value?.validate((valid: boolean) => {
    if (valid) {
      userStore.fetchUserLogin({ ...loginData })
    }
  })
}
const verifyInputClick = () => {
  if (loginStore.isSliderVerify === verifyType.VERIFYSUCCESS) return
  emit("verifyInputClick", true)
}
watchEffect(() => {
  if (loginStore.isSliderVerify === verifyType.NOVERIFY) {
    verifyPlaceHolder.value = "点击我开始验证"
    verifyInputColor.value = "#5381fd"
  } else if (loginStore.isSliderVerify === verifyType.VERIFYSUCCESS) {
    verifyPlaceHolder.value = "验证成功"
    verifyInputColor.value = "#39c522"
  } else if (loginStore.isSliderVerify === verifyType.VERIFYFAIL) {
    verifyPlaceHolder.value = "验证失败，请重新验证"
    verifyInputColor.value = "#f56c6c"
  }
})
</script>

<style scoped lang="less">
.login_box {
  width: 300px;
  display: block;
  .header {
    display: flex;
    justify-content: space-between;
    width: 300px;
    height: 34px;
    font-weight: 500;
    font-size: 24px;
    color: #666;
    line-height: 34px;
    margin: 0;
    .wx_login {
      display: flex;
      align-items: center;
      img {
        margin-right: 5px;
      }
    }
    .active {
      color: #2b2b2b;
      font-weight: 600;
    }
  }
  .content {
    margin-top: 35px;
    .el-form-item {
      margin-bottom: 30px;
    }
    .verify_item {
      position: relative;
      .verify_input :deep(.el-input__inner) {
        // position: relative;
        color: #2b2b2b;
        font-size: 14px;
      }
      .verify_input :deep(.el-input__wrapper) {
        border: 1px solid transparent;
        border-left: 4px solid transparent;
        border-color: v-bind("verifyInputColor");
      }
      .verify_input :deep(.el-input__wrapper).is-focus {
        box-shadow: 0 0 0 1px transparent;
      }
    }
    .verify_item::after {
      display: block;
      content: "";
      width: 32px;
      height: 32px;
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      z-index: 999;
      background-image: url("@/assets/img/icon-test.png");
    }
    .loginBtn {
      width: 400px;
      height: 45px;
      font-size: 17px;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .go_register {
      color: #287eff;
      font-size: 14px;
      cursor: pointer;
    }
    .rember_login {
      cursor: pointer;
      color: #999999;
    }
  }
  :deep(.el-input__inner) {
    font-size: 17px;
    height: 42px;
  }
}
</style>
