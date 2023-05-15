import { defineStore, storeToRefs } from "pinia"
import { getRemoteImgPath } from "@/utils/getStaticImgPath"
import { userLogin, userRegister, userByToken, getUpdateUser, getLikeAndReadCount,getPostsCount,getLikeTop,getReadTop } from "@/api/mode1"
import local from "@/utils/localStorage"
import { ElMessage } from "element-plus"
import router from "@/router"
import { getDate } from "@/utils/formateDate"

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: "小布丁",
    avatar: "static/avatar_default/810727fdd6c178f4f3ac06be3c30657d.jpeg",
    userInfo: local.getItem("userInfo") ?? null,
    token: local.getItem("token") ?? null,
    postCountData:[] as Array<any>,
    likeAndReadData:{} as any,
    likeTopData:[] as Array<any>,
    readTopData:[] as Array<any>
  }),
  getters: {
    getAvatar: (state) => getRemoteImgPath(state.avatar)
  },
  actions: {
    async fetchUserLogin(payload: any) {
      // 如果网络请求响应码不是200,会走响应拦截器，这里的result直接是null
      const result = await userLogin(payload)
      if (result) {
        ElMessage.success("登录成功")
        local.setItem("token", result.data.token)
        this.fetchgetUserByToken()
        router.push("/home")
      }
    },
    async fetchUserRegister(payload: any) {
      const result = await userRegister(payload)
      if (result) {
        ElMessage.success("注册成功，请前往登录")
      }
    },
    // 根据本地存好的token获取用户信息
    async fetchgetUserByToken() {
      const result = await userByToken()
      if (result) {
        this.userInfo = result.data
        local.setItem("userInfo", result.data)
      }
    },
    // 根据本地存好的token获取用户信息
    async changeUserInfo(payload: any) {
      console.log(payload);
      this.userInfo= {...this.userInfo,...payload}
      local.setItem('userInfo', {...this.userInfo,...payload})
    },
    // 更新用户信息
    async updateUser(payload:any) {
      const result = await getUpdateUser(payload);
      if (result.code === 200) {
        ElMessage.success("更新成功")
        this.userInfo = result.data
        local.setItem('userInfo', result.data)
      } else {
        ElMessage.error("更新失败")
      }
    },

    // 初始化我的数据概览信息
    async initOverview() {
      const result = await Promise.all([
        getPostsCount(),
        getLikeAndReadCount(),
        getLikeTop(),
        getReadTop(),
      ])
      console.log(result);
      
      this.postCountData = result[0].data
      this.likeAndReadData = result[1].data
      this.likeTopData = result[2].data
      this.readTopData = result[3].data

    }
  }
})
