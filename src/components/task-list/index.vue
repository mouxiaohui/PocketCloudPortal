<template>
  <div class="flex items-center">
    <el-popover placement="right" :width="600" trigger="click">
      <template #reference>
        <el-button circle>
          <svg class="ali-icon" aria-hidden="true">
            <use xlink:href="#icon-a-shangchuanxiazai"></use>
          </svg>
        </el-button>
      </template>
      <div>
        <el-table empty-text="暂无传输任务" :data="taskList" height="300px" style="width: 100%">
          <!-- 文件名 -->
          <el-table-column
            align="center"
            header-align="center"
            label="文件名称"
            prop="filename"
            width="120"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <!-- 文件上传状态 -->
          <el-table-column align="center" header-align="center" label="文件状态" width="120">
            <template #default="scope">
              <el-popover trigger="hover" placement="top">
                <p>状态: {{ scope.row.statusText }}</p>
                <template #reference>
                  <div>
                    <el-button v-if="scope.row.status === FILE_STATUS.WAITING.code" size="small" icon="Clock" circle />
                    <el-button
                      v-if="scope.row.status === FILE_STATUS.PAUSE.code"
                      size="small"
                      icon="VideoPlay"
                      circle
                    />
                    <el-button
                      v-if="scope.row.status === FILE_STATUS.UPLOADING.code"
                      size="small"
                      icon="Upload"
                      circle
                    />
                    <el-button
                      v-if="scope.row.status === FILE_STATUS.FAIL.code"
                      size="small"
                      type="danger"
                      icon="Warning"
                      circle
                    />
                    <el-button
                      v-if="scope.row.status === FILE_STATUS.PARSING.code"
                      size="small"
                      icon="Loading"
                      circle
                      loading
                    />
                    <el-button v-if="scope.row.status === FILE_STATUS.MERGE.code" size="small" icon="Coin" circle />
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>

          <!-- 文件上传进度 -->
          <el-table-column align="center" header-align="center" label="上传进度" width="180">
            <template #default="scope">
              <el-popover trigger="hover" placement="top" width="300">
                <p>上传速度: {{ scope.row.speed }}</p>
                <p>上传大小: {{ scope.row.uploadedSize }}/{{ scope.row.fileSize }}</p>
                <p>剩余时间: {{ scope.row.timeRemaining }}</p>
                <template #reference>
                  <div>
                    <el-progress :stroke-width="8" :color="colors" :percentage="scope.row.percentage"></el-progress>
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column align="center" header-align="center" label="操作" width="180"> </el-table-column>
        </el-table>
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import useStore from '@/stores'
import pocketUtil from '@/utils/common'

const { FILE_STATUS } = pocketUtil

const { taskStore } = useStore()

const { taskList } = storeToRefs(taskStore)

const colors = [
  { color: '#909399', percentage: 30 },
  { color: '#e6a23c', percentage: 70 },
  { color: '#67c23a', percentage: 100 },
]
</script>
