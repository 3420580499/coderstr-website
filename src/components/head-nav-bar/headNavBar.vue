<template>
  <div class="head_nav_bar">
    <div class="container">
      <a href="/" class="logo">
        <div>
          <img src="@/assets/img/icon-test.png" alt="" class="icon_logo" />
          <img
            src="@/assets/img/coderstart_font.png"
            alt=""
            class="font_logo"
            style="height: 32px; width: 140px"
          />
        </div>
      </a>
      <div class="content">
        <div class="left">
          <!-- pc端显示这个 -->
          <div v-for="(item, index) in menuArray" :key="index" class="item">
            <a
              :href="item.path"
              class="menu_a"
              @click="menuChangeClick($event, item.path)"
              :class="{ active: route.path.includes(item.path) }"
              >{{ item.name }}</a
            >
          </div>
          <!-- mobile端显示这个 -->
          <div class="mobile_select_menu">
            <el-select
              v-model="currentRoutePath"
              placeholder="首页"
              @change="selectChange"
            >
              <el-option
                v-for="item in menuArray"
                :key="item.name"
                :label="item.name"
                :value="item.path"
              />
            </el-select>
          </div>
        </div>
        <div class="right">
          <el-button type="primary" @click="editPostClick">创作</el-button>
          <el-button @click="gologinPage" v-if="!userStore.userInfo"
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userByToken } from "@/api/mode1"
import menuArray from "@/assets/ts/data_nav_menu"
import { useUserStore } from "@/stores/user"
import local from "@/utils/localStorage"
import { ref, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
// head是否是固定定位可以交给store来控制！

const router = useRouter()
const route = useRoute()
const currentRoutePath = ref("/home")
const userStore = useUserStore()

const menuChangeClick = (e: MouseEvent, path: string) => {
  e.preventDefault()
  currentRoutePath.value = path
  router.push(path)
}
const selectChange = (value: string) => {
  router.push(value)
}
watchEffect(() => {
  currentRoutePath.value = route.path
})
const editPostClick = () => {
  router.push("/edit")
}
const gologinPage = () => {
  router.push("/login")
}
</script>

<style scoped lang="less">
.head_nav_bar {
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .el-select :deep(.el-input__inner) {
    width: 30px;
  }
  .container {
    display: flex;
    align-items: center;
    height: 60px;
    max-width: 1440px;
    margin: 0 auto;
    .logo {
      margin-left: 15px;
      display: block;
      .font_logo {
        @media screen and (max-width: 800px) {
          display: none;
        }
      }
    }
    .content {
      flex: 1;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      margin-left: 15px;
      .left {
        display: flex;
        .mobile_select_menu {
          display: none;
        }
        @media screen and (max-width: 960px) {
          .item {
            display: none;
          }
          .mobile_select_menu {
            display: block;
          }
        }
        .item {
          padding-left: 12px;
          padding-right: 12px;
          .menu_a {
            display: block;
            text-decoration: none;
            color: black;
          }
          .active {
            color: #007fff;
          }
        }
      }
    }
  }
}
</style>
