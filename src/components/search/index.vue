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
      // breadcrumbStore.clear()
      // breadcrumbStore.addCrumb(fileStore.rootFilename, fileStore.rootFileId)
      // breadcrumbStore.addCrumb('搜索:' + searchKeyWord.value, '-1')
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
