/**
 * Created by xiaohui on 2025/02/25.
 */

'use strict'

import axios from 'axios'
import { getToken } from '@/utils/cookie'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
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
    console.error(error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  (res) => {
    switch (res.data.code) {
      case '00000': // 成功
        return res.data
      default: // 其他错误
        return Promise.reject(res.data)
    }
  },
  (error) => {
    // console.error(error.response)
    switch (error.response.data.code) {
      case 'A0130':
        error.response.data.msg = '验证码输入错误'
        return Promise.reject(error.response.data)
      default: // 其他错误
        return Promise.reject(error.response.data)
    }
  }
)

export default http
