<template>
  <div id="upload-btn">
    <slot></slot>
  </div>
</template>

<script setup>
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

// 详细文档地址：https://github.com/simple-uploader/Uploader/blob/develop/README_zh-CN.md#%E9%85%8D%E7%BD%AE
const fileOptions = {
  target: function (file, chunk) {
    // return import.meta.env.VITE_BASE_URL_API + '/file/upload'
    return import.meta.env.VITE_BASE_URL_API + '/file/chunk-upload'
  }, // 上传地址
  singleFile: false, // 可以多文件上传
  fileParameterName: 'file', // 文件参数名
  chunkSize: Number(import.meta.env.VITE_CHUNK_SIZE), // 默认 1*1024*1024
  forceChunkSize: false,
  fileParameterName: 'file',
  headers: {
    Authorization: getToken(),
  },
  query: function (file, chunk) {
    return { parentId: fileStore.parentId }
  },
  checkChunkUploadedByResponse: function (chunk, message) {
    let objMessage = {}
    try {
      objMessage = JSON.parse(message)
    } catch (e) {}
    if (objMessage.data) {
      return (objMessage.data.uploadedChunks || []).indexOf(chunk.offset + 1) >= 0
    }

    return true
  },
  maxChunkRetries: 0,
  chunkRetryInterval: null,
  progressCallbacksInterval: 500,
  successStatuses: [200, 201, 202],
  permanentErrors: [404, 415, 500, 501],
  initialPaused: false,
}

// 文件添加时的处理
const filesAdded = (file, event) => {
  try {
    if (file.size > Number(import.meta.env.VITE_MAX_FILE_SIZE)) {
      throw new Error('文件：' + file.name + '大小超过了最大上传文件的限制(' + import.meta.env.VITE_MAX_FILE_SIZE + ')')
    }
    // 添加任务
    taskStore.add({
      target: file, // 文件
      filename: file.name, // 文件名
      fileSize: pocketUtil.formatFileSize(file.size), // 文件大小
      uploadedSize: pocketUtil.formatFileSize(0), // 已上传大小
      status: UPLOAD_FILE_STATUS.PARSING.code, // 状态
      statusText: UPLOAD_FILE_STATUS.PARSING.text, // 状态文本
      timeRemaining: pocketUtil.formatTime(Number.POSITIVE_INFINITY), // 剩余时间
      speed: pocketUtil.formatSpeed(file.averageSpeed), // 速度
      percentage: 0, // 进度
      parentId: fileStore.parentId, // 父级ID
    })

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
            taskStore.remove(file.name)
            fileStore.loadFileList()
            if (uploader.files.length === 0) {
              taskStore.updateViewFlag(false)
            }
          }
        },
        (res) => {
          file.resume()
          taskStore.updateStatus({
            filename: file.name,
            status: pocketUtil.FILE_STATUS.WAITING.code,
            statusText: pocketUtil.FILE_STATUS.WAITING.text,
          })
        }
      )
    })
  } catch (e) {
    ElMessage.error(e.message)
    uploader.cancel()
    taskStore.clear()
    return false
  }
  taskStore.updateViewFlag(true)
  return true
}

// 文件上传进度处理
const uploadProgress = (rootFile, file, chunk) => {
  let uploadTaskItem = taskStore.getUploadTask(file.name)
  if (file.isUploading()) {
    if (uploadTaskItem.status !== pocketUtil.FILE_STATUS.UPLOADING.code) {
      taskStore.updateStatus({
        filename: file.name,
        status: pocketUtil.FILE_STATUS.UPLOADING.code,
        statusText: pocketUtil.FILE_STATUS.UPLOADING.text,
      })
    }
    taskStore.updateProcess({
      filename: file.name,
      speed: pocketUtil.formatSpeed(file.averageSpeed),
      percentage: Math.floor(file.progress() * 100),
      uploadedSize: pocketUtil.formatFileSize(file.sizeUploaded()),
      timeRemaining: pocketUtil.formatTime(file.timeRemaining()),
    })
  }
}

