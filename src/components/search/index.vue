<template>
  <div class="flex items-center space-x-2">
    <div class="w-72">
      <el-input size="large" v-model="search" placeholder="搜索云盘内文件" :prefix-icon="Search" />
    </div>
    <div>
      <el-button size="large" text bg @click="searchFile">搜索</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const search = ref('')

const searchFile = () => {
  console.log(search.value)
}
</script>

<style scoped></style>
