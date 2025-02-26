/**
 * Created by xiaohui on 2025/02/25.
 */

'use strict'

import http from '@/utils/http'

let codeService = {
  getCaptcha: function (resolve, reject) {
    http({
      url: '/code/captcha',
      method: 'get',
    })
      .then((res) => resolve(res))
      .catch((res) => reject(res))
  },
  sendEmailCode: function (data, resolve, reject) {
    http({
      url: '/code/email',
      params: { email: data },
      method: 'post',
    })
      .then((res) => resolve(res))
      .catch((res) => reject(res))
  },
}

export default codeService
