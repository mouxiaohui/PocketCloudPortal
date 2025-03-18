/**
 * Created by xiaohui on 2025/03/07.
 */

'use strict'

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  const breadcrumbs = ref([])

  function clear() {
    breadcrumbs.value = new Array()
  }

  // 点击面包屑导航
  const navigate = (index) => {
    breadcrumbs.value = breadcrumbs.value.slice(0, index + 1)
  }

  function addItem(item) {
    breadcrumbs.value.push(item)
  }

  function reset(val) {
    breadcrumbs.value = val
  }

  return { breadcrumbs, clear, addItem, reset, navigate }
})
