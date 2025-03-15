/**
 * Created by xiaohui on 2025/03/06.
 */

'use strict'

import { defineStore } from 'pinia'
import { ref } from 'vue'
import fileService from '@/api/file'

export const useFileStore = defineStore(
  'file',
  () => {
    // 根目录id
    const rootFileId = ref('')
    // 根目录名
    const rootFilename = ref('')
    // 当前夫文件夹id
    const parentId = ref('')
    // 文件列表
    const fileList = ref([])

    // 文件列表加载中
    const tableLoading = ref(true)
    // 多选的文件列表
    const multipleSelection = ref([])

    // 文件类型（1 普通文件 2 压缩文件 3 excel 4 word 5 pdf 6 txt 7 图片 8 音频 9 视频 10 ppt 11 源码文件 12 csv）
    const fileTypes = ref(-1)

    // 搜索标志
    const searchFlag = ref(false)
    // 搜索关键字
    const searchKey = ref('')

    function setRootFileId(newRootFileId) {
      rootFileId.value = newRootFileId
    }
    function setRootFilename(newRootFilename) {
      rootFilename.value = newRootFilename
    }

    function setParentId(newParentId) {
      parentId.value = newParentId
    }

    function setFileList(newFlieList) {
      fileList.value = newFlieList
    }

    function setTableLoading(newTableLoading) {
      tableLoading.value = newTableLoading
    }

    function setFileTypes(newFileType) {
      fileTypes.value = newFileType
    }

    function setMultipleSelection(newMultipleSelection) {
      multipleSelection.value = newMultipleSelection
    }

    function setSearchFlag(newSearchFlag) {
      if (!newSearchFlag) {
        searchKey.value = ''
      }
      searchFlag.value = newSearchFlag
    }

    function setSearchKey(newSearchKey) {
      searchKey.value = newSearchKey
    }

    function clear() {
      rootFileId.value = ''
      rootFilename.value = ''
    }

    function loadFileList() {
      setTableLoading(true)
      if (parentId.value === '') {
        setParentId(rootFileId.value)
      }
      fileService.list(
        {
          parentId: parentId.value,
          fileTypes: fileTypes.value,
        },
        (res) => {
          setFileList(res.data)
          setTableLoading(false)
        },
        (res) => {
          ElMessage.error(res.message)
          setTableLoading(false)
        }
      )
    }

    return {
      rootFileId,
      rootFilename,
      parentId,
      fileList,
      fileTypes,
      tableLoading,
      multipleSelection,
      searchFlag,
      searchKey,
      setRootFileId,
      setRootFilename,
      setParentId,
      setTableLoading,
      clear,
      loadFileList,
      setMultipleSelection,
      setSearchFlag,
      setSearchKey,
      setFileTypes,
    }
  },
  {
    persist: {
      pick: ['rootFileId', 'rootFilename'], // 指定需要持久化的状态路径
    },
  }
)
