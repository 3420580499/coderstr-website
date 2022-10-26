<template>
  <div class="comment-item">
    <div class="left_cover">
      <img
        :src="getRemoteImgPath(itemData[0].author?.avatarUrl)"
        alt=""
        class="comment_cover_img"
      />
    </div>
    <div class="right_content">
      <div class="author_first">
        <div class="author_name">{{ itemData[0].author?.username }}</div>
        <div class="content">{{ itemData[0].content }}</div>
        <div class="dig_replay" style="margin-top: 10px; margin-bottom: 10px">
          <div class="dig_info">
            <DigIcon />
            <div>
              {{ itemData[0].likeCount == 0 ? "点赞" : itemData[0].likeCount }}
            </div>
          </div>
          <div class="replay_info" @click="replayChangeClick(itemData[0].id)">
            <ReplayIcon />
            <div>回复</div>
          </div>
        </div>
        <div class="inner_repaly_input" v-if="itemData[0].id == replayId">
          <CommentInput
            @contentChange="contentChange"
            @commitCommentClick="commitCommentClick"
          />
        </div>
        <div class="children_comment">
          <div
            class="children_comment_box"
            v-for="item in [...itemData].slice(1, itemData.length)"
            :key="item.id"
          >
            <div class="children_left_cover">
              <img
                :src="getRemoteImgPath(item.author?.avatarUrl)"
                alt=""
                class="comment_cover_img"
              />
            </div>
            <div class="children_right_content">
              <div class="author_name">
                {{ item.author?.username
                }}<span style="color: #8a919f"> 回复 </span>
                <span>{{ "@" + item.replay.author.username }}</span>
              </div>
              <div class="content">{{ item.content }}</div>
              <div
                class="children_dig_replay"
                style="margin-top: 10px; margin-bottom: 10px"
              >
                <div class="children_dig_info">
                  <DigIcon />
                  <div>
                    {{ item.likeCount == 0 ? "点赞" : item.likeCount }}
                  </div>
                </div>
                <div
                  class="children_replay_info"
                  @click="replayChangeClick(item.id)"
                >
                  <ReplayIcon />
                  <div>回复</div>
                </div>
              </div>
              <div
                class="children_inner_repaly_input"
                v-if="item.id == replayId"
              >
                <CommentInput
                  @contentChange="contentChange"
                  @commitCommentClick="commitCommentClick"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRemoteImgPath } from "@/utils/getStaticImgPath"
import DigIcon from "@/assets/svg/digIcon.vue"
import ReplayIcon from "@/assets/svg/replayIcon.vue"
import CommentInput from "@/base-ui/comment-input/commentInput.vue"
import { usePostsStore } from "@/stores/posts"
import { ref } from "vue"

const content = ref<string>("")
const postsStore = usePostsStore()
const props = defineProps<{
  itemData: any
}>()
//回复某个评论的id
const replayId = ref<string>("0")
const replayChangeClick = (id: string) => {
  if (replayId.value == id) {
    replayId.value = "0"
    return
  }
  replayId.value = id
}

const contentChange = (value: string) => {
  content.value = value
}
const commitCommentClick = () => {
  postsStore.changeComments({
    replayId: replayId.value,
    content: content.value
  })
  replayId.value = '0'
}
</script>

<style scoped lang="less">
.comment-item {
  margin-bottom: 28px;
  display: flex;
  .left_cover {
    margin-right: 15px;
    .comment_cover_img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
    }
  }
  .right_content {
    flex: 1;
    .author_first {
      .content {
        margin-top: 15px;
      }
      .dig_replay {
        display: flex;
        .dig_info {
          color: #8a919f;
          display: flex;
          &:hover {
            color: #1e80ff;
          }
        }
        .replay_info {
          color: #8a919f;
          display: flex;
          margin-left: 10px;
          &:hover {
            color: #1e80ff;
          }
        }
      }
      .children_comment {
        margin-top: 20px;
        background-color: #f9fafb;
        border-radius: 8px;
        .children_comment_box {
          padding: 15px;
          display: flex;
          .children_left_cover {
            margin-right: 15px;
            .comment_cover_img {
              width: 40px;
              height: 40px;
              border-radius: 100%;
            }
          }
          .children_right_content {
            flex: 1;
            .content {
              margin-top: 15px;
            }
            .children_dig_replay {
              display: flex;
              .children_dig_info {
                color: #8a919f;
                display: flex;
                &:hover {
                  color: #1e80ff;
                }
              }
              .children_replay_info {
                color: #8a919f;
                display: flex;
                margin-left: 10px;
                &:hover {
                  color: #1e80ff;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
