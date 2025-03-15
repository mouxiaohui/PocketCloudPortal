<template>
  <el-dropdown trigger="click">
    <div>
      <span
        style="display: none"
        class="file-operation w-6 h-6 cursor-pointer flex items-center justify-center rounded-md"
      >
        <el-icon><MoreFilled /></el-icon>
      </span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>分享</el-dropdown-item>

        <download-operation :item="row">
          <el-dropdown-item>下载</el-dropdown-item>
        </download-operation>

        <el-dropdown-item>收藏</el-dropdown-item>

        <el-divider />

        <rename-operation :item="row">
          <el-dropdown-item>重命名</el-dropdown-item>
        </rename-operation>

        <el-dropdown-item>移动</el-dropdown-item>

        <el-dropdown-item>查看详细信息</el-dropdown-item>

        <el-divider />

        <el-dropdown-item>放入回收站</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { defineProps } from 'vue'
import RenameOperation from '@/components/file-operation/rename-operation/index.vue'
import DownloadOperation from '@/components/file-operation/download-operation/index.vue'

defineProps({
  row: Object,
})
</script>

<style scoped>
:deep(.el-divider) {
  margin: 2px 0;
}

.file-operation:hover {
  background-color: var(--custom-btn-hover-bg);
}
</style>
