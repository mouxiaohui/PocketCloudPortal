<template>
  <div @click="renameDialogVisible = true">
    <slot></slot>
  </div>
  <el-dialog
    title="文件重命名"
    v-model="renameDialogVisible"
    width="30%"
    :append-to-body="true"
    :modal-append-to-body="false"
    :center="true"
  >
    <el-form :model="form" :rules="rules" ref="formRef" class="flex flex-col items-center justify-center">
      <el-form-item prop="filename">
        <div class="flex items-center">
          <span class="mr-2">
            <!-- 文件图标 -->
            <svg class="ali-icon ali-icon-large" aria-hidden="true">
              <use xlink:href="#icon-wenjianjia"></use>
            </svg>
          </span>
          <!-- 输入框 -->
          <el-input v-model="form.filename" style="width: 340px" placeholder="请输入文件名称" />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="renameDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doRenameFile" :loading="loading">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import fileService from '@/api/file'
import useStore from '@/stores'
import { ElMessage } from 'element-plus'

const { fileStore } = useStore()

const props = defineProps({
  item: {
    type: Object,
    default: false,
  },
})

const renameDialogVisible = ref(false)

// 表单数据
const form = ref({
  filename: props.item.filename,
})

const formRef = ref(null)

// 验证规则
const rules = ref({
  filename: [
    { required: true, message: '文件名称不能为空', trigger: 'blur' },
    { max: 50, message: '名称长度不能超过50个字符', trigger: 'blur' },
  ],
})

// 确定按钮加载状态
const loading = ref(false)

// 重命名文件
const doRenameFile = async () => {
  try {
    // 先进行表单验证
    await formRef.value.validate()
    if (form.value.filename === props.item.filename) {
      renameDialogVisible.value = false
      return
    }
    loading.value = true

    fileService.update(
      {
        fileId: props.item.id,
        newFilename: form.value.filename,
      },
      (res) => {
        loading.value = false
        renameDialogVisible.value = false
        ElMessage.success('重命名成功')
        fileStore.loadFileList()
      },
      (res) => {
        ElMessage.error(res.message)
        loading.value = false
      }
    )
  } catch (error) {
    // 验证失败时保持对话框打开
    console.log('表单验证失败', error)
  }
}
</script>
