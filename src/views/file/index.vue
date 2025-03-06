<template>
  <file-table/>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useStore from '@/stores'
import FileTable from '@/components/file-table/index.vue'

const { fileStore } = useStore()

onMounted(() => {
  fileStore.loadFileList()
})
</script>
