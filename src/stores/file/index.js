/**
 * Created by xiaohui on 2025/03/06.
 */

'use strict'

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFileStore = defineStore(
  'file',
  () => {
    const rootFileId = ref('')
    const rootFilename = ref('')

    function setRootFileId(newRootFileId) {
      rootFileId.value = newRootFileId
    }

    function setRootFilename(newRootFilename) {
      rootFilename.value = newRootFilename
    }

    function clear() {
      rootFileId.value = ''
      rootFilename.value = ''
    }

    return {
      rootFileId,
      rootFilename,
      setRootFileId,
      setRootFilename,
      clear,
    }
  },
  {
    persist: true, // 持久化
  }
)
