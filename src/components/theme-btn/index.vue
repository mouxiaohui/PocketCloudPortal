<template>
  <div>
    <el-button @click="toggleDark()" :icon="isDark ? Moon : Sunny" circle />
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

// 使用 VueUse 的暗黑模式管理
const isDark = useDark({
  selector: 'html', // 作用于 html 元素
  attribute: 'class', // 通过 class 属性切换
  valueDark: 'dark', // 暗黑模式时添加的 class
  valueLight: 'light', // 明亮模式时添加的 class
})

// 切换暗黑模式
const toggleDark = useToggle(isDark)

// 初始化时设置默认主题
if (localStorage.getItem('vueuse-color-scheme') === null) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = prefersDark
}
</script>
