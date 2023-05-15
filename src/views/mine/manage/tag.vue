<template>
  <div style="width: 100%" class="user-manage">
    <el-form label-width="65px" class="form">
      <el-form-item label="标签名:">
        <el-input v-model="searchParams.name" placeholder="请输入标签名" />
      </el-form-item>
      <el-form-item label="介绍:">
        <el-input v-model="searchParams.introduce" placeholder="请输入介绍" />
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
      <el-table-column fixed prop="name" label="标签名" width="100" />
      <el-table-column prop="introduce" label="介绍" width="300" show-overflow-tooltip/>
      <el-table-column prop="createAt" label="创建时间" width="280" show-overflow-tooltip/>
      <el-table-column prop="updateAt" label="更新时间" width="280" show-overflow-tooltip/>
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
      title="编辑标签"
      width="30%"
  >
  <el-form label-width="65px">
          <el-form-item label="标签名:">
            <el-input v-model="sortDetailInfo.name" placeholder="请输入标签名"/>
          </el-form-item>
          <el-form-item label="介绍:">
            <el-input v-model="sortDetailInfo.introduce" placeholder="请输入介绍" type="textarea" />
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
import { getTagList, getTagDetail, getModifyTag, getAddTag} from '@/api/mode1';
import { ElMessage } from 'element-plus';
import { ref } from 'vue'

const dialogVisible = ref(false)
const tableData = ref([])
const loading = ref(false)
const modalType = ref('edit')
const searchParams = ref({
  page:1,
  size:10,
  total:0,
  name:undefined,
  introduce:undefined
})
const sortDetailInfo = ref({
  name: undefined,
  introduce:undefined,
})
const editClick = async (item:any) => {
  modalType.value= 'edit'
  dialogVisible.value = true
  const result = await getTagDetail({
    id: item.id
  })
  sortDetailInfo.value = result.data
}
const addClick = async () => {
  modalType.value= 'add'
  sortDetailInfo.value = {
    name: undefined,
    introduce:undefined,
  }
  dialogVisible.value = true
}
const initList = async () => {
  loading.value =true
  const res = await getTagList({
    page:searchParams.value.page,
    size:searchParams.value.size,
    name: searchParams.value.name,
    introduce:searchParams.value.introduce
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
  searchParams.value.name = undefined
  searchParams.value.introduce = undefined
  searchParams.value.page = 1
  searchParams.value.size = 10
  initList()
}
const submit = async () => {
  if (modalType.value === 'edit') {
    const result = await getModifyTag(sortDetailInfo.value)
    if (result.code === 200) {
      ElMessage.success("更新成功")
    } else {
      ElMessage.error("更新失败")
    }
  } else {
    const result = await getAddTag({
      ...sortDetailInfo.value,
    })
    if (result.code === 200) {
      ElMessage.success("添加成功")
    } else {
      ElMessage.error("添加失败")
    }
  }
  query()
  dialogVisible.value = false
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