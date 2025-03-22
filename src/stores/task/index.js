/**
 * Created by xiaohui on 2025/03/07.
 */

'use strict'

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

export const useTaskStore = defineStore('task', () => {
  /**
   * target 文件
   * filename 文件名
   * fileSize 文件大小
   * uploadedSize 已上传大小
   * status 状态
   * statusText 状态文本
   * timeRemaining 剩余时间
   * speed 速度
   * percentage 进度
   * parentId 父级id
   */
  const taskList = ref([])

  const viewFlag = ref(false)

  function add(taskItem) {
    taskList.value.push(taskItem)
  }

  function updateViewFlag(newViewFlag) {
    viewFlag.value = newViewFlag
  }

  function remove(filename) {
    for (let i = 0; i < taskList.value.length; i++) {
      if (filename === taskList.value[i].filename) {
        taskList.value.splice(i, 1)
        break
      }
    }
  }

  function updateStatus(param) {
    let taskItem = taskList.value.find((taskItem) => param.filename === taskItem.filename)
    taskItem.status = param.status
    taskItem.statusText = param.statusText
  }

  function updateProcess(param) {
    let taskItem = taskList.value.find((taskItem) => param.filename === taskItem.filename)
    taskItem.speed = param.speed
    taskItem.percentage = param.percentage
    taskItem.uploadedSize = param.uploadedSize
    taskItem.timeRemaining = param.timeRemaining
  }

  function getUploadTask(filename) {
    return taskList.value.find((taskItem) => filename === taskItem.filename)
  }

  function clear() {
    taskList.value = new Array()
  }

  return {
    taskList,
    viewFlag,
    clear,
    remove,
    add,
    updateViewFlag,
    updateStatus,
    getUploadTask,
    updateProcess,
  }
})
