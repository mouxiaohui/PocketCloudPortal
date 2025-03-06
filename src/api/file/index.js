/**
 * Created by xiaohui on 2025/03/06.
 */

'use strict'

import http from '@/utils/http'

let fileService = {
  list: function (params, resolve, reject) {
    http({
      url: '/file/list',
      params: params,
      method: 'get',
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  },
}

export default fileService
