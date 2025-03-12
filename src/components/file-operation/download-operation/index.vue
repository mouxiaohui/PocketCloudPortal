<template>
  <el-dropdown-item @click="downloadFile">下载</el-dropdown-item>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { getToken } from '@/utils/cookie'
import useStore from '@/stores'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'

const { fileStore } = useStore()
const { multipleSelection } = storeToRefs(fileStore)

const props = defineProps({
  item: {
    type: Object,
    default: false,
  },
})

// 下载单个文件
const doDownload = (item) => {
  let url =
    import.meta.env.VITE_BASE_URL_API +
    '/file/download?fileId=' +
    encodeURIComponent(item.id) +
    '&Authorization=' +
    getToken()

  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', item.filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 下载多文件
const doDownLoads = (items, i) => {
  if (!i) {
    i = 0
  }
  if (items.length === i) {
    return
  }
  setTimeout(function () {
    doDownload(items[i])
    i++
    doDownLoads(items, i)
  }, 500)
}

// 下载操作
const downloadFile = () => {
  if (!props.item && (!multipleSelection.value || multipleSelection.value.length === 0)) {
    ElMessage.error('请选择要下载的文件')
    return
  }

  if (props.item) {
    if (props.item.folderFlag === 1) {
      ElMessage.error('文件夹暂不支持下载')
      return
    }
    doDownload(props.item)
  } else {
    for (const file in multipleSelection.value) {
      if (file.folderFlag === 1) {
        ElMessage.error('文件夹暂不支持下载')
        return
      }
    }

    doDownLoads(multipleSelection.value)
  }
}
</script>
