/**
 * Created by xiaohui on 2025/02/25.
 */

'use strict'

import http from '@/utils/http'

let userService = {
  /**
   * 登录
   */
  login: function (data, resolve, reject) {
    http({
      url: '/user/login',
      data,
      method: 'post',
    })
      .then((res) => resolve(res))
      .catch((res) => reject(res))
  },
  /**
   * 登出
   */
  logout: function (resolve, reject) {
    http({
      url: '/user/logout',
      method: 'delete',
    })
      .then((res) => resolve(res))
      .catch((res) => reject(res))
  },
  /**
   * 注册
   */
  register: function (data, resolve, reject) {
    http({
      url: '/user/register',
      data,
      method: 'post',
    })
      .then((res) => resolve(res))
      .catch((res) => reject(res))
  },
  /**
   * 获取用户信息
   */
  info: function (resolve, reject) {
    http({
      url: '/user',
      method: 'get',
    })
      .then((res) => resolve(res))
      .catch((res) => reject(res))
  },
}

export default userService
