<template>
  <!-- 主菜单栏 -->
  <el-aside width="78px" class="main-aside border-right-gray flex flex-col justify-between items-center">
    <!-- Logo -->
    <div class="w-10 h-10 rounded-lg overflow-hidden mt-4 select-none">
      <img src="../../assets/imgs/PocketCloudLogo.png" class="w-full h-full object-cover" alt="Logo" />
    </div>

    <!-- 主菜单 -->
    <div>
      <ul>
        <li class="menu-item">
          <span>
            <el-icon size="24"><HomeFilled /></el-icon>
          </span>
          <span>首页</span>
        </li>
      </ul>
    </div>

    <!-- 设置 -->
    <div>
      <!-- 切换主题按钮 -->
      <theme-btn />

      <el-dropdown placement="top-start" class="select-none">
        <!-- 头像 -->
        <div class="cursor-pointer mb-6">
          <el-avatar src="src/assets/svg/avatar.svg" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled class="custom-option">{{ userStore.username }}</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-aside>

  <!-- 子菜单栏 -->
  <el-aside width="170px" v-show="collapse" class="border-right-gray"> </el-aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { HomeFilled } from '@element-plus/icons-vue'
import ThemeBtn from '@/components/theme-btn/index.vue'
import useStore from '@/stores'
import { clearToken } from '@/utils/cookie'

const router = useRouter()
const { userStore, fileStore } = useStore()

const collapse = ref(true)

/**
 * 退出登录
 */
const handleLogout = () => {
  userStore.clear()
  fileStore.clear()
  clearToken()
  // 跳转登录页
  router.push({ name: 'Login' })
}
</script>

<style>
.main-aside {
  background-color: var(--custom-main-aside-bg); /* 使用自定义变量 */
}

.border-right-gray {
  border-right: 1px solid var(--el-border-color);
}

/* 隐藏禁用标志 */
.custom-option.is-disabled {
  cursor: default; /* 禁用鼠标手势 */
}

.menu-item {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}

.menu-item:hover {
  background-color: var(--custom-btn-hover-bg);
}
</style>
