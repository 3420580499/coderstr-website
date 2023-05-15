<template>
  <div style="width: 100%" class="user-manage">
    <el-form label-width="95px" class="form">
      <el-form-item label="文章名:">
        <el-input v-model="searchParams.title" placeholder="请输入文章名" />
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="searchParams.status" placeholder="请选择文章状态">
          <el-option value="draft" label="未发布">未发布</el-option>
          <el-option value="release" label="已发布待审核">已发布待审核</el-option>
          <el-option value="approved" label="审核成功">审核成功(发布成功)</el-option>
          <el-option value="rejection" label="已驳回">已驳回(审核失败)</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类:">
        <el-select v-model="searchParams.sortId" placeholder="请选择分类">
          <el-option v-for="item in sortOptions" :key="item.id" :value="item.id" :label="item.name">
            {{ item.name }}
          </el-option>
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
      <el-table-column fixed  label="文章名" width="250" show-overflow-tooltip >
        <template #default="scope">
        <div class="table-row-title">{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="author.username" label="作者" width="150"/>
      <el-table-column prop="summary" label="文章摘要" width="200" show-overflow-tooltip/>
      <el-table-column label="封面" width="200">
        <template #default="scope">
          <img
          :src="getRemoteImgPath(scope.row.coverImg)"
          alt=""
          style="width: 60px; height: 40px"
        />
        </template>
      </el-table-column>
      <el-table-column label="分类" width="180">
        <template #default="scope">
          <el-tag type="success" class="mx-1" effect="dark" v-if="scope.row.sort">
            {{ scope.row.sort.name }}
          </el-tag>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column  label="标签" width="300">
        <template #default="scope">
          <div v-if="scope.row.tags.length > 0">
            <el-tag
            class="mx-1"
            effect="dark"
            v-for="item in scope.row.tags"
            :key="item.id"
          >
          {{ item.name }}
        </el-tag>
          </div>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column  label="状态" width="150">
        <template #default="scope">
            <div>
              {{statusDict[scope.row.status]}}
            </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="审核操作" width="150">
        <template #default="scope">
          <div v-if="scope.row.status === 'draft' || scope.row.status === 'rejection'">
            <el-tooltip content="编辑" placement="top">
              <el-icon class="edit-icon" @click="editClick(scope.row)">
                <Edit/>
              </el-icon>
            </el-tooltip>
          </div>
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
      title="编辑分类"
      width="30%"
  >
    <el-form label-width="65px">
          <el-form-item label="分类名:">
            <el-input v-model="sortDetailInfo.name" placeholder="请输入分类名"/>
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
import { getSortList, getSortDetail, getModifySort, getAddSort, getMyPagePostList, getAllSorts,getCheckPost} from '@/api/mode1';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue'
import { getRemoteImgPath } from "@/utils/getStaticImgPath"
import router from '@/router';

const dialogVisible = ref(false)
const statusDict:any = {
  draft:'未发布',
  release:'已发布待审核',
  approved: '审核成功',
  rejection: '已驳回'
}
const tableData = ref([])
const loading = ref(false)
const modalType = ref('edit')
const searchParams = ref({
  page:1,
  size:10,
  total:0,
  title:undefined,
  status:undefined,
  sortId:undefined,
})
const sortDetailInfo = ref({
  name: undefined,
  introduce:undefined,
})
const sortOptions = ref<Array<any>>([])
const editClick = async (item:any) => {
  // modalType.value= 'edit'
  // dialogVisible.value = true
  // const result = await getSortDetail({
  //   id: item.id
  // })
  // sortDetailInfo.value = result.data
  // const result = await getCheckPost({
  //   postId: item.id,
  //   status: isCheck ? 'approved' : 'rejection'
  // })
  // if (result.code === 200) {
  //     ElMessage.success("操作成功")
  //   } else {
  //     ElMessage.error("操作失败")
  //   }
  // initList()  
  router.push('/edit/?type=reEdit&id='+item.id)
}
const addClick = async () => {
  router.push('/edit')
}
const initList = async () => {
  loading.value =true
  const res = await getMyPagePostList({
    page:searchParams.value.page,
    size:searchParams.value.size,
    title: searchParams.value.title,
    status: searchParams.value.status,
    sortId: searchParams.value.sortId
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
  searchParams.value.title = undefined
  searchParams.value.sortId = undefined
  searchParams.value.status = undefined
  searchParams.value.page = 1
  searchParams.value.size = 10
  initList()
}
const submit = async () => {
  if (modalType.value === 'edit') {
    const result = await getModifySort(sortDetailInfo.value)
    if (result.code === 200) {
      ElMessage.success("更新成功")
    } else {
      ElMessage.error("更新失败")
    }
  } else {
    const result = await getAddSort({
      ...sortDetailInfo.value,
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
const titleClick = (item:any) => {
  router.push(`/check/${item.id}`)
}
initList()
onMounted( async () => {
  const result = await getAllSorts()
  sortOptions.value = result.data[0]
})
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
      .table-row-title {
        color: #409eff;
      }
      .edit-icon {
        color: #409eff;
        font-size: 20px; 
        &:hover {
          background-color: #ecf5ff;
        }
        margin-right: 20px;
      }

    }
  }
</style>