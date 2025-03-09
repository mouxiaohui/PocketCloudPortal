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
  createFolder: function (data, resolve, reject) {
    http({
      url: '/file/folder',
      data: data,
      method: 'post',
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  },
  secUpload: function (data, resolve, reject) {
    http({
      url: '/file/sec-upload',
      data: data,
      method: 'post',
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  },
  merge: function (data, resolve, reject) {
    http({
      url: '/file/merge',
      data: data,
      method: 'post',
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  },
}

export default fileService
