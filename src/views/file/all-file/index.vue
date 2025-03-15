<template>
  <div>
    <breadcrumb />
    <file-table />
    <floating-action-btn />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useStore from '@/stores'
import FileTable from '@/components/file-table/index.vue'
import Breadcrumb from '@/components/breadcrumb/index.vue'
import FloatingActionBtn from '@/components/floating-action-btn/index.vue'

const { fileStore, breadcrumbStore } = useStore()

onMounted(async () => {
  fileStore.setMultipleSelection([])

  // 如果面包屑列表为空，直接添加根文件名，加载文件列表
  if (breadcrumbStore.breadcrumbs.length === 0) {
    // console.log('第一次加载')
    breadcrumbStore.addCrumb(fileStore.rootFilename, fileStore.rootFileId)
    fileStore.loadFileList()
    return
  }

  // 如果第一个面包屑已经是根文件ID，直接返回
  if (breadcrumbStore.breadcrumbs[0].folderId === fileStore.rootFileId) {
    // console.log('不加载')
    return
  } else {
    // console.log('加载')
    // 如果第一个面包屑不是根文件ID，则重置文件类型和面包屑列表
    breadcrumbStore.clear()
    breadcrumbStore.addCrumb(fileStore.rootFilename, fileStore.rootFileId)
    fileStore.setFileTypes(-1)
    fileStore.loadFileList()
  }
})
</script>
