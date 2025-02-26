<template>
  <h2 class="title">欢迎登录Pocket Cloud</h2>
  <el-form size="large" :model="loginForm" :rules="loginRules" ref="loginFormRef" @keyup.enter="handleLogin">
    <!-- 账号 -->
    <el-form-item prop="account">
      <el-input v-model="loginForm.account" placeholder="请输入账号(用户名或邮箱)" clearable>
        <template #prefix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password clearable>
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 验证码 -->
    <el-form-item prop="captcha">
      <el-row :gutter="20" class="w-full" justify="space-between">
        <!-- 输入框 -->
        <el-col :span="16">
          <el-input v-model="loginForm.captcha" placeholder="验证码" :prefix-icon="Picture" />
        </el-col>

        <!-- 验证码图片 -->
        <el-col :span="8" class="flex items-center">
          <img :src="captchaImage" class="w-full h-[38px] cursor-pointer" @click="getCaptcha" alt="验证码" />
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" class="login-btn" @click="handleLogin" :loading="loading"> 立即登录 </el-button>
    </el-form-item>
  </el-form>

  <div class="additional-links">
    <router-link to="/auth/register">立即注册</router-link>
    <el-divider direction="vertical" />
    <a href="#">忘记密码？</a>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { User, Lock, Picture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { setToken } from '@/utils/cookie'
import userService from '@/api/user'
import codeService from '@/api/code'

const router = useRouter()

// 表单数据
const loginForm = reactive({
  account: '', // 账号 (用户名或邮箱)
  password: '', // 密码
  captcha: '', // 验证码
  captchaKey: '', // 验证码唯一标识
})

// 验证码图片
const captchaImage = ref('')

// 加载状态
const loading = ref(false)

// 表单验证规则
const loginRules = reactive({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})

// 表单引用
const loginFormRef = ref({
  account: '',
  password: '',
  captcha: '',
})

// 登录方法
const handleLogin = async () => {
  try {
    loading.value = true
    await loginFormRef.value.validate()

    // 调用登录接口
    userService.login(
      loginForm,
      (res) => {
        setToken(res.data)
        // 跳转首页
        router.push({ name: 'Index' })
      },
      (res) => {
        ElMessage.error(res.msg)
        getCaptcha()
      }
    )
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取验证码
const getCaptcha = async () => {
  codeService.getCaptcha(
    (res) => {
      captchaImage.value = res.data.captchaBase64
      loginForm.captchaKey = res.data.captchaKey
    },
    (res) => {
      ElMessage.error(res.data.msg)
    }
  )
}

onMounted(() => {
  getCaptcha()
})
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
  text-align: center;
}

.login-btn {
  margin: 0 auto;
  width: 160px;
  height: 40px;
  background: #3b82f6;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: #2563eb;
}

.additional-links {
  margin-top: 1rem;
  text-align: center;
  color: #64748b;
}

.additional-links a:hover {
  color: #3b82f6;
}
</style>
