<template>
  <div class="floating-container">
    <el-dropdown placement="top-end" trigger="click" size="large">
      <!-- 悬浮按钮 -->
      <el-button class="floating-btn" color="#4795fc" :icon="Plus" circle />
      <template #dropdown>
        <el-dropdown-menu class="select-none font-extrabold">
          <file-upload>
            <el-dropdown-item :icon="UploadFilled"> 文件上传 </el-dropdown-item>
          </file-upload>
          <el-dropdown-item :icon="FolderAdd" @click="showDialog = true">创建文件夹</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <create-folder-dialog :show-dialog="showDialog" @close-dialog="showDialog = false" />
  </div>
</template>

<script setup>
import { Plus, UploadFilled, FolderAdd } from '@element-plus/icons-vue'
import { ref } from 'vue'
import FileUpload from '@/components/file-upload/index.vue'
import CreateFolderDialog from '@/components/create-folder-dialog/index.vue'

// 控制子组件 Dialog 显示的变量
const showDialog = ref(false)
</script>

<style scoped>
.floating-container {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 2000;
}

.floating-btn {
  width: 56px;
  height: 56px;
  font-size: 24px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.2);
}

/* 调整图标大小 */
:deep(.el-dropdown-menu__item .el-icon) {
  font-size: 24px;
}

/* 调整悬浮按钮图标颜色 */
:deep(.el-button .el-icon) {
  color: rgb(255, 255, 255);
}
</style>
