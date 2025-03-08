/**
 * Created by xiaohui on 2025/03/07.
 */

'use strict'

/**
 * 上传文件状态
 */
export const UPLOAD_FILE_STATUS = {
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
}
