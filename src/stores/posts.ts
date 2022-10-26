import { defineStore } from "pinia"
import { getPostsById, getCreateComment } from "@/api/mode1/index"

type postsStoreType = {
  postsDetailInfo: any
}
export const usePostsStore = defineStore({
  id: "posts",
  state: () => ({
    postsDetailInfo: {
      id: "0",
      comments: []
    }
  }),
  getters: {},
  actions: {
    async setPostsDetailInfo(id: string) {
      const result = await getPostsById(id)
      this.postsDetailInfo = result.data
    },
    async changeComments(payload: any) {
      if (!payload.replayId) {
        payload["postId"] = this.postsDetailInfo.id
      }
      console.log(payload)
      await getCreateComment(payload)
      await this.setPostsDetailInfo(this.postsDetailInfo.id)
      // this.postsDetailInfo.comments = []
    }
  }
})
