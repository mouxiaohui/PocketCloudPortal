<template>
  <el-breadcrumb separator="/" class="mb-4" :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" @click="handleCrumbClick(index, item.id)">
      <span
        :class="{
          'cursor-pointer hover:text-blue-400': index < breadcrumbs.length - 1,
          'text-gray-500': index === breadcrumbs.length - 1,
        }"
      >
        {{ item.name }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
import { ArrowRight } from '@element-plus/icons-vue'

const { breadcrumbStore, fileStore } = useStore()
const { breadcrumbs } = storeToRefs(breadcrumbStore)

const handleCrumbClick = (index, id) => {
  if ((index + 1) < breadcrumbs.value.length) {
    console.log("click");
    fileStore.setSearchFlag(false)
    breadcrumbStore.navigate(index)
    fileStore.setParentId(id)
    fileStore.loadFileList()
  }
}
</script>

<style scoped>
:deep(.el-breadcrumb__inner) {
  transition: color 0.2s;
}
</style>
