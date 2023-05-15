<template>
  <div class="login">
    <div class="login_left">
      <div class="login_section">
        <div class="logo">
          <div>
            <img src="@/assets/img/icon-test.png" alt="" class="icon_logo" />
            <img
              src="@/assets/img/coderstart_font.png"
              alt=""
              class="font_logo"
              style="height: 32px; width: 140px"
            />
          </div>
          <div class="version">V1.1.0</div>
        </div>
        <div class="title">始于coder,掌握更好的技术</div>
        <div class="desc">致力于分享更好的文章</div>
        <div class="login_bg">
          <div class="login_gif">
            <img src="@/assets/img/head_center_left.gif" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="login_right">
      <SliderVerify
        v-if="sliderVConf.isShowSelf"
        :imgUrl="sliderVConf.imgUrl"
        :sText="sliderVConf.sText"
        :eText="sliderVConf.eText"
        v-model:isShowSelf="sliderVConf.isShowSelf"
        :isBorder="sliderVConf.isBorder"
        :isParentNode="sliderVConf.isParentNode"
        :isCloseBtn="sliderVConf.isCloseBtn"
        :isReloadBtn="sliderVConf.isReloadBtn"
        :width="sliderVConf.width"
        :height="sliderVConf.height"
        @reload="emitChange('reload')"
        @show="emitChange('show')"
        @hide="emitChange('hide')"
        @close="emitChange('close')"
        @success="emitChange('success')"
        @fail="emitChange('fail')"
        class="sliderVerify"
      ></SliderVerify>
      <component
        :is="loginComponent"
        @changeLoginComponentHandle="changeComponent"
        @verifyInputClick="verifySlider"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore, verifyType } from "@/stores/login"
import { ref, shallowRef } from "vue"
import LoginBox from "./cpns/LoginBox.vue"
import LoginRegisterBox from "./cpns/LoginRegister.vue"
import { getLoginSliderImg } from "@/utils/getStaticImgPath"

const loginStore = useLoginStore()
const loginComponent = shallowRef<any>(LoginBox)
const getVerifyImageUrl = () => {
  return `${getLoginSliderImg()}${
    Math.floor(Math.random() * 100) + 1
  }/400/200`
}
console.log(getVerifyImageUrl())

// 使用静态的滑块验证，不使第三方如：阿里云验证，需要收费（可以提供更好的安全保障，防机器人，脚本等）
const sliderVConf = ref({
  isShowSelf: false,
  width: 300,
  height: 180,
  imgUrl: getVerifyImageUrl(),
  sText: "验证成功",
  eText: "验证失败",
  isBorder: true,
  isCloseBtn: true,
  isReloadBtn: true,
  isParentNode: false
})
const changeComponent = (value: boolean) => {
  if (value) loginComponent.value = LoginBox
  else loginComponent.value = LoginRegisterBox
}
const emitChange = (value: string) => {
  if (value === "success") {
    loginStore.isSliderVerify = verifyType.VERIFYSUCCESS
    setTimeout(() => {
      sliderVConf.value.isShowSelf = false
    }, 800)
  }
  if (value === "fail") {
    loginStore.isSliderVerify = verifyType.VERIFYFAIL
    setTimeout(() => {
      sliderVConf.value.isShowSelf = false
      sliderVConf.value.imgUrl = getVerifyImageUrl()
    }, 800)
  }
}
const verifySlider = (value: boolean) => {
  sliderVConf.value.isShowSelf = value
}
</script>

<style scoped lang="less">
.login {
  height: 100vh;
  display: flex;
  .login_left {
    @media screen and (max-width: 1100px) {
      display: none;
    }
    width: 780px;
    background-color: #f8f8fe;
    .login_section {
      margin-top: 170px;
      text-align: center;
      .logo {
        display: flex;
        align-items: center;
        justify-content: center;

        .version {
          color: #3a86ff;
          font-size: 14px;
          padding-top: 3px;
          margin-left: 8px;
        }
      }
      .title {
        height: 80px;
        margin: 20px auto 0;
        font-weight: 600;
        font-size: 30px;
        line-height: 80px;
        color: #333;
      }
      .desc {
        height: 34px;
        margin: 4px auto 0;
        font-size: 18px;
        line-height: 34px;
        text-align: center;
        color: #666;
      }
      .login_bg {
        .login_gif {
          width: 320px;
          margin: 0 auto;
          margin-top: 40px;
          img {
            width: 100%;
          }
        }
      }
    }
  }
  .login_right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .sliderVerify {
      background-color: #fff;
      position: absolute;
      z-index: 99999;
    }
  }
}
</style>
