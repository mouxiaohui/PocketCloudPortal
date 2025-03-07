<template>
  <el-breadcrumb separator="/" class="mb-4" :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(crumb, index) in getBreadcrumbs" :key="index" @click="handleCrumbClick(index)">
      <span
        :class="{
          'cursor-pointer hover:text-blue-400': index < getBreadcrumbs.length - 1,
          'text-gray-500': index === getBreadcrumbs.length - 1,
        }"
      >
        {{ crumb.folderName }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
import { ArrowRight } from '@element-plus/icons-vue'

const { breadcrumbStore, fileStore } = useStore()
const { getBreadcrumbs } = storeToRefs(breadcrumbStore)

const handleCrumbClick = (index) => {
  if (breadcrumbStore.navigateToCrumb(index)) {
    fileStore.setParentId(breadcrumbStore.currentFolderId)
    fileStore.loadFileList()
  }
}
</script>

<style scoped>
:deep(.el-breadcrumb__inner) {
  transition: color 0.2s;
}
</style>
