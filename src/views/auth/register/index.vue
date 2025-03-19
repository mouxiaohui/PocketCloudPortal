<template>
  <h2 class="title">注册Pocket Cloud</h2>

  <el-form
    size="large"
    :model="registerForm"
    :rules="registerRules"
    ref="registerFormRef"
    @keyup.enter="handleRegister"
  >
    <!-- 账号 -->
    <el-form-item prop="username">
      <el-input v-model="registerForm.username" placeholder="请输入用户名" clearable>
        <template #prefix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" show-password clearable>
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 新增确认密码 -->
    <el-form-item prop="confirmPassword">
      <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请确认密码" show-password clearable>
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 邮箱 -->
    <el-form-item prop="email">
      <el-input v-model="registerForm.email" placeholder="请输入邮箱" clearable>
        <template #prefix>
          <el-icon><Message /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 邮箱验证码 -->
    <el-form-item prop="emailCode">
      <el-row :gutter="20" class="w-full" justify="space-between">
        <!-- 输入框 -->
        <el-col :span="16">
          <el-input v-model="registerForm.emailCode" placeholder="邮箱验证码" />
        </el-col>

        <el-col :span="8" class="flex items-center">
          <el-button text bg :disabled="isDisabled" @click="sendEmailCode">
            {{ isDisabled ? `${countdown}秒后重发` : '发送验证码' }}
          </el-button>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" class="register-btn" @click="handleRegister" :loading="loading"> 立即注册 </el-button>
    </el-form-item>
  </el-form>

  <div class="additional-links">
    <router-link to="/auth/login">立即登录</router-link>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { User, Lock, Message } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import userService from '@/api/user'
import codeService from '@/api/code'

// 发送邮箱验证码相关变量
const countdown = ref(0) // 倒计时剩余秒数
const isDisabled = ref(false) // 按钮禁用状态
let timer = null // 定时器

// 表单数据
const registerForm = reactive({
  username: '', // 用户名
  password: '', // 密码
  confirmPassword: '', // 确认密码
  email: '', // 邮箱
  emailCode: '', // 邮箱验证码
})

// 表单重置
const resetRegisterForm = () => {
  registerForm.username = ''
  registerForm.password = ''
  registerForm.confirmPassword = ''
  registerForm.email = ''
  registerForm.emailCode = ''
}

// 表单引用
const registerFormRef = ref({
  username: '', // 用户名
  password: '', // 密码
  confirmPassword: '', // 确认密码
  email: '', // 邮箱
  emailCode: '', // 邮箱验证码
})

// 加载状态
const loading = ref(false)

// 表单验证规则
const registerRules = reactive({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名必须是2-20位', rigger: 'blur' },
    { pattern: /^[\u4E00-\u9FA5A-Za-z0-9*]+$/, message: '用户名必须是中文、英文或数字', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 18, message: '密码必须是6-18位', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
          callback(new Error('密码必须包含数字和字母'))
        } else if (!/^[a-zA-Z\d_]+$/.test(value)) {
          callback(new Error('只能包含字母、数字和下划线'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '邮箱格式错误', trigger: 'blur' },
  ],
  emailCode: [{ required: true, message: '邮箱验证码不能为空', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
})

// 注册方法
const handleRegister = async () => {
  await registerFormRef.value.validate()

  try {
    loading.value = true
    await registerFormRef.value.validate()

    const submitForm = {
      username: registerForm.username,
      password: registerForm.password,
      email: registerForm.email,
      emailCode: registerForm.emailCode,
    }

    // 调用注册接口
    userService.register(
      submitForm,
      (res) => {
        ElMessage.success('注册成功')
        resetRegisterForm()
      },
      (res) => {
        ElMessage.error(res.msg)
      }
    )
  } catch (error) {
    console.error('注册失败:', error)
  } finally {
    loading.value = false
  }
}

// 发送邮箱验证码
const sendEmailCode = async () => {
  try {
    // 单独验证邮箱字段
    await registerFormRef.value.validateField('email')
    startCountdown()

    codeService.sendEmailCode(
      registerForm.email,
      (res) => {
        ElMessage.success('邮箱验证码发送成功!')
      },
      (res) => {
        ElMessage.error('邮箱验证码发送失败!')
        stopCountdown()
      }
    )
  } catch (error) {
    stopCountdown()
  }
}

// 开始计时器(用于防止重复发送邮箱)
const startCountdown = () => {
  countdown.value = 300 // 5分钟=300秒
  isDisabled.value = true

  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isDisabled.value = false
    }
  }, 1000)
}

// 停止倒计时逻辑（用于异常情况强制终止）
const stopCountdown = () => {
  if (timer) {
    clearInterval(timer) // 清除定时器
    timer = null // 释放定时器引用
  }
  countdown.value = 0 // 重置倒计时秒数
  isDisabled.value = false // 恢复按钮可点击状态
  localStorage.removeItem('codeExpire') // 清除本地存储的倒计时记录（如果有）
}
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
  text-align: center;
}

.register-btn {
  margin: 0 auto;
  width: 160px;
  height: 40px;
  background: #3b82f6;
  transition: all 0.3s ease;
}

.register-btn:hover {
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
