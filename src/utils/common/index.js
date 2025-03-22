/**
 * Created by xiaohui on 2025/02/25.
 */

'use strict'

let pocketUtil = {
  COMMON_SEPARATOR: '__,__',
  // 文件上传状态
  FILE_STATUS: {
    PARSING: {
      code: 1,
      text: '解析中',
    },
    WAITING: {
      code: 2,
      text: '等待上传',
    },
    UPLOADING: {
      code: 3,
      text: '正在上传',
    },
    PAUSE: {
      code: 4,
      text: '暂停上传',
    },
    SUCCESS: {
      code: 5,
      text: '上传成功',
    },
    FAIL: {
      code: 6,
      text: '上传失败',
    },
    MERGE: {
      code: 7,
      text: '服务器处理中',
    },
  },
  goHome() {
    window.location.href = '/'
  },
  // 格式化文件大小
  formatFileSize(fileSize) {
    let KB_STR = 'K',
      MB_STR = 'M',
      GB_STR = 'G',
      UNIT = 1024,
      fileSizeSuffix = KB_STR
    fileSize = fileSize / UNIT
    if (fileSize >= UNIT) {
      fileSize = fileSize / UNIT
      fileSizeSuffix = MB_STR
    }
    if (fileSize >= UNIT) {
      fileSize = fileSize / UNIT
      fileSizeSuffix = GB_STR
    }
    return fileSize.toFixed(2) + fileSizeSuffix
  },
  // 格式化时间
  formatTime(timeRemaining) {
    if (!timeRemaining || Number.POSITIVE_INFINITY === timeRemaining) {
      return '--:--:--'
    }
    let timeRemainingInt = parseInt(timeRemaining),
      hNum = Math.floor(timeRemainingInt / 3600),
      mNum = Math.floor((timeRemainingInt / 60) % 60),
      sNum = Math.floor(timeRemainingInt % 60),
      h = hNum < 10 ? '0' + hNum : hNum,
      m = mNum < 10 ? '0' + mNum : mNum,
      s = sNum < 10 ? '0' + sNum : sNum
    return h + ':' + m + ':' + s
  },
  // 格式化速度
  formatSpeed(byteSpeed) {
    return this.formatFileSize(byteSpeed) + '/s'
  },
}

export default pocketUtil
