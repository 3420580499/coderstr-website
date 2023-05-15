import { defineStore } from "pinia"

// 还未验证，验证通过，验证失败
export enum verifyType {
  NOVERIFY = 0,
  VERIFYSUCCESS = 1,
  VERIFYFAIL = 2
}
export const useLoginStore = defineStore({
  id: "login",
  state: () => ({
    // 登录中的滑块验证是否通过
    isSliderVerify: verifyType.NOVERIFY
  }),
  getters: {},
  actions: {}
})
