<template>
  <div class="login-container">
    <!-- 左侧品牌展示区 -->
    <div class="brand-section">
      <div class="brand-content">
        <div class="logo">
          <el-icon :size="60" color="#fff"><Cloudy /></el-icon>
          <h1>Pocket Cloud</h1>
        </div>
        <p class="slogan">您的智能云存储专家</p>
        <div class="decorative-text">
          <span>安全存储</span>
          <el-icon><CircleCheck /></el-icon>
          <span>极速传输</span>
          <el-icon><Lightning /></el-icon>
          <span>无限可能</span>
        </div>
      </div>
    </div>

    <!-- 右侧登录表单 -->
    <div class="form-section">
      <div class="form-wrapper">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Cloudy, CircleCheck, Lightning } from '@element-plus/icons-vue'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

onMounted(() => {
  // 强制亮色模式
  const htmlEl = document.documentElement
  htmlEl.classList.remove('dark') // 移除暗黑模式
  htmlEl.classList.add('light') // 强制亮色模式
})
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

/* 左侧品牌区样式 */
.brand-section {
  flex: 1;
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.brand-content {
  color: white;
  text-align: center;
  z-index: 1;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.logo h1 {
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 2px;
}

.slogan {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 3rem;
}

.decorative-text {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  opacity: 0.9;
}

/* 右侧表单区样式 */
.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.form-wrapper {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

/* 表单调整 */
:deep(.el-form-item__content) {
  margin-bottom: 1rem;
}

:deep(.el-input__inner::selection) {
  background-color: #318efe !important;
  color: #fff !important;
}

/* 背景装饰（可选） */
.brand-section::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  top: -50px;
  left: -50px;
}

.brand-section::before {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  bottom: -50px;
  right: -50px;
}
</style>
