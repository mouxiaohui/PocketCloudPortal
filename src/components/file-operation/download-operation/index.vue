<template>
  <div class="w-full h-full" @click="downloadFile">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { getToken } from '@/utils/cookie'
import useStore from '@/stores'
import { ElMessage } from 'element-plus'

const { fileStore } = useStore()

const props = defineProps({
  item: {
    type: Object,
    required: false,
    default: undefined,
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
  if (props.item) {
    if (props.item.folderFlag === 1) {
      ElMessage.error('文件夹暂不支持下载')
      return
    }

    doDownload(props.item)
  } else if (fileStore.multipleSelection.length > 0) {
    for (let i = 0, len = fileStore.multipleSelection.length; i < len; i++) {
      if (fileStore.multipleSelection[i].folderFlag === 1) {
        ElMessage.error('文件夹暂不支持下载')
        return
      }
    }

    doDownLoads(fileStore.multipleSelection)
  } else {
    ElMessage.error('请选择要下载的文件')
  }
}
</script>