// 文件上传成功后的处理
const fileUploaded = (rootFile, file, message, chunk) => {
  let res = {}
  try {
    res = JSON.parse(message)
  } catch (e) {}
  if (res.code === '00000') {
    if (res.data) {
      if (res.data.mergeFlag) {
        doMerge(file)
      } else if (res.data.uploadedChunks && res.data.uploadedChunks.length === file.chunks.length) {
        doMerge(file)
      }
    } else {
      ElMessage.success('文件：' + file.name + ' 上传完成')
      uploader.removeFile(file)
      fileStore.loadFileList()
      taskStore.updateStatus({
        filename: file.name,
        status: pocketUtil.FILE_STATUS.SUCCESS.code,
        statusText: pocketUtil.FILE_STATUS.SUCCESS.text,
      })
      taskStore.remove(file.name)
      if (uploader.files.length === 0) {
        taskStore.updateViewFlag(false)
      }
    }
  } else {
    file.pause()
    taskStore.updateStatus({
      filename: file.name,
      status: pocketUtil.FILE_STATUS.FAIL.code,
      statusText: pocketUtil.FILE_STATUS.FAIL.text,
    })
  }
}

// 文件合并处理
const doMerge = (file) => {
  taskStore.updateStatus({
    filename: file.name,
    status: pocketUtil.FILE_STATUS.MERGE.code,
    statusText: pocketUtil.FILE_STATUS.MERGE.text,
  })
  taskStore.updateProcess({
    filename: file.name,
    speed: pocketUtil.formatSpeed(file.averageSpeed),
    percentage: 99,
    uploadedSize: pocketUtil.formatFileSize(file.sizeUploaded()),
    timeRemaining: pocketUtil.formatTime(file.timeRemaining()),
  })
  fileService.merge(
    {
      filename: file.name,
      identifier: file['uniqueIdentifier'],
      parentId: fileStore.parentId,
      totalSize: file.file.size,
    },
    (res) => {
      ElMessage.success('文件：' + file.name + ' 上传完成')
      uploader.removeFile(file)
      fileStore.loadFileList()
      taskStore.updateStatus({
        filename: file.name,
        status: pocketUtil.FILE_STATUS.SUCCESS.code,
        statusText: pocketUtil.FILE_STATUS.SUCCESS.text,
      })
      taskStore.remove(file.name)
      if (uploader.files.length === 0) {
        taskStore.updateViewFlag(false)
      }
    },
    (res) => {
      file.pause()
      taskStore.updateStatus({
        filename: file.name,
        status: pocketUtil.FILE_STATUS.FAIL.code,
        statusText: pocketUtil.FILE_STATUS.FAIL.text,
      })
    }
  )
}

// 所有文件上传完成处理
const uploadComplete = () => {}

// 文件上传错误处理
const uploadError = (rootFile, file, message, chunk) => {
  console.log('文件上传错误: ', message)
  taskStore.updateStatus({
    filename: file.name,
    status: pocketUtil.FILE_STATUS.FAIL.code,
    statusText: pocketUtil.FILE_STATUS.FAIL.text,
  })
  taskStore.updateProcess({
    filename: file.name,
    speed: pocketUtil.formatSpeed(0),
    percentage: 0,
    uploadedSize: pocketUtil.formatFileSize(0),
    timeRemaining: pocketUtil.formatTime(Number.POSITIVE_INFINITY),
  })
}

// 初始化Uploader
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
  // 绑定进度
  uploader.on('fileProgress', uploadProgress)
  // 上传成功监听
  uploader.on('fileSuccess', fileUploaded)
  // 上传全部完成调用
  uploader.on('complete', uploadComplete)
  // 上传出错调用
  uploader.on('fileError', uploadError)
}

onMounted(() => {
  initUploader()
})
</script>
