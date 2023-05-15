<template>
  <div class="user-message">
    <div class="user-message-box">
      <div class="message-content">
        <h3 class="edit-user-title">编辑个人信息</h3>
        <el-form label-width="85px">
          <el-form-item label="姓名:">
            <el-input v-model="userMessageData.username" placeholder="请输入姓名"/>
          </el-form-item>
          <el-form-item label="昵称:">
            <el-input v-model="userMessageData.nickname" placeholder="请输入昵称"/>
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio-group v-model="userMessageData.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="userMessageData.phone" placeholder="请输入手机号"/>
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input v-model="userMessageData.email" placeholder="请输入邮箱"/>
          </el-form-item>
          <el-form-item label="出生日期:">
            <el-date-picker
              v-model="userMessageData.birthDay"
              type="date"
              placeholder="出生日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="地址:">
            <el-input v-model="userMessageData.address" placeholder="请输入地址"/>
          </el-form-item>
          <el-form-item label="介绍:">
            <el-input v-model="userMessageData.introduce" type="textarea" placeholder="请输入介绍"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUserBtn">保存</el-button>
            <el-button @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="message-img">
        <img :src="getRemoteImgPath(userInfo.avatarUrl)" />
        <el-upload
          :action="getUpdateImg()"
          :on-success="updateUserImgSuccess"
          :headers="{'Authorization': `Bearer ${local.getItem('token')}`}"
        >
          <el-button type="primary" class="img_update_button"
            >修改头像</el-button
          >
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia"
import { getRemoteImgPath } from '@/utils/getStaticImgPath'
import local from "@/utils/localStorage";
import { ElMessage } from "element-plus"


const userStore = useUserStore()

const { userInfo } = storeToRefs(userStore)
userStore.fetchgetUserByToken()


// import { useStore } from "vuex";
// import BASE_URL from "../../../network/config";
// import message from "../../../global/message_alert";
// const store = useStore();
console.log(userStore.userInfo);

const userMessageData = ref({
  username: userStore.userInfo.username || "",
  nickname: userStore.userInfo.nickname || "",
  introduce: userStore.userInfo.introduce || "",
  sex: userStore.userInfo.sex || 0,
  birthDay: userStore.userInfo.birthDay || "",
  phone: userStore.userInfo.phone || "",
  email: userStore.userInfo.email || "",
  address: userStore.userInfo.address || ""
})

//更新图片
const getUpdateImg = () => {
  return `${import.meta.env.VITE_REMOTE_SERVER_BASEURL}upload/updateUserImg`;
};
//图片上传文件上传成功时的钩子
const updateUserImgSuccess = (res: any) => {
  userStore.changeUserInfo({
    avatarUrl: res.data.avatarUrl
  })
  if (res.code === 200) {
    ElMessage.success("头像更新成功")
  } else {
    ElMessage.error("头像更新失败")
  }
};
// //我们要将userInfo中的信息赋值为userMessageData
// //这里不能写浅拷贝(浅拷贝的话userMessageData的值就一直跟userInfo一样了)
// //userMessageData = { ...store.state.user Info };
// //写深拷贝
// //如果上面写的是reactive的话，下面这样赋值就不是响应式的了，所以还是使用ref
// userMessageData.value = JSON.parse(JSON.stringify(store.state.userInfo));
// //图片url处理
// const getBaseImgUrl = (url: string) => {
//   return BASE_URL + url;
// };
// //更新图片
// const getUpdateImg = (id: number) => {
//   return `${BASE_URL}/updateImg?id=${id}`;
// };
// //图片上传文件上传成功时的钩子
// const updateUserImgSuccess = (res: any) => {
//   store.commit("setUserAvator", res.avator);
//   if (res.code === 1) {
//     message(true, "头像更新成功", "success");
//   } else {
//     message(true, "头像更新失败", "success");
//   }
// };
//保存并更新用户数据
const updateUserBtn = () => {
  //更新用户数据
  userStore.updateUser(userMessageData.value)
}

</script>

<style scoped lang="less">
.user-message {
  .user-message-box {
    width: 900px;
    height: auto;
    display: flex;
    background: #fff;
    .message-content {
      flex: 1;
      .edit-user-title {
        // margin: 15px auto;
        margin-top: 5px;
        margin-bottom: 15px;
      }
    }
    .message-img {
      flex: 1;
      padding-left: 100px;
      padding-top: 95px;
      img {
        width: 175px;
      }
      .img_update_button {
        margin-top: 20px;
        margin-left: 43px;
      }
    }
  }
}
</style>
