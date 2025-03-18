<template>
  <div class="flex items-center">
    <div class="w-72">
      <el-input
        size="large"
        v-model="searchKeyWord"
        placeholder="搜索云盘内文件"
        @keyup.enter.native="searchFile"
        :prefix-icon="Search"
      />
    </div>
    <el-button size="large" text bg class="ml-2" @click="searchFile"> 搜索 </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import fileService from '@/api/file'
import useStore from '@/stores'

const { fileStore, breadcrumbStore } = useStore()

const router = useRouter()

const searchKeyWord = ref('')

const searchFile = () => {
  if (searchKeyWord.value === '') {
    ElMessage({
      message: '请输入搜索关键字',
      type: 'warning',
    })
    return
  }
  // 设置FileTypes
  fileStore.setFileTypes('-1')
  // 设置搜索模式
  fileStore.setSearchFlag(true)
  // 缓存搜索关键字
  fileStore.setSearchKey(searchKeyWord.value)
  router.push({ name: 'AllFile' })

  fileStore.setTableLoading(true)
  fileService.search(
    {
      keyword: searchKeyWord.value,
      fileTypes: '-1',
    },
    (res) => {
      breadcrumbStore.clear()
      breadcrumbStore.addItem({
        id: fileStore.rootFileId,
        name: fileStore.rootFilename,
      })
      breadcrumbStore.addItem({
        id: '-1',
        name: '搜索:' + searchKeyWord.value,
      })
      fileStore.setFileList(res.data)
      fileStore.setTableLoading(false)
    },
    (res) => {
      ElMessage.error(res.msg)
      fileStore.setTableLoading(false)
    }
  )
}
</script>

<style scoped></style>
