<template>
  <div class="str-table">
    <!-- 头部预留插槽 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="dataList"
      style="width: 100%"
      border
      align="center"
      v-bind="childrenProps"
    >
      <!-- showSelectConlumn(传入确认是否展示该项) -->
      <el-table-column
        type="selection"
        align="center"
        width="60"
        v-if="showSelectColumn"
      ></el-table-column>
      <!-- showIndexColumn(传入确认是否展示该项) -->
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80"
        v-if="showIndexColumn"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 作用域插槽(element-plus传入) （这里的scope传入进来的是一行的数据）-->
          <template #default="scope">
            <!-- 作用域插槽传入数据（我们传入)(这里的row，传入到page-content组件中的scope) -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 尾部预留插槽 -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    dataList: {
      type: Array,
      require: true
    },
    listCount: {
      type: Number,
      require: true
    },
    propList: {
      type: Array,
      require: true
    },
    title: {
      type: String,
      default: ''
    },
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    showSelectColumn: {
      type: Boolean,
      default: true
    },
    page: {
      type: Object,
      default: () => {
        return { currentPage: 0, pageSize: 10 }
      }
    },
    childrenProps: {
      type: Object
    }
  },
  emits: ['update:page'],
  setup(props, { emit }) {
    const handleSizeChange = (pageSize: any) => {
      // 为啥不推荐这里的做法呢？原因是这样不符合vue单向数据流的规则，eslint不同意（最好不要这样写，可以使用v-model）
      // props.page.pageSize= pageSize
      // 更改pageMessage
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: any) => {
      // props.page.currentPage = currentPage
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.str-table {
  padding: 15px;
  border: 10px solid #f3f3f3;
}
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}
.footer {
  margin-top: 15px;
  margin-bottom: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
