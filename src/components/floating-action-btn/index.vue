<template>
  <div class="floating-container">
    <el-dropdown placement="top-end" trigger="click" size="large">
      <!-- 悬浮按钮 -->
      <el-button class="floating-btn" color="#4795fc" :icon="Plus" circle />
      <template #dropdown>
        <el-dropdown-menu class="select-none font-extrabold">
          <el-dropdown-item id="upload-btn" :icon="UploadFilled">
            <div>文件上传</div>
          </el-dropdown-item>
          <el-dropdown-item :icon="FolderAdd">创建文件夹</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { Plus, UploadFilled, FolderAdd } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import Uploader from 'simple-uploader.js'
import { getToken } from '@/utils/cookie'
import pocketUtil from '@/utils/common'
import { UPLOAD_FILE_STATUS } from '@/constants/file'
import { MD5 } from '@/utils/md5'
import useStore from '@/stores'
import fileService from '@/api/file'

const { fileStore, taskStore } = useStore()

let uploader = undefined // 上传器

const fileOptions = {
  target: function (file, chunk) {
    return import.meta.env.VITE_BASE_URL_API + '/file/upload'
  }, // 上传地址
  singleFile: false, // 可以多文件上传
  fileParameterName: 'file', // 文件参数名
  headers: {
    Authorization: getToken(),
  },
  query: function (file, chunk) {
    return { parentId: fileStore.parentId }
  },
}

// 文件添加时的处理
const filesAdded = (file, event) => {
  try {
    if (file.size > import.meta.env.VITE_MAX_FILE_SIZE) {
      throw new Error('文件：' + file.name + '大小超过了最大上传文件的限制(' + import.meta.env.VITE_MAX_FILE_SIZE + ')')
    }
    // 添加任务
    // taskStore.add({
    //   target: file,
    //   filename: file.name,
    //   fileSize: pocketUtil.formatFileSize(file.size),
    //   uploadedSize: pocketUtil.formatFileSize(0),
    //   status: UPLOAD_FILE_STATUS.PARSING.code,
    //   statusText: UPLOAD_FILE_STATUS.PARSING.text,
    //   timeRemaining: pocketUtil.formatTime(Number.POSITIVE_INFINITY),
    //   speed: pocketUtil.formatSpeed(file.averageSpeed),
    //   percentage: 0,
    //   parentId: new String(fileStore.parentId),
    // })

    MD5(file.file, (e, md5) => {
      file['uniqueIdentifier'] = md5
      fileService.secUpload(
        {
          filename: file.name,
          identifier: md5,
          parentId: fileStore.parentId,
        },
        (res) => {
          if (res.code === '00000') {
            ElMessage.success('文件：' + file.name + ' 上传完成')
            file.cancel()
            // taskStore.remove(file.name)
            fileStore.loadFileList()
            if (uploader.files.length === 0) {
              // taskStore.updateViewFlag(false)
            }
          }
        },
        (res) => {
          file.resume()
          // taskStore.updateStatus({
          //   filename: file.name,
          //   status: panUtil.fileStatus.WAITING.code,
          //   statusText: panUtil.fileStatus.WAITING.text,
          // })
        }
      )
    })
  } catch (e) {
    ElMessage.error(e.message)
    uploader.cancel()
    // taskStore.clear()
    return false
  }
  // taskStore.updateViewFlag(true)
  return true
}

const initUploader = () => {
  // 实例化一个上传对象
  uploader = new Uploader(fileOptions)
  // 如果不支持 需要降级的地方
  if (!uploader.support) {
    ElMessage.error('本浏览器不支持simple-uploader')
  }

  uploader.assignBrowse(document.getElementById('upload-btn'))

  // 文件添加
  uploader.on('fileAdded', filesAdded)
  // 单个文件上传成功
  uploader.on('fileSuccess', function (rootFile, file, message) {
    // console.log(rootFile, file, message)
  })
  // 某个文件上传失败了
  uploader.on('fileError', function (rootFile, file, message) {
    // console.log(rootFile, file, message)
  })
}

onMounted(() => {
  initUploader()
})
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
