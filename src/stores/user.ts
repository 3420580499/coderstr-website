import { defineStore } from "pinia"
import { getRemoteImgPath } from "@/utils/getStaticImgPath"

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: "小布丁",
    avatar: "static/avatar_default/810727fdd6c178f4f3ac06be3c30657d.jpeg"
  }),
  getters: {
    getAvatar: (state) => getRemoteImgPath(state.avatar)
  },
  actions: {}
})
