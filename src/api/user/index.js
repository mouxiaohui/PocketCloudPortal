/**
 * Created by xiaohui on 2025/02/25.
 */

'use strict'

import http from '@/utils/http'

let userService = {
  login: function (data, resolve, reject) {
    http({
      url: '/user/login',
      data,
      method: 'post',
    })
      .then((res) => resolve(res))
      .catch((res) => reject(res))
  },
  logout: function (resolve, reject) {
    http({
      url: '/user/logout',
      method: 'delete',
    })
      .then((res) => resolve(res))
      .catch((res) => reject(res))
  },
  register: function (data, resolve, reject) {
    http({
      url: '/user/register',
      data,
      method: 'post',
    })
      .then((res) => resolve(res))
      .catch((res) => reject(res))
  },
}

export default userService