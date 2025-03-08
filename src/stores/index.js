/**
 * Created by xiaohui on 2025/02/25.
 */

'use strict'

import { useUserStore } from './user/index'
import { useFileStore } from './file/index'
import { useBreadcrumbStore } from './breadcrumb/index'
import { useTaskStore } from './task/index'

export default function useStore() {
  return {
    userStore: useUserStore(),
    fileStore: useFileStore(),
    breadcrumbStore: useBreadcrumbStore(),
    taskStore: useTaskStore(),
  }
}
