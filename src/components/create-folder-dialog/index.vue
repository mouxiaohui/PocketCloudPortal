<template>
  <el-dialog
    v-model="localShowDialog"
    title="文件夹名称"
    width="30%"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form :model="form" :rules="rules" ref="formRef" class="flex flex-col items-center justify-center">
      <el-form-item prop="folderName">
        <div class="flex items-center">
          <span class="mr-2">
            <!-- 文件夹图标 -->
            <svg class="ali-icon ali-icon-large" aria-hidden="true">
              <use xlink:href="#icon-wenjianjia"></use>
            </svg>
          </span>
          <!-- 输入框 -->
          <el-input v-model="form.folderName" style="width: 240px" placeholder="请输入文件夹名称" />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="confirmDialog" :loading="loading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { watch, ref, defineProps, defineEmits } from 'vue'
import useStore from '@/stores'
import fileService from '@/api/file';

const { fileStore } = useStore()

// 表单数据
const form = ref({
  folderName: '新建文件夹',
})

// 验证规则
const rules = ref({
  folderName: [
    { required: true, message: '文件夹名称不能为空', trigger: 'blur' },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/,
      message: '不能包含特殊字符',
      trigger: 'blur',
    },
    { max: 50, message: '名称长度不能超过50个字符', trigger: 'blur' },
  ],
})

const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close-dialog'])
const formRef = ref(null)

// 使用一个本地变量来控制 Dialog 的显示状态
let localShowDialog = ref(false)
// 按钮的加载状态
const loading = ref(false)

// 监听父组件传递的 showDialog 变化
watch(
  () => props.showDialog,
  (newVal) => {
    localShowDialog.value = newVal
    // 每次打开时重置为默认名称
    if (newVal) {
      form.value.folderName = '新建文件夹'
    }
  }
)

// 关闭 Dialog 的方法
const closeDialog = () => {
  localShowDialog.value = false
  emit('close-dialog')
  // 重置表单验证状态
  formRef.value?.resetFields()
}

// 确定 Dialog 的方法
const confirmDialog = async () => {
  try {
    // 先进行表单验证
    await formRef.value.validate()
    loading.value = true

    fileService.createFolder(
      {
        parentId: fileStore.parentId,
        folderName: form.value.folderName,
      },
      (res) => {
        loading.value = false
        emit('close-dialog')
        localShowDialog.value = false
        ElMessage.success('新建成功')
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
