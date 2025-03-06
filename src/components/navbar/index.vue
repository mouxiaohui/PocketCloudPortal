<template>
  <!-- 主菜单栏 -->
  <el-aside width="78px" class="main-aside border-right-gray flex flex-col items-center">
    <div>
      <!-- Logo -->
      <div class="w-10 h-10 rounded-lg overflow-hidden select-none mx-auto mt-4 mb-8">
        <img src="../../assets/imgs/PocketCloudLogo.png" class="w-full h-full object-cover" alt="Logo" />
      </div>

      <!-- 主菜单 -->
      <div>
        <ul>
          <!-- 首页菜单 -->
          <router-link to="/">
            <li class="menu-item">
              <span>
                <el-icon size="24"><House /></el-icon>
              </span>
              <span>首页</span>
            </li>
          </router-link>

          <!-- 文件菜单 -->
          <router-link to="/file">
            <li class="menu-item">
              <span>
                <el-icon size="24"><Folder /></el-icon>
              </span>
              <span>文件</span>
            </li>
          </router-link>
        </ul>
      </div>
    </div>

    <!-- 设置 -->
    <div class="mt-auto">
      <!-- 上传下载按钮 -->
      <div class="flex justify-center items-center mb-6">
        <el-button circle>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-a-shangchuanxiazai"></use>
          </svg>
        </el-button>
      </div>

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
  <el-aside width="170px" v-show="router.currentRoute.value.meta.collapse" class="border-right-gray p-4">
    <ul class="flex flex-col items-center justify-center">
      <li class="menu-children-item">
        <span class="flex items-center mr-1">
          <el-icon size="24"><Folder /></el-icon>
        </span>
        <span>{{ fileStore.rootFilename }}</span>
      </li>
      <li class="menu-children-item">
        <span class="flex items-center mr-1 w-6 h-6">
          <!-- icon占位 -->
        </span>
        <span>图片</span>
      </li>
      <li class="menu-children-item">
        <span class="flex items-center mr-1 w-6 h-6">
          <!-- icon占位 -->
        </span>
        <span>视频</span>
      </li>
      <li class="menu-children-item">
        <span class="flex items-center mr-1 w-6 h-6">
          <!-- icon占位 -->
        </span>
        <span>文档</span>
      </li>
      <li class="menu-children-item">
        <span class="flex items-center mr-1 w-6 h-6">
          <!-- icon占位 -->
        </span>
        <span>音乐</span>
      </li>

      <el-divider />

      <!-- 分享菜单 -->
      <li class="menu-children-item">
        <span class="flex items-center mr-1">
          <svg class="icon icon-large" aria-hidden="true">
            <use xlink:href="#icon-share"></use>
          </svg>
        </span>
        <span>我的分享</span>
      </li>

      <!-- 回收站菜单 -->
      <li class="menu-children-item">
        <span class="flex items-center mr-1">
          <el-icon size="24"><Delete /></el-icon>
        </span>
        <span>回收站</span>
      </li>
    </ul>
  </el-aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { House, Folder, Delete } from '@element-plus/icons-vue'
import ThemeBtn from '@/components/theme-btn/index.vue'
import useStore from '@/stores'
import { clearToken } from '@/utils/cookie'

const router = useRouter()
const { userStore, fileStore } = useStore()

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
  margin-bottom: 6px;
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

.menu-children-item {
  width: 140px;
  height: 40px;
  padding-left: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.menu-children-item:hover {
  background-color: var(--custom-btn-hover-bg);
}
</style>
