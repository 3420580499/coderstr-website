<template>
  <div class="login_register">
    <div class="header">
      <div
        class="account_register"
        :class="{ active: loginMode === 1 }"
        @click="loginMode = 1"
      >
        账号注册
      </div>
      <div
        class="wx_register"
        :class="{ active: loginMode === 2 }"
        @click="loginMode = 2"
      >
        <img src="@/assets/svg/weixin.233.svg" alt="" style="height: 24px" />
        <div>微信注册</div>
      </div>
    </div>
    <div class="content" v-show="loginMode === 1">
      <el-form :rules="rules" :model="registerData" ref="registerForm">
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="registerData.username"
            placeholder="请输入账号"
            style="height: 50px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="registerData.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input
            v-model="registerData.nickname"
            placeholder="请输入昵称"
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
          <el-checkbox v-model="isRember">阅读并同意</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginBtn" @click="registerBtnClick"
            >立即注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="footer" v-show="loginMode === 1">
      <div @click="changeLoginComponent" class="go_login">登录已有账号</div>
    </div>
    <div v-show="loginMode === 2">开发中。。。</div>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore, verifyType } from "@/stores/login"
import { useUserStore } from "@/stores/user"
import { ElMessage } from "element-plus"
import { ref, reactive, watchEffect } from "vue"

const loginMode = ref<number>(1)
const userStore = useUserStore()
const loginStore = useLoginStore()
const verifyPlaceHolder = ref("点击我开始验证")
const verifyInputColor = ref("blue")
const isRember = ref(false)
const registerForm = ref()
const registerData = reactive({
  // name: local.getItem("name") || "",
  username: "",
  // password: local.getItem("password") || ""
  password: "",
  nickname: ""
})
const rules = {
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }]
}
const verifyInputClick = () => {
  if (loginStore.isSliderVerify === verifyType.VERIFYSUCCESS) return
  emit("verifyInputClick", true)
}
const emit = defineEmits<{
  (e: "changeLoginComponentHandle", value: boolean): void
  (e: "verifyInputClick", value: boolean): void
}>()
const changeLoginComponent = () => {
  emit("changeLoginComponentHandle", true)
  loginStore.isSliderVerify = verifyType.NOVERIFY
}
const registerBtnClick = () => {
  if (loginStore.isSliderVerify !== verifyType.VERIFYSUCCESS)
    return ElMessage.error("请先通过验证")
  registerForm.value?.validate((valid: boolean) => {
    if (valid) {
      userStore.fetchUserRegister({ ...registerData })
    }
  })
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
.login_register {
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
    .wx_register {
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
    .go_login {
      text-align: center;
      height: 42px;
      color: #287eff;
      font-size: 14px;
      cursor: pointer;
    }
  }
  :deep(.el-input__inner) {
    font-size: 17px;
    height: 42px;
  }
}
</style>
