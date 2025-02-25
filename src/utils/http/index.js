/**
 * Created by xiaohui on 2025/02/25.
 */

'use strict'

import axios from 'axios'
import { getToken } from '@/utils/cookie'
import { ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

/**
 * 清除用户数据和token
 */
const logout = () => {
  // TODO 清除用户数据和token
}

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    if (config.data) {
      config.data = JSON.stringify(config.data)
    }

    let token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    ElMessage.error('请求失败')
    console.error(err)
    return
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  (res) => {
    switch (res.data.code) {
      case '00000': // 成功
        return res.data
      case 'A0230': // 权限认证失败
        logout()
        res.data.msg = '您需要重新登陆'
        return Promise.reject(res.data)
      default: // 其他错误
        return Promise.reject(res.data)
    }
  },
  (error) => {
    ElMessage.error('请求失败')
    console.error(err)
    return
  }
)

export default http
