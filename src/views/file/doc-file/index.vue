<template>
  <div class="mt-[30px]">
    <file-table />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useStore from '@/stores'
import FileTable from '@/components/file-table/index.vue'

const { fileStore, breadcrumbStore } = useStore()

onMounted(() => {
  fileStore.setMultipleSelection([])
  breadcrumbStore.clear()
  fileStore.setSearchFlag(false)
  fileStore.setFileTypes('3__,__4__,__5__,__6__,__10__,__11')
  fileStore.setParentId('-1')
  fileStore.loadFileList()
})
</script>