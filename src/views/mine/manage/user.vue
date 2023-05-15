<template>
  <div style="width: 100%" class="user-manage">
    <el-form label-width="65px" class="form">
      <el-form-item label="用户名:">
        <el-input v-model="searchParams.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="角色:">
        <el-select v-model="searchParams.role" placeholder="请选择角色" >
          <el-option value="readers" label="读者">读者</el-option>
          <el-option value="author" label="作者">作者</el-option>
          <el-option value="admin" label="管理员">管理员</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="display: flex;justify-content: space-between;">
      <el-button type="primary" @click="addClick">新增</el-button>
      <div>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" row-style="height:50px" class="table-data" v-loading="loading">
      <el-table-column fixed prop="username" label="用户名" width="100" />
      <el-table-column prop="nickname" label="昵称" width="180" />
      <el-table-column prop="address" label="地址" width="180" show-overflow-tooltip/>
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="introduce" label="介绍" width="180" show-overflow-tooltip/>
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="role" label="角色" width="180" >
        <template #default="scope">
          <div>{{ roleDict[scope.row.role] }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-tooltip content="编辑" placement="top">
            <el-icon class="edit-icon" @click="editClick(scope.row)">
              <Edit/>
            </el-icon>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="searchParams.page"
      v-model:page-size="searchParams.size"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchParams.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      style="justify-content: right;margin: 25px 0;"
    />
    <el-dialog
    v-model="dialogVisible"
    title="编辑用户"
    width="30%"
  >
  <el-form label-width="65px">
          <el-form-item label="用户名:">
            <el-input v-model="userDetailInfo.username" placeholder="请输入姓名"/>
          </el-form-item>
          <el-form-item label="密码:" v-show="modalType === 'add'">
            <el-input v-model="password" placeholder="请输入密码"/>
          </el-form-item>
          <el-form-item label="昵称:">
            <el-input v-model="userDetailInfo.nickname" placeholder="请输入昵称"/>
          </el-form-item>
          <el-form-item label="角色:">
        <el-select v-model="userDetailInfo.role" placeholder="请选择角色" >
          <el-option value="readers" label="读者">读者</el-option>
          <el-option value="author" label="作者">作者</el-option>
          <el-option value="admin" label="管理员">管理员</el-option>
        </el-select>
      </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="userDetailInfo.phone" placeholder="请输入手机号"/>
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input v-model="userDetailInfo.email" placeholder="请输入邮箱"/>
          </el-form-item>
          <el-form-item label="地址:">
            <el-input v-model="userDetailInfo.address" placeholder="请输入地址"/>
          </el-form-item>
          <el-form-item label="介绍:">
            <el-input v-model="userDetailInfo.introduce" type="textarea" placeholder="请输入介绍"/>
          </el-form-item>
        </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getUserList, getUserDetail, getModifyUser, userRegister } from '@/api/mode1';
import { ElMessage } from 'element-plus';
import { ref } from 'vue'

const roleDict:any = {
  readers: '读者',
  author: '作者',
  admin: '管理员'
}
const dialogVisible = ref(false)
const tableData = ref([])
const loading = ref(false)
const modalType = ref('edit')
const searchParams = ref({
  page:1,
  size:10,
  total:0,
  username:undefined,
  role:undefined
})
const userDetailInfo = ref({
  username: undefined,
  nickname:undefined,
  phone:undefined,
  email:undefined,
  address:undefined,
  introduce:undefined,
  role:undefined
})
const password = ref()
const editClick = async (item:any) => {
  modalType.value= 'edit'
  dialogVisible.value = true
  const result = await getUserDetail({
    id: item.id
  })
  userDetailInfo.value = result.data
}
const addClick = async () => {
  modalType.value= 'add'
  userDetailInfo.value = {
    username: undefined,
    nickname:undefined,
    phone:undefined,
    email:undefined,
    address:undefined,
    introduce:undefined,
    role:undefined
  }
  password.value = undefined
  dialogVisible.value = true
}
const initList = async () => {
  loading.value =true
  const res = await getUserList({
    page:searchParams.value.page,
    size:searchParams.value.size,
    username: searchParams.value.username,
    role:searchParams.value.role
  })
  tableData.value = res.data.list
  searchParams.value.total = res.data.total
  loading.value =false
}
const handleSizeChange = (size:number) => {
  searchParams.value.size = size
  initList()
}
const handleCurrentChange = (page:number) => {
  searchParams.value.page = page
  initList()
}

const query = () => {
  searchParams.value.page = 1
  searchParams.value.size = 10
  initList()
}
const reset = () => {
  searchParams.value.username = undefined
  searchParams.value.role = undefined
  searchParams.value.page = 1
  searchParams.value.size = 10
  initList()
}
const submit = async () => {
  if (modalType.value === 'edit') {
    const result = await getModifyUser(userDetailInfo.value)
    if (result.code === 200) {
      ElMessage.success("更新成功")
    } else {
      ElMessage.error("更新失败")
    }
  } else {
    const result = await userRegister({
      ...userDetailInfo.value,
      password:password.value,
      birthDay:''
    })
    if (result.code === 200) {
      ElMessage.success("添加成功")
    } else {
      ElMessage.error("添加失败")
    }
  }
  query()
  dialogVisible.value =false   
}
initList()
</script>

<style scoped lang="less">
  .user-manage {
    .form {
      display: flex;
      .el-form-item {
        margin-bottom: 15px;
      }
    }
    .table-data {
      margin: 25px 0;
      .edit-icon {
        color: #409eff;
        font-size: 18px; 
        &:hover {
          background-color: #ecf5ff;
        }
      }
    }
  }
</style>