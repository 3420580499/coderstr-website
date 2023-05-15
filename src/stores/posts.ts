import { defineStore } from "pinia"
import {
  getPostsById,
  getCreateComment,
  getSortPostsList
} from "@/api/mode1/index"

import { getTime } from "@/utils/formateDate"

type postsStoreType = {
  postsDetailInfo: any
}
export const usePostsStore = defineStore({
  id: "posts",
  state: () => ({
    postsDetailInfo: {
      id: "0",
      comments: []
    },
    // 所选某一个分类的文章列表
    sortPostsList: [] as Array<any>,
    // 该文章列表处于第几页
    page: 0,
    // 当前排序规则
    currentRule: 1,
    // 当前列表展示模式
    currentMode: 2,
    //动态列表 分类sort=6
    dynamicList:[] as Array<any>,
    // 动态列表的请求页
    dynamicPage: 0,
    // 动态列表当前排序规则
    dynamicCurrentRule: 1,
  }),
  getters: {},
  actions: {
    // 获取文章详情，拿到一篇文章的所有数据
    async setPostsDetailInfo(id: any) {
      const result = await getPostsById(id)
      this.postsDetailInfo = result.data
      console.log(1111)
    },
    // 用户评论，（区别是评论文章还是评论别人的评论）
    async changeComments(payload: any) {
      if (!payload.replayId) {
        payload["postId"] = this.postsDetailInfo.id
      }
      console.log(payload)
      await getCreateComment(payload)
      await this.setPostsDetailInfo(this.postsDetailInfo.id)
    },
    // 点击分类来请求文章列表
    async changeSortPostsList({ sortId, size }: any) {
      console.log(this.page)
      if (this.page === 0) {
        const result = await getSortPostsList(sortId, 1, size, this.currentRule)
        if (!result.data) result.data = []
        this.sortPostsList = result.data
        this.page = ++this.page
      } else {
        this.page = ++this.page
        const result = await getSortPostsList(
          sortId,
          this.page,
          size,
          this.currentRule
        )
        if (!result.data) {
          result.data = []
        } else {
          // this.page = ++this.page
        }
        this.sortPostsList.push(...result.data)
      }
    },
    // 点击动态来请求动态列表
    async changedynamicList({ size }: any) {
      console.log(this.dynamicPage)
      if (this.dynamicPage === 0) {
        const result = await getSortPostsList('6', 1, size, this.dynamicCurrentRule)
        if (!result.data) result.data = []
        this.dynamicList = result.data
        this.dynamicPage = ++this.dynamicPage
      } else {
        this.dynamicPage = ++this.dynamicPage
        const result = await getSortPostsList(
          '6',
          this.dynamicPage,
          size,
          this.dynamicCurrentRule
        )
        if (!result.data) {
          result.data = []
        } else {
          // this.dynamicPage = ++this.dynamicPage
        }
        this.dynamicList.push(...result.data)
      }
    },
    async ruleClickChangeSortPostsList({ sortId, size }: any) {
      this.page = 0
      this.changeSortPostsList({ sortId, size })
    }

    //根据当前排序规则对sortPostsList进行重新排序
    // 在前端这里排序有点不妥，后面出的数据可能会直接刷到前面取
    // async orderSortPostsList() {
    //   switch (this.currentRule) {
    //     case 1:
    //       this.sortPostsList.sort((x, y) => {
    //         return getTime(y.createAt) - getTime(x.createAt)
    //       })
    //       break
    //     case 2:
    //       this.sortPostsList.sort((x, y) => {
    //         return y.readCount - x.readCount
    //       })
    //       break
    //     case 3:
    //       this.sortPostsList.sort((x, y) => {
    //         return y.likeCount - x.likeCount
    //       })
    //       break
    //     default:
    //       return
    //   }
    // }
  }
})
