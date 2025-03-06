/**
 * Created by xiaohui on 2025/02/25.
 */

'use strict'

import http from '@/utils/http'

let codeService = {
  /**
   * 获取图片验证码 
   */
  getCaptcha: function (resolve, reject) {
    http({
      url: '/code/captcha',
      method: 'get',
    })
      .then((res) => resolve(res))
      .catch((res) => reject(res))
  },
  /**
   * 获取邮箱验证码 
   */
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
