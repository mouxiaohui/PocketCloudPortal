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

onMounted(() => {
  fileStore.setMultipleSelection([])

  if (fileStore.searchFlag) {
    return
  }
  breadcrumbStore.clear()
  breadcrumbStore.addItem({ id: fileStore.rootFileId, name: fileStore.rootFilename })
  fileStore.setFileTypes('-1')
  fileStore.refreshParentId()
  fileStore.loadFileList()
})
</script>
