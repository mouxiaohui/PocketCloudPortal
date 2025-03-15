<template>
  <div>
    <el-table
      class="w-full"
      :data="fileStore.fileList"
      v-loading="fileStore.tableLoading"
      :height="tableHeight"
      :row-style="{ height: '45px' }"
      ref="fileTableRef"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="showOperation"
      @cell-mouse-leave="hiddenOperation"
    >
      <!-- 选择框 -->
      <el-table-column type="selection" width="55"> </el-table-column>
      <!-- 文件名列 -->
      <el-table-column prop="filename" label="文件名" sortable show-overflow-tooltip min-width="750">
        <template #default="scope">
          <div class="flex justify-between">
            <!-- 文件图标和文件名 -->
            <div @click="clickFilename(scope.row)" class="flex cursor-pointer">
              <span class="mr-2">
                <svg class="ali-icon ali-icon-large" aria-hidden="true">
                  <use :xlink:href="getIconFromFileType(scope.row.fileType)"></use>
                </svg>
              </span>
              <span>{{ scope.row.filename }}</span>
            </div>
            <!-- 文件操作下拉菜单 -->
            <async-dropdown-menu :row="scope.row"></async-dropdown-menu>
          </div>
        </template>
      </el-table-column>
      <!-- 修改日期列 -->
      <el-table-column prop="updateTime" sortable align="center" label="修改日期" min-width="240"> </el-table-column>
      <!-- 文件大小列 -->
      <el-table-column prop="fileSizeDesc" sortable label="大小" min-width="120" align="center"> </el-table-column>
    </el-table>
  </div>

  <all-operation />
</template>

<script setup>
import { ref, watch, defineAsyncComponent  } from 'vue'
import useStore from '@/stores'
import AllOperation from '@/components/file-operation/all-operation/index.vue'
import { storeToRefs } from 'pinia'

// 利用defineAsyncComponent延迟加载复杂组件 
const AsyncDropdownMenu = defineAsyncComponent(() =>
  import('@/components/async-dropdown-menu/index.vue')
)

const { fileStore, breadcrumbStore } = useStore()

const { multipleSelection } = storeToRefs(fileStore)

// 表格高度
const tableHeight = ref(window.innerHeight - 130)

// 表格ref
const fileTableRef = ref()

// 固定文件操作按钮让其不消失
let fixedFileOperation = {}

// 如果表格没有选中项，则清空多选
watch(multipleSelection, (newValue, oldValue) => {
  if (newValue.length === 0 && newValue.length !== oldValue.length) {
    fileTableRef.value.clearSelection()
  }
})

// 选取下拉菜单按钮的span dom，控制其显示和隐藏
const setFileOperationDomDisplay = (dom, display) => {
  let parentDiv = dom.firstElementChild
  if (parentDiv && parentDiv.classList.contains('el-tooltip')) {
    let target = parentDiv.firstElementChild.children[1].firstElementChild.firstElementChild
    if (target && target.classList.contains('file-operation')) {
      target.style.display = display
    }
  }
}

// 显示操作按钮
const showOperation = (row, column, cell, event) => {
  setFileOperationDomDisplay(cell, '')
}

// 隐藏操作按钮
const hiddenOperation = (row, column, cell, event) => {
  setFileOperationDomDisplay(cell, 'none')
}

/**
 * 处理文件选中事件
 */
const handleSelectionChange = (val) => {
  fileStore.setMultipleSelection(val)
}

/**
 * 处理文件点击事件
 */
const clickFilename = (row) => {
  switch (row.fileType) {
    case 0:
      goInFolder(row.filename, row.id)
    case 3:
    case 4:
    case 10:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 11:
    default:
      break
  }
}

/**
 * 进入文件夹
 */
const goInFolder = (filename, folderId) => {
  breadcrumbStore.addCrumb(filename, folderId)
  fileStore.setParentId(folderId)
  fileStore.loadFileList()
}

/**
 * 根据文件类型获取图标
 * @param fileType 文件类型
 */
const getIconFromFileType = (fileType) => {
  switch (fileType) {
    case 0:
      return '#icon-wenjianjia'
    case 1:
      return '#icon-weizhi3'
    case 2:
      return '#icon-yasuowenjian3'
    case 3:
      return '#icon-excel'
    case 4:
      return '#icon-word'
    case 5:
      return '#icon-pdf'
    case 6:
      return '#icon-txt'
    case 7:
      return '#icon-image'
    case 8:
      return '#icon-audio'
    case 9:
      return '#icon-video'
    case 10:
      return '#icon-ppt'
    case 11:
      return '#icon-daimawenjian'
    case 12:
      return '#icon-csv'
    default:
      return '#icon-weizhi3'
  }
}
</script>

<style scoped>
</style>
