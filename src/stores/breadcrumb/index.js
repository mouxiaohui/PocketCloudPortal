/**
 * Created by xiaohui on 2025/03/07.
 */

'use strict'

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  // 面包屑最大展示个数
  const MAX_BREADCRUMBS = 5
  // 面包屑数据格式：{ folderName: '文件夹名', folderId: '文件夹ID' }
  const breadcrumbs = ref([])

  const getBreadcrumbs = computed(() => {
    if (breadcrumbs.value.length > MAX_BREADCRUMBS) {
      return [breadcrumbs.value[0], { folderName: '...', folderId: null }, ...breadcrumbs.value.slice(-3)]
    }

    return breadcrumbs.value
  })

  // 当前文件夹ID（计算属性）
  const currentFolderId = computed(() => {
    const last = breadcrumbs.value[breadcrumbs.value.length - 1]
    return last?.folderId || null
  })

  // 添加面包屑层级
  const addCrumb = (folderName, folderId) => {
    if (currentFolderId.value === folderId) {
      return
    }
    breadcrumbs.value.push({ folderName, folderId })
  }

  // 点击面包屑导航
  const navigateToCrumb = (index) => {
    if (index + 1 >= breadcrumbs.value.length) return false
    breadcrumbs.value = breadcrumbs.value.slice(0, index + 1)
    return true
  }

  // 重置面包屑
  const clear = () => {
    breadcrumbs.value = []
  }

  return {
    breadcrumbs,
    currentFolderId,
    getBreadcrumbs,
    addCrumb,
    navigateToCrumb,
    clear,
  }
})
