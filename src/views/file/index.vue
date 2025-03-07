<template>
  <div>
    <breadcrumb />
    <file-table />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useStore from '@/stores'
import FileTable from '@/components/file-table/index.vue'
import Breadcrumb from '@/components/breadcrumb/index.vue'

const { fileStore, breadcrumbStore } = useStore()

onMounted(() => {
  fileStore.loadFileList()
  breadcrumbStore.clear()
  breadcrumbStore.addCrumb(fileStore.rootFilename, fileStore.rootFileId)
})
</script>
