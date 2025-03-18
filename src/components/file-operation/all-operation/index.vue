<template>
  <div class="operations">
    <Transition name="slide-down">
      <div v-if="shouldShow" class="operations-content select-none flex items-center justify-center space-x-4">
        <!-- 下载操作 -->
        <div class="operation">
          <el-tooltip content="下载" effect="light" placement="top" :hide-after="0">
            <download-operation>
              <div class="w-full h-full flex items-center justify-center">
                <el-icon><Download /></el-icon>
              </div>
            </download-operation>
          </el-tooltip>
        </div>
        <div class="operation">
          <el-tooltip content="分享" effect="light" placement="top" :hide-after="0">
            <div class="w-full h-full flex items-center justify-center">
              <el-icon><Share /></el-icon>
            </div>
          </el-tooltip>
        </div>
        <div class="operation">
          <el-tooltip content="放入回收站" effect="light" placement="top" :hide-after="0">
            <delete-operation :item="row">
              <div class="w-full h-full flex items-center justify-center">
                <el-icon><Delete /></el-icon>
              </div>
            </delete-operation>
          </el-tooltip>
        </div>
        <div class="operation" @click="cancelMulSelect">
          <el-tooltip content="取消多选" effect="light" placement="top" :hide-after="0">
            <div class="w-full h-full flex items-center justify-center">
              <el-icon><CircleCloseFilled /></el-icon>
            </div>
          </el-tooltip>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
import { Download, Share, CircleCloseFilled, Delete } from '@element-plus/icons-vue'
import DownloadOperation from '@/components/file-operation/download-operation/index.vue'
import DeleteOperation from '@/components/file-operation/delete-operation/index.vue'

const { fileStore } = useStore()
const { multipleSelection } = storeToRefs(fileStore)

const shouldShow = computed(() => multipleSelection.value.length > 0)

const cancelMulSelect = () => {
  fileStore.setMultipleSelection([])
}
</script>

<style scoped>
.operations {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%); /* 更精准的水平居中方式 */
}

.operations-content {
  width: 200px;
  height: 40px;
  background-color: var(--custom-all-operation-bg); /* 使用自定义变量 */
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1); /* 半透明白色 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), /* 外阴影基础层 */ inset 0 -1px 1px rgba(0, 0, 0, 0.1); /* 底部内阴影 */
}

.operation {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
}

.operation:hover {
  background-color: var(--custom-btn-hover-bg);
}

/* 动画 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.slide-down-enter-from {
  transform: translateY(-150%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* 轻微缩放动画 */
.slide-down-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s linear;
}

/* 调整图标大小 */
:deep(.el-icon) {
  font-size: 18px;
}
</style>
