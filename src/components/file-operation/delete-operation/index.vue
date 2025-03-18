<template>
  <div class="w-full h-full" @click="deleteFile">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import fileService from '@/api/file'
import useStore from '@/stores'
import { ElMessage, ElMessageBox } from 'element-plus'
import pocketUtil from '@/utils/common'

const { fileStore } = useStore()

const props = defineProps({
  item: {
    type: Object,
    default: false,
  },
})

const doDeleteFile = (fileIds) => {
  ElMessageBox.confirm('文件删除后将保存在回收站，您确定这样做吗？', '删除文件', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    fileService.delete(
      {
        fileIds,
      },
      (res) => {
        ElMessage.success('删除成功')
        fileStore.loadFileList()
      },
      (res) => {
        ElMessage.error(res.msg)
      }
    )
  })
}

const deleteFile = () => {
  if (props.item) {
    doDeleteFile(props.item.id)
  } else if (fileStore.multipleSelection.length > 0) {
    let fileIdArr = new Array()
    fileStore.multipleSelection.forEach((item) => fileIdArr.push(item.id))
    doDeleteFile(fileIdArr.join(pocketUtil.COMMON_SEPARATOR))
  } else {
    ElMessage.error('请选择要删除的文件')
  }
}
</script>
